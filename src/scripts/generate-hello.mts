/* A TrueType (glyf) outline extractor used to generate the script "hello"
 * wordmark. Reads Apple Chancery locally, lays out the word with hmtx
 * advances, and writes a self-contained shadcn registry component that draws
 * the word with staggered SVG pathLength strokes.
 * Run with: bun src/scripts/generate-hello.mts
 * After regenerating, run prettier on the emitted component file.
 */
import { readFileSync, writeFileSync } from "node:fs"

const FONT_PATH = "/System/Library/Fonts/Supplemental/Apple Chancery.ttf"

const DRAW_DURATION = 2.9
const STROKE_WIDTH = 110

function u16(buf: Buffer, off: number) {
  return buf.readUInt16BE(off)
}

function u32(buf: Buffer, off: number) {
  return buf.readUInt32BE(off)
}

function i16(buf: Buffer, off: number) {
  return buf.readInt16BE(off)
}

function parseTables(buf: Buffer) {
  const numTables = u16(buf, 4)
  const tables: Record<string, { offset: number; length: number }> = {}
  for (let i = 0; i < numTables; i++) {
    const rec = 12 + i * 16
    const tag = buf.toString("ascii", rec, rec + 4)
    tables[tag] = { offset: u32(buf, rec + 8), length: u32(buf, rec + 12) }
  }
  return tables
}

function parseCmapFormat6(
  buf: Buffer,
  o: number,
  glyphIds: Map<number, number>
) {
  const firstCode = u16(buf, o + 6)
  const entryCount = u16(buf, o + 8)
  for (let i = 0; i < entryCount; i++) {
    const glyph = u16(buf, o + 10 + i * 2)
    if (glyph !== 0) {
      glyphIds.set(firstCode + i, glyph)
    }
  }
}

function parseCmapFont4(buf: Buffer, o: number, glyphIds: Map<number, number>) {
  const segCountX2 = u16(buf, o + 6)
  const segCount = segCountX2 / 2
  const endCodes = o + 14
  const startCodes = endCodes + segCountX2 + 2
  const idDeltas = startCodes + segCountX2
  const idRangeOffsets = idDeltas + segCountX2
  const idRangeOs = idRangeOffsets + segCountX2
  for (let seg = 0; seg < segCount; seg++) {
    const end = u16(buf, endCodes + seg * 2)
    const start = u16(buf, startCodes + seg * 2)
    const delta = i16(buf, idDeltas + seg * 2)
    const rangeOffset = u16(buf, idRangeOffsets + seg * 2)
    for (let c = start; c <= end && c <= 0xffff; c++) {
      let glyph = 0
      if (rangeOffset === 0) {
        glyph = (c + delta) & 0xffff
      } else {
        const address = idRangeOs + seg * 2 + rangeOffset + (c - start) * 2
        glyph = u16(buf, address)
        if (glyph !== 0) {
          glyph = (glyph + delta) & 0xffff
        }
      }
      if (glyph !== 0) {
        glyphIds.set(c, glyph)
      }
    }
  }
}

function parseCmaps(buf: Buffer, cmapOffset: number): Map<number, number> {
  const glyphIds = new Map<number, number>()
  const numCmapSub = u16(buf, cmapOffset + 2)
  for (let i = 0; i < numCmapSub; i++) {
    const rec = cmapOffset + 4 + i * 8
    const o = cmapOffset + u32(buf, rec + 4)
    const format = u16(buf, o)
    if (format === 4) {
      parseCmapFont4(buf, o, glyphIds)
    } else if (format === 6) {
      parseCmapFormat6(buf, o, glyphIds)
    }
  }
  return glyphIds
}

type Point = { x: number; y: number; onCurve: boolean }

function glyphToPoints(
  buf: Buffer,
  glyfOffset: number,
  glyphOffset: number,
  glyphLength: number
): Point[][] {
  if (glyphLength === 0) {
    return []
  }
  const g = glyfOffset + glyphOffset
  const numContours = i16(buf, g)
  if (numContours <= 0) {
    return []
  }
  const endPts = []
  for (let i = 0; i < numContours; i++) {
    endPts.push(u16(buf, g + 10 + i * 2))
  }
  const lastEndPt = endPts[endPts.length - 1] ?? -1
  const numPoints = lastEndPt + 1
  let cursor = g + 10 + numContours * 2
  const instructionLength = u16(buf, cursor)
  cursor += 2 + instructionLength

  const flags: number[] = []
  while (flags.length < numPoints) {
    const flag = buf[cursor]
    cursor++
    flags.push(flag)
    if (flag & 0x08) {
      const repeat = buf[cursor]
      cursor++
      for (let i = 0; i < repeat && flags.length < numPoints; i++) {
        flags.push(flag)
      }
    }
  }

  const xs: number[] = []
  let x = 0
  for (let i = 0; i < numPoints; i++) {
    const flag = flags[i]
    if (flag & 0x02) {
      const delta = buf[cursor]
      cursor++
      x += flag & 0x10 ? delta : -delta
    } else if (!(flag & 0x10)) {
      x += i16(buf, cursor)
      cursor += 2
    }
    xs.push(x)
  }

  const ys: number[] = []
  let y = 0
  for (let i = 0; i < numPoints; i++) {
    const flag = flags[i]
    if (flag & 0x04) {
      const delta = buf[cursor]
      cursor++
      y += flag & 0x20 ? delta : -delta
    } else if (!(flag & 0x20)) {
      y += i16(buf, cursor)
      cursor += 2
    }
    ys.push(y)
  }

  const contours: Point[][] = []
  let start = 0
  for (const end of endPts) {
    const points: Point[] = []
    for (let i = start; i <= end; i++) {
      points.push({ x: xs[i], y: ys[i], onCurve: !!(flags[i] & 0x01) })
    }
    contours.push(points)
    start = end + 1
  }
  return contours
}

function pushQuad(poly: { x: number; y: number }[], ctrl: Point, end: Point) {
  const p = poly[poly.length - 1]
  const steps = 8
  for (let k = 1; k <= steps; k++) {
    const t = k / steps
    const v = 1 - t
    poly.push({
      x: v * v * p.x + 2 * v * t * ctrl.x + t * t * end.x,
      y: v * v * p.y + 2 * v * t * ctrl.y + t * t * end.y,
    })
  }
}

function contourToStroke(
  pts: Point[],
  dx: number
): {
  d: string
  length: number
  minX: number
  maxX: number
  minY: number
  maxY: number
} {
  const poly: { x: number; y: number }[] = []
  const n = pts.length
  let startIdx = pts.findIndex((p) => p.onCurve)
  if (startIdx === -1) {
    startIdx = 0
  }
  poly.push({ x: pts[startIdx].x, y: pts[startIdx].y })
  let idx = startIdx
  do {
    const next = pts[(idx + 1) % n]
    if (next.onCurve) {
      poly.push({ x: next.x, y: next.y })
      idx = (idx + 1) % n
    } else {
      let offIdx = (idx + 1) % n
      let toIdx = (idx + 2) % n
      while (!pts[toIdx].onCurve) {
        const mid = {
          x: (pts[offIdx].x + pts[toIdx].x) / 2,
          y: (pts[offIdx].y + pts[toIdx].y) / 2,
        }
        pushQuad(poly, pts[offIdx], mid)
        offIdx = toIdx
        toIdx = (toIdx + 1) % n
      }
      pushQuad(poly, pts[offIdx], pts[toIdx])
      idx = toIdx
    }
  } while (idx !== startIdx)

  let d = ""
  let length = 0
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const sx = a.x + dx
    if (i === 0) {
      d += `M${sx.toFixed(2)} ${a.y.toFixed(2)}`
    } else {
      const b = poly[i - 1]
      d += `L${sx.toFixed(2)} ${a.y.toFixed(2)}`
      length += Math.hypot(a.x - b.x, a.y - b.y)
    }
    minX = Math.min(minX, sx)
    maxX = Math.max(maxX, sx)
    minY = Math.min(minY, a.y)
    maxY = Math.max(maxY, a.y)
  }
  return { d, length, minX, maxX, minY, maxY }
}

function main() {
  const buf = readFileSync(FONT_PATH)
  const tables = parseTables(buf)
  const head = tables.head!.offset
  const unitsPerEm = u16(buf, head + 18)
  const indexToLocFormat = u16(buf, head + 50)
  const numGlyphs = u16(buf, tables.maxp!.offset + 4)
  const numberOfHMetrics = u16(buf, tables.hhea!.offset + 34)
  const hmtxOffset = tables.hmtx!.offset

  const locaOffset = tables.loca!.offset
  const locaSize = indexToLocFormat === 0 ? 2 : 4
  const glyfOffset = tables.glyf!.offset
  const cmapOffset = tables.cmap!.offset
  const glyphIds = parseCmaps(buf, cmapOffset)

  const advanceWidths = new Array<number>(numGlyphs).fill(0)
  const leftSideBearings = new Array<number>(numGlyphs).fill(0)
  for (let gid = 0; gid < numGlyphs; gid++) {
    const entry = hmtxOffset + Math.min(gid, numberOfHMetrics - 1) * 4
    advanceWidths[gid] = u16(buf, entry)
    leftSideBearings[gid] = i16(buf, entry + 2)
  }

  const word = "hello"
  let cursor = 0
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const strokes: { d: string; length: number }[] = []
  for (const ch of word) {
    const gid = glyphIds.get(ch.codePointAt(0)!)
    if (gid === undefined) {
      throw new Error(`no glyph for "${ch}"`)
    }
    const dx = cursor
    cursor += advanceWidths[gid]
    const locaStart = locaOffset + gid * locaSize
    const start =
      indexToLocFormat === 0 ? u16(buf, locaStart) * 2 : u32(buf, locaStart)
    const end =
      indexToLocFormat === 0
        ? u16(buf, locaStart + 2) * 2
        : u32(buf, locaStart + 4)
    const contours = glyphToPoints(buf, glyfOffset, start, end - start)
    for (const pts of contours) {
      const s = contourToStroke(pts, dx)
      strokes.push({ d: s.d, length: s.length })
      minX = Math.min(minX, s.minX)
      maxX = Math.max(maxX, s.maxX)
      minY = Math.min(minY, s.minY)
      maxY = Math.max(maxY, s.maxY)
    }
  }

  const totalLength = strokes.reduce((sum, s) => sum + s.length, 0)
  let cum = 0
  const timed = strokes.map((s) => {
    const begin = cum / totalLength
    cum += s.length
    const end = cum / totalLength
    return { d: s.d, begin: +begin.toFixed(4), end: +end.toFixed(4) }
  })

  const padding = 40
  const width = Math.ceil(maxX - minX + padding * 2)
  const height = Math.ceil(maxY - minY + padding * 2)

  const strokesJson = JSON.stringify(timed)

  const viewBox = `0 0 ${width} ${height}`

  const component = `// Generated from Apple Chancery (${FONT_PATH}) by src/scripts/generate-hello.mts.
// Do not edit by hand. Regenerate with \`bun src/scripts/generate-hello.mts\` and
// then run \`pnpm exec prettier --write src/registry/components/apple-hello-effect/apple-hello-effect-english.tsx\`.

"use client"

import type { ComponentProps } from "react"
import type { TargetAndTransition } from "motion/react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const DRAW_DURATION = ${DRAW_DURATION}

const STROKES = ${strokesJson} as const

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
}

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
}

export type AppleHelloEffectEnglishProps = Omit<
  ComponentProps<typeof motion.svg>,
  "durationScale" | "onAnimationComplete"
> & {
  /**
   * Scales the duration and delay of the handwriting animation.
   * Values below 1 speed up, values above 1 slow down.
   * @defaultValue 1
   */
  durationScale?: number
  /** Called when the full handwriting animation completes. */
  onAnimationComplete?: () => void
}

export function AppleHelloEffectEnglish({
  className,
  durationScale = 1,
  onAnimationComplete,
  ...props
}: AppleHelloEffectEnglishProps) {
  const calc = (x: number) => x * durationScale

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      fill="none"
      stroke="currentColor"
      strokeWidth="${STROKE_WIDTH}"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>hello</title>

      {STROKES.map((stroke, index) => {
        const isLast = index === STROKES.length - 1
        const duration = Math.max(0.06, (stroke.end - stroke.begin) * DRAW_DURATION)
        const delay = stroke.begin * DRAW_DURATION

        return (
          <motion.path
            key={index}
            d={stroke.d}
            initial={initialProps}
            animate={animateProps}
            transition={{
              duration: calc(duration),
              ease: "easeInOut",
              delay: calc(delay),
              opacity: { duration: calc(0.5), delay: calc(delay) },
            }}
            {...(isLast ? { onAnimationComplete } : {})}
          />
        )
      })}
    </motion.svg>
  )
}
`

  const target = new URL(
    "../registry/components/apple-hello-effect/apple-hello-effect-english.tsx",
    import.meta.url
  )
  writeFileSync(target.pathname, component)
  console.log(
    `wrote ${target.pathname} (${width}x${height}, ${strokes.length} strokes, unitsPerEm ${unitsPerEm}, total length ${totalLength.toFixed(0)})`
  )
}

main()

"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * An SVG mark whose outline is traced by a gradient highlight that follows the
 * cursor, paired with a springy press effect and a tactile click sound.
 *
 * Swap `S_GRID` below for your own artwork: every filled cell becomes one
 * cuboid of an isometric block letter. The interaction is driven by:
 * - a `radialGradient` whose center springs toward the pointer (the spotlight),
 *   reused as a second stroke layered over the base outline.
 * - `whileTap="pressed"` pressing the whole mark down by `PRESS` units.
 *
 * The blocky "S" is traced from the logomark badge (a thick rounded S) used
 * across the site. Inspired by tailwindcss.com.
 */

// A 1 is a raised cuboid, a 0 stays flat (hollow counters of the S).
const S_GRID = [
  "011110",
  "110011",
  "110011",
  "011110",
  "000011",
  "000011",
  "111110",
]

const ROW = 30 // isometric x step (columns skew right)
const COL = 15 // isometric y step (rows skew down)

// How far the extruded walls drop below the top faces.
const WALL_DROP = 64

// Press travels that many units down along the screen y-axis.
const PRESS = 16

function facePoint(c: number, r: number) {
  return { x: (c - r) * ROW, y: (c + r) * COL }
}

const COLS = S_GRID[0].length
const ROWS = S_GRID.length
const isRaised = (c: number, r: number) =>
  c >= 0 && c < COLS && r >= 0 && r < ROWS && S_GRID[r][c] === "1"

function buildSpotlightGeometry() {
  const top: string[] = []
  const sideLeft: string[] = []
  const sideRight: string[] = []
  const wireframe: string[] = []

  const stroke = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    wireframe.push(`M${a.x} ${a.y}L${b.x} ${b.y}`)

  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      if (!isRaised(c, r)) {
        continue
      }

      const t = facePoint(c, r)
      const rt = facePoint(c + 1, r)
      const b = facePoint(c + 1, r + 1)
      const lt = facePoint(c, r + 1)

      top.push(`M${t.x} ${t.y}L${rt.x} ${rt.y}L${b.x} ${b.y}L${lt.x} ${lt.y}Z`)

      // Top-face edges that neighbor a flat/empty cell draw the silhouette.
      if (!isRaised(c, r - 1)) stroke(rt, t)
      if (!isRaised(c + 1, r)) stroke(rt, b)
      if (!isRaised(c, r + 1)) stroke(b, lt)
      if (!isRaised(c - 1, r)) stroke(lt, t)

      // Walls where the left/right neighbor is flat — both the outer rim and
      // the counter are outlined so the letter keeps its hollow middle.
      if (!isRaised(c - 1, r)) {
        const dropBottom = b.y + WALL_DROP
        const dropLeft = lt.y + WALL_DROP
        sideLeft.push(
          `M${lt.x} ${lt.y}L${b.x} ${b.y}L${b.x} ${dropBottom}L${lt.x} ${dropLeft}Z`
        )
        stroke(b, { x: b.x, y: dropBottom })
        stroke(lt, { x: lt.x, y: dropLeft })
      }
      if (!isRaised(c + 1, r)) {
        const dropBottom = b.y + WALL_DROP
        const dropRight = rt.y + WALL_DROP
        sideRight.push(
          `M${rt.x} ${rt.y}L${b.x} ${b.y}L${b.x} ${dropBottom}L${rt.x} ${dropRight}Z`
        )
        stroke(b, { x: b.x, y: dropBottom })
        stroke(rt, { x: rt.x, y: dropRight })
      }
    }
  }

  return {
    top: top.join(""),
    sideLeft: sideLeft.join(""),
    sideRight: sideRight.join(""),
    wireframe: wireframe.join(""),
  }
}

const GEOMETRY = buildSpotlightGeometry()

export function SpotlightLogo() {
  const id = useId()
  const ids = {
    facePattern: `spotlight-logo-face-pattern-${id}`,
    radialGradient: `spotlight-logo-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // userSpaceOnUse: the gradient center is expressed in viewBox units.
  const cx = useSpring(useTransform(mouseX, [0, 1], [-225, 200]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [-15, 285]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))] [--wall-left:color-mix(in_oklab,var(--foreground)_18%,var(--background))] [--wall-right:color-mix(in_oklab,var(--foreground)_30%,var(--background))]"
      viewBox="-225 -15 425 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/* Press animates `y` (not a transform string) so the whole block —
          walls, faces, and wireframe alike — travels in lockstep. */}
      <motion.g
        variants={{
          normal: {
            y: 0,
          },
          pressed: {
            y: PRESS,
          },
        }}
        transition={transition}
      >
        <path d={GEOMETRY.sideLeft} fill="var(--wall-left)" />
        <path d={GEOMETRY.sideRight} fill="var(--wall-right)" />

        <path d={GEOMETRY.top} className="fill-background" />
        <path d={GEOMETRY.top} fill={`url(#${ids.facePattern})`} />

        <path
          d={GEOMETRY.wireframe}
          stroke="var(--stroke)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={GEOMETRY.wireframe}
          stroke={`url(#${ids.radialGradient})`}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.svg>
  )
}
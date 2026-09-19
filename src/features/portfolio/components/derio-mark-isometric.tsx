"use client"

import { useEffect, useRef } from "react"
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

// Blocky "D" bitmap, isometrically extruded. Each filled cell becomes a
// cuboid; faces are only drawn for the sides the viewer can actually see.
const D_GRID = [
  "111111",
  "100001",
  "100001",
  "100001",
  "100001",
  "100001",
  "111111",
]

const U = 30
const V = 15
const DEPTH = 96

function facePoint(c: number, r: number) {
  return { x: (c - r) * U, y: (c + r) * V }
}

function buildGeometry() {
  const top: string[] = []
  const left: string[] = []
  const right: string[] = []

  for (let r = 0; r < D_GRID.length; r += 1) {
    for (let c = 0; c < D_GRID[r].length; c += 1) {
      if (D_GRID[r][c] !== "1") {
        continue
      }

      const t = facePoint(c, r)
      const rt = facePoint(c + 1, r)
      const b = facePoint(c + 1, r + 1)
      const lt = facePoint(c, r + 1)

      top.push(`M${t.x} ${t.y}L${rt.x} ${rt.y}L${b.x} ${b.y}L${lt.x} ${lt.y}Z`)

      if (D_GRID[r][c - 1] !== "1") {
        left.push(
          `M${lt.x} ${lt.y}L${b.x} ${b.y}L${b.x} ${b.y + DEPTH}L${lt.x} ${lt.y + DEPTH}Z`
        )
      }
      if (D_GRID[r][c + 1] !== "1") {
        right.push(
          `M${rt.x} ${rt.y}L${b.x} ${b.y}L${b.x} ${b.y + DEPTH}L${rt.x} ${rt.y + DEPTH}Z`
        )
      }
    }
  }

  return { top: top.join(""), left: left.join(""), right: right.join("") }
}

const faces = buildGeometry()

export function DerioMarkIsometric() {
  const ref = useRef<SVGSVGElement>(null)
  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [-140, 140]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [-10, 200]), {
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
      className="h-auto w-full touch-manipulation overflow-visible [--edge:color-mix(in_oklab,var(--foreground)_22%,var(--background))] [--face-left:color-mix(in_oklab,var(--foreground)_18%,var(--background))] [--face-right:color-mix(in_oklab,var(--foreground)_30%,var(--background))] [--face:color-mix(in_oklab,var(--foreground)_10%,var(--background))] [--hatch:color-mix(in_oklab,var(--foreground)_10%,var(--background))]"
      viewBox="-230 -20 480 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onTap={() => play()}
    >
      <defs>
        <pattern
          id="derio-hatch"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--hatch)"
            strokeWidth="1"
          />
        </pattern>
        <motion.radialGradient
          id="derio-specular"
          cx={cx}
          cy={cy}
          r="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-600)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-500)]"
            offset="1"
            stopColor="var(--color-zinc-300)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g
        className="stroke-line"
        stroke="var(--edge)"
        strokeWidth="1"
        strokeDasharray="4 2"
      >
        <path d="M-425 340L325 -260" />
        <path d="M315 350L-305 -260" />
      </g>

      <path
        d={faces.right}
        fill="var(--face-right)"
        stroke="var(--edge)"
        strokeWidth="1"
      />
      <path
        d={faces.left}
        fill="var(--face-left)"
        stroke="var(--edge)"
        strokeWidth="1"
      />
      <path
        d={faces.top}
        fill="var(--face)"
        stroke="var(--edge)"
        strokeWidth="1"
      />
      <path d={faces.top} fill="url(#derio-hatch)" />
      <path d={faces.top} fill="url(#derio-specular)" />
    </motion.svg>
  )
}

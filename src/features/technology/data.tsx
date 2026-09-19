import { TECH_STACK } from "@/features/portfolio/data/tech-stack"

import type { Technology } from "./types"

export const TECHNOLOGIES: Technology[] = TECH_STACK.map((tech) => ({
  name: tech.title,
  url: tech.href,
  icon: tech.icon,
  categories: tech.categories,
}))

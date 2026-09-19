import type { TimelineMilestone } from "../types/timeline"

// The timeline starts at the beginning of university, so "elapsed" is the
// number of years since then rather than a person's age.
export const TIMELINE_BIRTH_YEAR = 2022

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 2022,
    content: "Started studying Informatics at Universitas Gunadarma in Depok.",
  },
  {
    year: 2023,
    content:
      "Led Sayur Bunda, a small fresh-produce business that earned a national entrepreneurship grant.",
  },
  {
    year: 2024,
    content:
      "Became Lead Laboratory Assistant at the Universitas Gunadarma Informatics Laboratory — teaching students their first lines of code.",
  },
  {
    year: 2025,
    content: `Took on two more roles at the lab: Full Stack Engineer and Server Administrator.

Earned an [NVIDIA certificate](https://www.nvidia.com/en-us/learn/) in Computer Vision for Industrial Inspection.`,
  },
  {
    year: 2026,
    content: `Rebuilt the [IFLab website](https://iflab.gunadarma.ac.id) with friends — used by thousands of students every term.

Shipped AlumniIQ, logic-lab, and the Magic Auction Predictor.`,
  },
]

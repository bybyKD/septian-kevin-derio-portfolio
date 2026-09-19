import {
  ActivityIcon,
  CpuIcon,
  FlaskConicalIcon,
  Gamepad2Icon,
  GraduationCapIcon,
  TrophyIcon,
} from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "moneyball",
    title: "Moneyball AI Scouting Platform",
    period: {
      start: "09.2026",
    },
    link: "https://github.com/bybyKD/moneyball",
    skills: [
      "AI",
      "Football Analytics",
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
    ],
    description: `AI-native football recruitment & scouting intelligence platform that identifies players whose measurable performance, potential, and tactical fit exceed their current market value.
- Next.js 15 + FastAPI monorepo, PostgreSQL 16 + pgvector embeddings, Redis
- Player analytics, similarity search, market & scouting events, comparison, and agent orchestration
- Seeds real StatsBomb open data (~17 GB, all competitions)
`,
    icon: <TrophyIcon strokeWidth={1.8} />,
  },
  {
    id: "alumniiq",
    title: "AlumniIQ",
    period: {
      start: "01.2026",
    },
    link: "https://alumni-iq-deploy-der3.vercel.app/",
    skills: [
      "Web App",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Gemini AI",
      "PDF Import",
    ],
    description: `Alumni management system with search, filtering, and AI-powered assistance.
- React & TypeScript frontend, Node/Express backend, Gemini queries, and PDF data import
`,
    icon: <GraduationCapIcon strokeWidth={1.8} />,
    isExpanded: true,
  },
  {
    id: "logic-lab",
    title: "logic-lab",
    period: {
      start: "02.2026",
    },
    link: "https://training-livid-gamma.vercel.app",
    skills: ["Experimental", "TypeScript", "React", "Vite"],
    description:
      "An experimental TypeScript playground — a growing collection of interactive logic and tool prototypes built with React and Vite.",
    icon: <FlaskConicalIcon strokeWidth={1.8} />,
  },
  {
    id: "iflab",
    title: "Universitas Gunadarma Informatics Lab",
    period: {
      start: "09.2025",
    },
    link: "https://iflab.gunadarma.ac.id",
    skills: ["Full-Stack", "CodeIgniter 4", "PHP", "MySQL", "RBAC", "TipTap"],
    description: `Laboratory information system & CMS for the Universitas Gunadarma Informatics Lab, rebuilt with a small team for the thousands of students who use it every term.
- CodeIgniter 4 + MySQL, RBAC admin with a TipTap editor
- Campus schedules, news publishing, and KOMPRES recruitment management
`,
    icon: <CpuIcon strokeWidth={1.8} />,
  },
  {
    id: "magic-auction-predictor",
    title: "Magic Auction Predictor",
    period: {
      start: "2026",
    },
    link: "https://github.com/bybyKD/magic-chess-gogo-auction",
    skills: [
      "Game Tool",
      "React",
      "TensorFlow.js",
      "Machine Learning",
      "Data Extraction",
    ],
    description:
      "Treasure database, extraction tools, and an ML prediction tool for the Magic Auction mini-game in Mobile Legends: Go Go — React and TensorFlow.js.",
    icon: <Gamepad2Icon strokeWidth={1.8} />,
  },
  {
    id: "netdoctor",
    title: "NetDoctor",
    period: {
      start: "06.2026",
    },
    link: "https://github.com/bybyKD/network_analysis",
    skills: ["CLI", "Python", "macOS", "Networking", "Bandwidth"],
    description: `macOS CLI for network diagnostics and bandwidth monitoring, distributed via Homebrew tap and Scoop bucket.`,
    icon: <ActivityIcon strokeWidth={1.8} />,
  },
]

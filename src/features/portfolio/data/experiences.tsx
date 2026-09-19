import {
  CodeXmlIcon,
  GraduationCapIcon,
  LightbulbIcon,
  ServerCogIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

function Monogram({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-5 place-items-center rounded-full bg-zinc-200 text-[0.65rem] font-semibold text-zinc-700 select-none dark:bg-zinc-700 dark:text-zinc-200">
      {children}
    </span>
  )
}

export const EXPERIENCES: Experience[] = [
  {
    id: "infosystem",
    companyName: "Laboratorium Informatika Universitas Gunadarma",
    companyIcon: <Monogram>U</Monogram>,
    companyWebsite: "https://iflab.gunadarma.ac.id",
    location: "Depok, West Java, Indonesia",
    locationType: "Hybrid",
    positions: [
      {
        id: "3",
        title: "Full Stack Engineer",
        employmentPeriod: {
          start: "09.2025",
        },
        employmentType: "Hybrid",
        icon: <CodeXmlIcon />,
        description: `- Develop and maintain full-stack web applications to support academic and laboratory needs, across both frontend and backend.
- Design and implement web applications based on user and organizational requirements.
- Develop frontend interfaces and backend services, APIs, and database integrations.
- Troubleshoot, optimize, and maintain existing applications to ensure reliability and usability.
- Rebuilt the IFLab website with a small team, used by thousands of students every term.`,
        skills: [
          "React",
          "TypeScript",
          "PHP",
          "CodeIgniter 4",
          "MySQL",
          "Tailwind CSS",
          "Node.js",
        ],
        isExpanded: true,
      },
      {
        id: "2",
        title: "Server Administrator",
        employmentPeriod: {
          start: "09.2025",
        },
        employmentType: "Hybrid",
        icon: <ServerCogIcon />,
        description: `- Manage and maintain server infrastructure supporting laboratory systems and services, with a focus on reliability, security, and availability.
- Configure, maintain, and troubleshoot servers and related services.
- Monitor system performance and resolve technical issues to maintain service availability.
- Perform system administration, maintenance, and configuration tasks across laboratory infrastructure.
- Assist in managing deployments so applications and services keep running reliably.`,
        skills: ["Linux", "Ubuntu", "Nginx", "Bash", "Monitoring", "Security"],
      },
      {
        id: "1",
        title: "Lead Laboratory Assistant",
        employmentPeriod: {
          start: "08.2024",
        },
        employmentType: "On-site",
        icon: <GraduationCapIcon />,
        description: `- Lead and coordinate laboratory activities while supporting students in understanding and applying technical concepts through hands-on learning.
- Lead laboratory assistants in delivering practical sessions and ensuring smooth laboratory operations.
- Guide students through programming, software development, and technical exercises.
- Explain complex technical concepts clearly to students with different levels of experience.
- Coordinate laboratory activities, troubleshoot technical issues, and help students complete practical assignments.`,
        skills: [
          "Teaching",
          "Leadership",
          "Mentoring",
          "Communication",
          "Problem Solving",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "sayur-bunda",
    companyName: "Sayur Bunda",
    companyIcon: <Monogram>S</Monogram>,
    location: "Depok, West Java, Indonesia",
    locationType: "On-site",
    positions: [
      {
        id: "1",
        title: "Founder",
        employmentPeriod: {
          start: "2023",
          end: "2024",
        },
        employmentType: "Part-time",
        icon: <LightbulbIcon />,
        description: `- Led a small fresh-produce business from scratch.
- Earned a national entrepreneurship grant in 2023.
- My first real lesson that building isn't about the code — it's about paying attention to people.`,
        skills: [
          "Entrepreneurship",
          "Business Operations",
          "Customer Service",
          "Marketing",
        ],
      },
    ],
  },
]

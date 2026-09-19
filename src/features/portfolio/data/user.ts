import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Septian Kevin",
  lastName: "Derio",
  displayName: "Derio",
  username: "septiankevinderio",
  gender: "male",
  pronouns: "he/him",
  bio: "Full Stack Engineer | Server Administrator",
  flipSentences: [
    "Full Stack Engineer.",
    "Server Administrator.",
    "Code is how I care.",
    "Building small, honest things.",
  ],
  address: "Depok, West Java, Indonesia",
  phoneNumberB64: "",
  emailB64: "a2V2aW5kZXJpbzI3QGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://septian-kevin-derio-portfolio.vercel.app",
  jobTitle: "Full Stack Engineer",
  jobs: [
    {
      title: "Full Stack Engineer",
      company: "Informatics Laboratory — Universitas Gunadarma",
      website: "https://iflab.gunadarma.ac.id",
      experienceId: "infosystem",
    },
    {
      title: "Server Administrator",
      company: "Informatics Laboratory — Universitas Gunadarma",
      website: "https://iflab.gunadarma.ac.id",
      experienceId: "server-admin",
    },
  ],
  about: `- I’m Derio — an Informatics student at Universitas Gunadarma in Depok, and a full-stack engineer and server administrator at the university’s Informatics Laboratory.
- I lead the lab’s student assistants, build the systems the lab runs on (including the [IFLab website](https://iflab.gunadarma.ac.id) my friends and I rebuilt), and keep the servers alive overnight.
- Before any of that, I led a small business called Sayur Bunda that earned a national entrepreneurship grant in 2023 — my first real lesson that building isn’t about the code, it’s about paying attention to people.
- I’m also a technology and media enthusiast who enjoys covering product launches and events and turning them into stories. I believe technology is about connecting people and communicating ideas, not just shipping systems.
`,
  avatar: "/images/portrait.png",
  avatarSketch: "/images/portrait-story.png",
  avatarVariants: {
    lightOff: "/images/portrait.png",
    lightOn: "/images/portrait.png",
    darkOff: "/images/portrait.png",
    darkOn: "/images/portrait.png",
  },
  ogImage: "/images/portrait.png",
  namePronunciationUrl: "",
  timeZone: "Asia/Jakarta",
  keywords: [
    "septian kevin derio",
    "septiankevinderio",
    "kevin derio",
    "derio",
    "bybykd",
    "full stack engineer",
    "server administrator",
    "universitas gunadarma",
    "informatics laboratory",
    "iflab",
    "depok",
    "indonesia",
  ],
  dateCreated: "2026-09-19", // YYYY-MM-DD
}

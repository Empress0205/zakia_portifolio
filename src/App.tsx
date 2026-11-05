import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent, type ReactNode } from "react"
import photo1 from "./assets/zakia-1.jpg"
import photo2 from "./assets/zakia-2.jpg"
import photo3 from "./assets/zakia-3.jpg"
import photo4 from "./assets/zakia-4.jpg"

/* ================================================================== */
/* Contact details                                                     */
/* ================================================================== */

const EMAIL = "zakianaswabu@gmail.com"
const LINKEDIN = "https://www.linkedin.com/in/zakia-naswabu-580721375"
const GITHUB = "https://github.com/Empress0205"
const INSTAGRAM = "https://www.instagram.com/zakianaswabu"
const TELCOTEK = "https://telcotek.co.tz/about"

// Free key from https://web3forms.com, set as VITE_WEB3FORMS_KEY or WEB3FORMS_KEY
// in .env (or your host's settings). Without it, the contact form opens the visitor's email app instead.
const WEB3FORMS_KEY: string | undefined = import.meta.env.VITE_WEB3FORMS_KEY || import.meta.env.WEB3FORMS_KEY

/* ================================================================== */
/* Icons                                                               */
/* ================================================================== */

const iconPaths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  out: <path d="M7 17 17 7M8 7h9v9" />,
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
      <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  tools: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
    </>
  ),
  code: <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />,
  board: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16M14 4v16M5.5 8h1M10.5 8h1M10.5 11h1M16.5 8h1" />
    </>
  ),
  users: (
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
}

type IconName = keyof typeof iconPaths

function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "arrow" || name === "out" ? 2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name]}
    </svg>
  )
}

/* ================================================================== */
/* Content                                                             */
/* ================================================================== */

const navLinks = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["awards", "Awards"],
  ["beyond", "Beyond code"],
  ["moments", "Moments"],
] as const

const heroPhotos = [
  { src: photo1, alt: "Zakia Naswabu George under the trees", pos: "50% 38%" },
  { src: photo2, alt: "Zakia Naswabu George smiling outdoors", pos: "50% 34%" },
  { src: photo3, alt: "Zakia Naswabu George in a garden", pos: "50% 40%" },
  { src: photo4, alt: "Zakia Naswabu George on campus", pos: "50% 34%" },
]

const heroWords = ["LLM & RAG systems", "Python backends", "React interfaces", "Flutter apps"]

const skills: { title: string; icon: IconName; note: string; items: string[]; learning?: string; wide?: boolean }[] = [
  {
    title: "AI & Machine Learning",
    icon: "spark",
    note: "My specialty: AI that works in production.",
    items: ["LLMs (Groq, Gemini, Ollama)", "LangChain", "RAG", "Embeddings", "Sentence Transformers", "Semantic Search", "NLP", "Prompt Engineering", "Computer Vision", "PaddleOCR"],
    learning: "Agentic AI · currently learning",
    wide: true,
  },
  {
    title: "Backend",
    icon: "server",
    note: "APIs and services that are reliable and secure.",
    items: ["Python", "FastAPI", "Django", "Django REST Framework", "RESTful APIs", "Auth"],
  },
  {
    title: "Frontend & Mobile",
    icon: "layout",
    note: "Interfaces for the web and the phone.",
    items: ["React", "TypeScript", "Flutter", "Dart"],
  },
  {
    title: "Databases",
    icon: "db",
    note: "Relational data and vector search.",
    items: ["PostgreSQL", "MySQL", "SQLite", "ChromaDB", "SQL"],
  },
  {
    title: "Tools",
    icon: "tools",
    note: "What I use every day to build and test.",
    items: ["Docker", "Git & GitHub", "Postman", "Jupyter", "Google Colab"],
  },
]

type ArtKind = "fin" | "verify" | "mind" | "mama" | "appt" | "alumni"

const projects: { name: string; short: string; tag: string; label: string; art: ArtKind; text: string; tech: string[]; link?: { href: string; text: string } }[] = [
  {
    name: "FinWatch Intelligence",
    short: "FinWatch Intelligence",
    tag: "Finance · Bank of Tanzania",
    label: "Final-year dissertation",
    art: "fin",
    text: "An AI platform that reads financial news and flags potential risks, built to support financial stability monitoring at the Bank of Tanzania.",
    tech: ["FastAPI", "React", "TypeScript", "PostgreSQL", "LLMs"],
  },
  {
    name: "Medi-Verify",
    short: "Medi-Verify",
    tag: "Health · Computer vision",
    label: "Health · Computer vision",
    art: "verify",
    text: "Spots counterfeit medicine packaging using OCR and image classification, with a real-time verification app in Flutter.",
    tech: ["PaddleOCR", "Computer Vision", "Machine Learning", "Flutter"],
    link: { href: `${GITHUB}/medi-verify`, text: "View code on GitHub" },
  },
  {
    name: "Uni-Mind",
    short: "Uni-Mind",
    tag: "Education · AI chatbot",
    label: "Education · AI chatbot",
    art: "mind",
    text: "An AI chatbot that supports university students with academic, campus-life and social challenges.",
    tech: ["LLMs", "RAG", "FastAPI"],
  },
  {
    name: "Mama-Care",
    short: "Mama-Care",
    tag: "Maternal health · Mobile AI",
    label: "Maternal health · Mobile AI",
    art: "mama",
    text: "A mobile assistant for mothers through pregnancy and early childcare, with AI health guidance and symptom tracking.",
    tech: ["Flutter", "FastAPI", "LLMs"],
  },
  {
    name: "Appointment Management System",
    short: "Appointment System",
    tag: "Scheduling · Backend",
    label: "Scheduling · Backend",
    art: "appt",
    text: "A booking platform for education, healthcare and government, with conflict detection, containerised with Docker.",
    tech: ["Django REST Framework", "PostgreSQL", "Docker"],
  },
  {
    name: "ARU Alumni Portal",
    short: "ARU Alumni Portal",
    tag: "Community · Live platform",
    label: "Community · Live platform",
    art: "alumni",
    text: "The backend behind a platform that keeps Ardhi University graduates connected.",
    tech: ["Django", "React"],
    link: { href: "https://alumni.aru.ac.tz", text: "Visit alumni.aru.ac.tz" },
  },
]

const jobs: { org: string; link?: string; when?: string; role: string; text?: string; points?: ReactNode[] }[] = [
  {
    org: "Telcotek Consult",
    link: TELCOTEK,
    when: "Present",
    role: "Software Developer & AI Specialist",
    text: "Building software and AI-powered solutions as part of a collaborative development team.",
  },
  {
    org: "Overflow Company Limited",
    when: "Sep 2026 – Present",
    role: "Software Developer & AI Engineer · Dar es Salaam",
    points: [
      "Design, build and maintain client software: backend services, APIs and system integration",
      "Integrate LLM-powered features into client applications",
      "Contribute to solution design and technical proposals for AI systems in health and the public sector",
    ],
  },
  {
    org: "Goldify",
    role: "Chief Technology Officer",
    text: "Leading the technical direction of a young technology startup focused on smart solutions to real-life problems.",
  },
  {
    org: "Ardhi University Research & Innovation Lab",
    when: "2025 – Present",
    role: "Lab Member · Dar es Salaam",
    text: "Working with multidisciplinary teams on research-driven solutions to real challenges in Tanzania, from system design through development and testing. Uni-Mind was built here.",
  },
  {
    org: "e-Government Authority (e-GA)",
    when: "Jul 2025 – Sep 2025",
    role: "Industrial Practical Training · Dodoma",
    points: [
      <><b>Muhtasari AI:</b> built the embedding pipeline (Sentence Transformers) and ChromaDB vector knowledge base for semantic retrieval in an NLP document-summarisation system</>,
      <><b>AI UnderFive:</b> developed an LLM recommendation engine giving personalised nutrition, growth and wellbeing guidance for children under five</>,
      <><b>UDOM AR/VR:</b> backend developer for an AR/VR campus-navigation prototype, with APIs in FastAPI and Django</>,
      "Testing, troubleshooting and technical support for public-sector systems",
    ],
  },
]

const awards = [
  { rank: "1st", gold: true, title: "e-GA AI Hackathon", text: "First place among 5 teams with AI UnderFive, earning an internship offer.", year: "2025" },
  { rank: "★", title: "Best Overall Project", text: "e-GA Practical Training cohort, for Muhtasari AI.", year: "2025" },
  { rank: "×2", title: "Innovation Excellence Award", text: "ARU Research and Innovation Week, for both Uni-Mind and Medi-Verify.", year: "2026" },
  { rank: "4th", title: "Tanzania Girls in ICT Hackathon", text: "Organised by TCRA, held in Arusha.", year: "2026" },
  { rank: "✦", title: "Exhibitor", text: "ARU Research and Innovation Week and the Nane Nane Exhibition, presenting AI healthcare and civic solutions to the public.", year: "2026" },
]

const beyond: { icon: IconName; title: string; text: string; link?: { label: string; href: string } }[] = [
  {
    icon: "globe",
    title: "International Project Week",
    text: "Antwerp, Belgium · May 2026. Co-designed ZAS Patient Guide, a healthcare accessibility platform for people with disabilities, with an international team at AP University of Applied Sciences & ZAS.",
  },
  {
    icon: "users",
    title: "Community Relationship Manager",
    text: "· 2026",
    link: { label: "APIcon Community", href: "https://apicon.or.tz/" },
  },
  { icon: "board", title: "Workshop Facilitator", text: "Ardhi University · 2026. Trained fellow students in idea pitching and presentation." },
  { icon: "cap", title: "ICT Trainer", text: "July 2026. Trained primary school teachers at Msewe and Mgabe Primary Schools in practical AI use and Microsoft Office." },
]

const topics = [
  ["Job opportunity", "Job offer"],
  ["Project or collaboration", "Project"],
  ["CV request", "Request CV"],
  ["Just saying hello", "Say hello"],
] as const

/* ================================================================== */
/* Helpers                                                             */
/* ================================================================== */

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties

function useCopy(text: string, label: string) {
  const [state, setState] = useState(label)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState("Copied ✓")
    } catch {
      setState("Copy not available")
    }
    window.setTimeout(() => setState(label), 2200)
  }
  return [state, copy] as const
}

/* ================================================================== */
/* Animated project illustrations                                      */
/* ================================================================== */

const alumniNodes = [[160, 70], [60, 150], [260, 140], [160, 170], [110, 250], [215, 250]]
const alumniLinks = [[0, 1], [0, 2], [1, 4], [2, 5], [4, 5], [0, 3], [3, 4], [3, 5], [1, 3]]
const bookedSlots = [[0, 1], [1, 3], [2, 0], [2, 4], [3, 2], [0, 4]]

function ProjectArt({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "fin":
      return (
        <svg viewBox="0 0 320 320" className="art art-fin" aria-hidden="true">
          {[90, 140, 190, 240].map((y) => (
            <line key={y} x1="30" x2="290" y1={y} y2={y} className="gridline" />
          ))}
          <path d="M30 220 L75 200 L115 210 L155 160 L195 175 L230 110 L262 130 L290 70" className="trend" pathLength={1} />
          <circle cx="290" cy="70" r="7" className="alert" />
          <circle cx="290" cy="70" r="7" className="alert-ring" />
        </svg>
      )
    case "verify":
      return (
        <svg viewBox="0 0 320 320" className="art art-verify" aria-hidden="true">
          <rect x="80" y="60" width="160" height="210" rx="14" className="box" />
          <rect x="104" y="92" width="112" height="14" rx="7" className="soft" />
          <rect x="104" y="120" width="80" height="10" rx="5" className="soft" />
          <rect x="104" y="140" width="96" height="10" rx="5" className="soft" />
          <rect x="104" y="180" width="112" height="56" rx="8" className="soft" />
          <rect x="70" y="60" width="180" height="3" rx="1.5" className="scan" />
          <g className="check">
            <circle cx="232" cy="240" r="30" />
            <path d="M218 240l10 10 18-20" />
          </g>
        </svg>
      )
    case "mind":
      return (
        <div className="art art-mind" aria-hidden="true">
          <p className="bubble">Habari! How can I help today?</p>
          <p className="bubble me">I'm struggling to settle into campus life.</p>
          <p className="bubble">You're not alone. Let's work through it together.</p>
        </div>
      )
    case "mama":
      return (
        <svg viewBox="0 0 320 320" className="art art-mama" aria-hidden="true">
          <circle cx="160" cy="140" r="90" className="ripple" />
          <circle cx="160" cy="140" r="90" className="ripple r2" />
          <circle cx="160" cy="140" r="62" className="core" />
          <text x="160" y="136" textAnchor="middle" className="week">24</text>
          <text x="160" y="160" textAnchor="middle" className="week-label">WEEKS</text>
          <path d="M30 270h70l12-22 16 40 16-54 14 36h132" className="pulse" pathLength={1} />
        </svg>
      )
    case "appt":
      return (
        <svg viewBox="0 0 320 320" className="art art-appt" aria-hidden="true">
          <rect x="50" y="60" width="220" height="200" rx="16" className="cal" />
          <path d="M66 60h188a16 16 0 0 1 16 16v28H50V76a16 16 0 0 1 16-16Z" className="cal-top" />
          {Array.from({ length: 20 }, (_, n) => (
            <rect key={n} x={66 + (n % 5) * 40} y={120 + Math.floor(n / 5) * 34} width="28" height="22" rx="5" className="slot" />
          ))}
          {bookedSlots.map(([r, c], i) => (
            <rect key={`b${i}`} x={66 + c * 40} y={120 + r * 34} width="28" height="22" rx="5" className="slot book" style={{ "--i": i } as CSSProperties} />
          ))}
        </svg>
      )
    case "alumni":
      return (
        <svg viewBox="0 0 320 320" className="art art-alumni" aria-hidden="true">
          {alumniLinks.map(([a, b], i) => (
            <line key={i} x1={alumniNodes[a][0]} y1={alumniNodes[a][1]} x2={alumniNodes[b][0]} y2={alumniNodes[b][1]} pathLength={1} style={{ "--i": i } as CSSProperties} />
          ))}
          {alumniNodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="13" style={{ "--i": i } as CSSProperties} />
          ))}
        </svg>
      )
  }
}

/* ================================================================== */
/* Sections                                                            */
/* ================================================================== */

function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open)
  }, [open])

  return (
    <header className="nav" id="nav">
      <div className="wrap">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">ZN</span>
          <span>Zakia Naswabu George</span>
        </a>
        <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
        </button>
        <nav className="nav-links" aria-label="Main">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" className="cta" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const [word, setWord] = useState({ cur: 0, prev: -1 })
  const [photo, setPhoto] = useState(0)
  const photoTimer = useRef<number>(undefined)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setWord((w) => ({ cur: (w.cur + 1) % heroWords.length, prev: w.cur })), 2400)
    return () => window.clearInterval(id)
  }, [])

  const startPhotos = () => {
    window.clearInterval(photoTimer.current)
    if (prefersReducedMotion()) return
    photoTimer.current = window.setInterval(() => setPhoto((p) => (p + 1) % heroPhotos.length), 5000)
  }

  useEffect(() => {
    startPhotos()
    return () => window.clearInterval(photoTimer.current)
  }, [])

  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="hero-copy">
          <span className="hero-tag"><i /> Dar es Salaam, Tanzania</span>
          <h1><span className="h1-lead">Building thoughtful</span> solutions for <em>real-world problems.</em></h1>
          <p className="hero-role">
            I build{" "}
            <span className="rotator">
              {heroWords.map((w, i) => (
                <span key={w} className={i === word.cur ? "on" : i === word.prev ? "off" : ""}>{w}</span>
              ))}
            </span>
          </p>
          <p className="hero-text">
            I'm Zakia, a software engineer and AI specialist who loves solving real problems. I build smart, reliable
            software and lead projects with clear plans, good teamwork and a focus on the people they serve.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn primary">View my projects <Icon name="arrow" size={18} /></a>
            <a href="#contact" className="btn ghost">Contact me</a>
          </div>
        </div>

        <figure className="hero-photo">
          <div className="photo-frame">
            {heroPhotos.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                className={i === photo ? "active" : undefined}
                aria-hidden={i !== photo}
                style={{ "--pos": p.pos } as CSSProperties}
              />
            ))}
          </div>
          <div className="slide-dots" aria-label="Choose photo">
            {heroPhotos.map((_, i) => (
              <button key={i} className={i === photo ? "on" : undefined} aria-label={`Photo ${i + 1}`} onClick={() => { setPhoto(i); startPhotos() }} />
            ))}
          </div>
          <a className="float-card one" href={TELCOTEK} target="_blank" rel="noreferrer" aria-label="Software Developer and AI Specialist at Telcotek Consult (opens their website)">
            <span className="ic"><Icon name="code" /></span>
            <span><b>Software Developer &amp; AI Specialist</b>at Telcotek Consult <Icon name="out" size={13} className="card-out" /></span>
          </a>
          <div className="float-card two">
            <span className="ic"><Icon name="spark" /></span>
            <span><b>CTO</b>at Goldify</span>
          </div>
        </figure>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div data-reveal>
          <p className="kicker">About me</p>
          <h2 className="section-title">A little about <em>me.</em></h2>
        </div>
        <div className="about-body" data-reveal>
          <p className="lead">
            I'm drawn to the space where <em>technology meets everyday life</em>, where a well-built system can make
            something clearer, safer or more accessible.
          </p>
          <p>
            My journey began with a Bachelor of Science in Information Systems Management at Ardhi University, building a
            foundation that connects software engineering with the people and systems it serves.
          </p>
          <p>
            Since then, I've been building products designed around genuine needs, and I've learned that I enjoy leading
            the work as much as writing the code.
          </p>
          <div className="facts">
            <div className="fact"><small>GPA</small><b>4.4 / 5.0</b></div>
            <div className="fact"><small>BSc</small><b>Class of 2026</b></div>
            <div className="fact"><small>Languages</small><b>Swahili · English</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div data-reveal>
          <p className="kicker">Technical skills</p>
          <h2 className="section-title">What I work <em>with.</em></h2>
          <p className="section-lead">From the interface people use to the logic, data and AI behind it.</p>
        </div>
        <div className="skill-grid">
          {skills.map((s, i) => (
            <article key={s.title} className={`skill-card${s.wide ? " wide" : ""}`} data-reveal style={delay((i % 3) * 0.08)}>
              <div className="skill-head">
                <span className="ic"><Icon name={s.icon} size={22} /></span>
                <h3>{s.title}</h3>
              </div>
              <p>{s.note}</p>
              <div className="chips">
                {s.items.map((item) => <span key={item}>{item}</span>)}
                {s.learning && <span className="learning">{s.learning}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [active, setActive] = useState(0)
  const [manual, setManual] = useState(false)
  const [paused, setPaused] = useState(false)
  const [running, setRunning] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const list = useRef<HTMLDivElement>(null)

  // On phones the project names are a sideways-scrolling row: keep the current one in view.
  // (Only the row scrolls, never the page.)
  useEffect(() => {
    const row = list.current
    const tab = tabs.current[active]
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return
    // Line the active name up with the row's left edge (matches the row's snap points)
    const left = row.scrollLeft + tab.getBoundingClientRect().left - row.getBoundingClientRect().left
    row.scrollTo({ left: Math.max(0, left), behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }, [active])

  // Start the auto-advance only once the section is on screen
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRunning(true), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const choose = (i: number, focus = false) => {
    setManual(true)
    setActive(i)
    if (focus) tabs.current[i]?.focus()
  }

  const onKey = (e: KeyboardEvent, i: number) => {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!next) return
    e.preventDefault()
    choose((i + next + projects.length) % projects.length, true)
  }

  const cls = ["showcase", running && "running", paused && "paused", manual && "manual"].filter(Boolean).join(" ")

  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div className="projects-head" data-reveal>
          <div>
            <p className="kicker">Selected work</p>
            <h2 className="section-title">Projects I've <em>built.</em></h2>
          </div>
          <p className="section-lead">AI, web and mobile projects for finance, health, education and community.</p>
        </div>

        <div data-reveal>
          <div className={cls} ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="show-list" role="tablist" aria-label="Projects" ref={list}>
              {projects.map((p, i) => (
                <button
                  key={p.name}
                  ref={(el) => { tabs.current[i] = el }}
                  role="tab"
                  id={`tab-${i}`}
                  aria-controls={`panel-${i}`}
                  aria-selected={i === active}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span><b>{p.short}</b><small>{p.tag}</small></span>
                  <i className="bar" onAnimationEnd={() => !manual && setActive((i + 1) % projects.length)} />
                </button>
              ))}
            </div>

            <div className="show-stage">
              {projects.map((p, i) => (
                <article
                  key={p.name}
                  className={`show-panel p-${p.art}${i === active ? " active" : ""}`}
                  role="tabpanel"
                  id={`panel-${i}`}
                  aria-labelledby={`tab-${i}`}
                  aria-hidden={i !== active}
                >
                  <div className="show-art"><ProjectArt kind={p.art} /></div>
                  <div className="show-info">
                    <span className="project-label">{p.label}</span>
                    <h3>{p.name}</h3>
                    <p>{p.text}</p>
                    <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                    {p.link && (
                      <div className="project-foot">
                        <a className="text-link" href={p.link.href} target="_blank" rel="noreferrer" tabIndex={i === active ? 0 : -1}>
                          {p.link.text} <Icon name="out" size={16} />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="wrap">
        <div className="exp-intro" data-reveal>
          <p className="kicker">Experience</p>
          <h2 className="section-title">Learning by <em>building,</em> growing by doing.</h2>
          <p className="section-lead">The roles that have shaped how I think, collaborate and turn ideas into useful technology.</p>
        </div>
        <div className="timeline" id="timeline">
          {jobs.map((j) => (
            <article key={j.org} className="job" data-reveal>
              <div className="job-top">
                <h3>
                  {j.link ? (
                    <a className="org-link" href={j.link} target="_blank" rel="noreferrer">
                      {j.org} <Icon name="out" size={18} />
                    </a>
                  ) : (
                    j.org
                  )}
                </h3>
                {j.when && <span className="job-when">{j.when}</span>}
              </div>
              <p className="job-role">{j.role}</p>
              {j.text && <p>{j.text}</p>}
              {j.points && (
                <ul className="points">
                  {j.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Awards() {
  return (
    <section className="awards" id="awards">
      <div className="wrap">
        <div data-reveal>
          <p className="kicker">Recognition</p>
          <h2 className="section-title">Awards &amp; <em>achievements.</em></h2>
        </div>
        <div className="award-grid">
          {awards.map((a, i) => (
            <article key={a.title} className={`award${a.gold ? " gold" : ""}`} data-reveal style={delay(i * 0.06)}>
              <span className="rank">{a.rank}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <small>{a.year}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* Moments (photo gallery)                                             */
/* ================================================================== */

const galleryFiles = import.meta.glob<string>("./assets/gallery/*.jpg", { eager: true, import: "default" })
const galleryImg = (name: string, thumb = false) => galleryFiles[`./assets/gallery/${name}${thumb ? "-thumb" : ""}.jpg`]

const momentEvents = ["ARU Exhibition", "Nane Nane", "Teaching", "Antwerp", "Certificates"] as const
type MomentEvent = (typeof momentEvents)[number]

const moments: { file: string; event: MomentEvent; caption: string }[] = [
  { file: "aru-presenting", event: "ARU Exhibition", caption: "Presenting my AI projects on stage at the ARU Research & Innovation Exhibition Week 2026" },
  { file: "aru-award", event: "ARU Exhibition", caption: "Receiving the Innovation Excellence Award at the ARU Research & Innovation Exhibition Week 2026" },
  { file: "nanenane-students", event: "Nane Nane", caption: "Explaining a project to secondary school students at the Nane Nane Exhibition 2026" },
  { file: "pitching-whiteboard", event: "Teaching", caption: "Teaching fellow students how to pitch their ideas at Ardhi University" },
  { file: "antwerp-class", event: "Antwerp", caption: "In class during International Project Week at AP Hogeschool, Antwerp, Belgium" },
  { file: "ict-training", event: "Teaching", caption: "Training primary school teachers in Microsoft Office and practical AI use" },
  { file: "aru-team", event: "ARU Exhibition", caption: "Celebrating with the team at the ARU Research & Innovation Exhibition Week 2026" },
  { file: "nanenane-demo", event: "Nane Nane", caption: "Demonstrating a solution to a visitor at Nane Nane 2026" },
  { file: "cert-mediverify", event: "Certificates", caption: "Innovation Excellence Award for the AI-based Medicine Authentication System (Medi-Verify)" },
  { file: "pitching-coaching", event: "Teaching", caption: "Coaching students one-on-one during the pitching workshop" },
  { file: "nanenane-team", event: "Nane Nane", caption: "With the Ardhi University exhibition team at Nane Nane 2026" },
  { file: "cert-unimind", event: "Certificates", caption: "Innovation Excellence Award for Uni-Mind" },
  { file: "ict-classroom", event: "Teaching", caption: "A hands-on ICT session with primary school teachers" },
  { file: "cert-hackathon", event: "Certificates", caption: "Certificate of participation: AI Hackathon training, Girls in ICT 2026 (23–27 March)" },
]

function Moments() {
  const [filter, setFilter] = useState<MomentEvent | "All">("All")
  const [open, setOpen] = useState<number | null>(null)
  const shown = moments.filter((m) => filter === "All" || m.event === filter)
  const lastFocus = useRef<HTMLElement | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)

  const openAt = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement
    setOpen(i)
  }
  const close = () => {
    setOpen(null)
    lastFocus.current?.focus()
  }
  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + shown.length) % shown.length))

  // While the photo viewer is open: lock page scrolling, keyboard controls
  useEffect(() => {
    if (open === null) return
    const html = document.documentElement
    html.classList.add("lb-open")
    closeBtn.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      html.classList.remove("lb-open")
      window.removeEventListener("keydown", onKey)
    }
  }, [open === null])

  const current = open === null ? null : shown[open]

  return (
    <section className="moments" id="moments">
      <div className="wrap">
        <div className="moments-head" data-reveal>
          <div>
            <p className="kicker">Moments</p>
            <h2 className="section-title">Along the <em>way.</em></h2>
          </div>
          <p className="section-lead">Exhibitions, awards, teaching and travel: a few moments from outside the code editor.</p>
        </div>

        <div className="moment-filters" role="group" aria-label="Filter photos" data-reveal>
          {(["All", ...momentEvents] as const).map((f) => (
            <button key={f} className={f === filter ? "on" : undefined} aria-pressed={f === filter} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="moment-grid" data-reveal>
          {shown.map((m, i) => (
            <button key={m.file} className="moment" onClick={() => openAt(i)} aria-label={`Open photo: ${m.caption}`}>
              <img src={galleryImg(m.file, true)} alt={m.caption} loading="lazy" decoding="async" />
              <span className="moment-tag">{m.event}</span>
              <span className="moment-cap">{m.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {current && open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          <button className="lb-close" ref={closeBtn} onClick={close} aria-label="Close photo viewer">✕</button>
          <button className="lb-nav prev" onClick={() => step(-1)} aria-label="Previous photo">‹</button>
          <figure className="lb-figure" key={current.file}>
            <img src={galleryImg(current.file)} alt={current.caption} />
            <figcaption>
              <span className="lb-event">{current.event}</span>
              {current.caption}
              <span className="lb-count">{open + 1} / {shown.length}</span>
            </figcaption>
          </figure>
          <button className="lb-nav next" onClick={() => step(1)} aria-label="Next photo">›</button>
        </div>
      )}
    </section>
  )
}

function Beyond() {
  return (
    <section className="beyond" id="beyond">
      <div className="wrap">
        <div data-reveal>
          <p className="kicker">Beyond code</p>
          <h2 className="section-title">More than <em>writing code.</em></h2>
          <p className="section-lead">Good software needs good planning and good people, not just good code.</p>
        </div>
        <div className="beyond-grid">
          <article className="best" data-reveal>
            <span className="best-badge"><Icon name="spark" size={16} /> What I'm best at</span>
            <h3>Project Management</h3>
            <p>I make sure projects don't just get started, they get finished, with the team aligned along the way.</p>
            <div className="chips">
              <span>Planning &amp; scoping</span>
              <span>Team coordination</span>
              <span>Timelines &amp; delivery</span>
              <span>Stakeholder communication</span>
            </div>
          </article>
          <div className="soft-skills">
            {beyond.map((b, i) => (
              <article key={b.title} className="soft" data-reveal style={delay(0.05 + i * 0.05)}>
                <span className="ic"><Icon name={b.icon} /></span>
                <div>
                  <h3>{b.title}</h3>
                  <p>
                    {b.link && (
                      <>
                        <a className="inline-link" href={b.link.href} target="_blank" rel="noreferrer">
                          {b.link.label} <Icon name="out" size={13} />
                        </a>{" "}
                      </>
                    )}
                    {b.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [topic, setTopic] = useState<string>(topics[0][0])
  const [error, setError] = useState("")
  const [invalid, setInvalid] = useState<string | null>(null)
  const [sentMessage, setSentMessage] = useState<string | null>(null)
  // "sent" = delivered straight to Zakia's inbox; "mailto" = visitor's email app was opened
  const [result, setResult] = useState<"sent" | "mailto" | null>(null)
  const [sending, setSending] = useState(false)
  const [emailLabel, copyEmail] = useCopy(EMAIL, "Copy email")
  const [msgLabel, copyMsg] = useCopy(sentMessage ?? "", "Copy my message")

  const openEmailApp = (subject: string, body: string) => {
    setResult("mailto")
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    let problem = ""
    let field: string | null = null
    if (!name) [problem, field] = ["Please add your name.", "name"]
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) [problem, field] = ["Please add a valid email address.", "email"]
    else if (!message && topic !== "CV request") [problem, field] = ["Please write a short message.", "message"]
    setError(problem)
    setInvalid(field)
    if (problem) return

    const subject = `${topic} (from ${name})`
    const body = `${message || "I'd like to request a copy of your CV."}\n\n${name}\n${email}`
    setSentMessage(`Subject: ${subject}\n\n${body}`)

    // No Web3Forms key yet: fall back to the visitor's own email app
    if (!WEB3FORMS_KEY) return openEmailApp(subject, body)

    setSending(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio: ${subject}`,
          from_name: name,
          name,
          email,
          topic,
          message: message || "I'd like to request a copy of your CV.",
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success) setResult("sent")
      else throw new Error(json.message || "Send failed")
    } catch {
      // If the service is unreachable, don't lose the message: use the email app instead
      openEmailApp(subject, body)
    } finally {
      setSending(false)
    }
  }

  const reset = (form: HTMLFormElement | null) => {
    form?.reset()
    setTopic(topics[0][0])
    setSentMessage(null)
    setResult(null)
  }
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div data-reveal>
          <p className="kicker">Contact</p>
          <h2>Have an idea <em>worth building?</em></h2>
          <p className="contact-text">
            I'm open to software engineering and project management roles, meaningful projects and collaborations. Send
            me a message, or request my CV, and I'll reply by email.
          </p>
          <div className="email-box">
            <span className="email-text">{EMAIL}</span>
            <button className="copy" type="button" onClick={copyEmail}>{emailLabel}</button>
          </div>
        </div>

        <form className="contact-form" ref={formRef} noValidate onSubmit={submit} data-reveal style={delay(0.1)}>
          <fieldset className="topics">
            <legend>What's this about?</legend>
            {topics.map(([value, label]) => (
              <label key={value}>
                <input type="radio" name="topic" value={value} checked={topic === value} onChange={() => setTopic(value)} />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <div className="field-row">
            <label className="field">
              <span>Your name</span>
              <input name="name" autoComplete="name" placeholder="How should I address you?" className={invalid === "name" ? "invalid" : undefined} />
            </label>
            <label className="field">
              <span>Your email</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={invalid === "email" ? "invalid" : undefined} />
            </label>
          </div>
          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows={4}
              placeholder={topic === "CV request" ? "Optional: tell me about the role or opportunity…" : "Tell me a little about what you have in mind…"}
              className={invalid === "message" ? "invalid" : undefined}
            />
          </label>
          <p className="form-error" role="alert">{error}</p>
          <button className="btn send" type="submit" disabled={sending}>
            <span>{sending ? "Sending…" : "Send message"}</span> <Icon name="arrow" size={18} />
          </button>

          {result === "sent" && (
            <div className="form-done" role="status">
              <span className="done-ic"><Icon name="mail" size={22} /></span>
              <div>
                <b>Thank you, your message has been sent!</b>
                <p>I've received it and will reply to you by email as soon as I can.</p>
                <div className="done-actions">
                  <button type="button" className="link-btn" onClick={() => reset(formRef.current)}>Write another</button>
                </div>
              </div>
            </div>
          )}

          {result === "mailto" && (
            <div className="form-done" role="status">
              <span className="done-ic"><Icon name="mail" size={22} /></span>
              <div>
                <b>Almost there: your email app should now be open.</b>
                <p>Your message is ready to Zakia. Just press send. If nothing opened, copy your message and email it to {EMAIL}.</p>
                <div className="done-actions">
                  <button type="button" className="copy dark" onClick={copyMsg}>{msgLabel}</button>
                  <button type="button" className="link-btn" onClick={() => reset(formRef.current)}>Write another</button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <p>Let's stay connected.</p>
          <div className="socials">
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Zakia Naswabu George</span>
        </div>
      </div>
    </footer>
  )
}

function BackToTop() {
  return (
    <a href="#home" className="to-top" id="to-top" aria-label="Back to top">
      <svg className="to-top-ring" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r="26" className="ring-bg" />
        <circle cx="28" cy="28" r="26" className="ring-fill" pathLength={1} />
      </svg>
      <svg className="arrow-up" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
      <span className="to-top-label">Back to top</span>
    </a>
  )
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */

export default function App() {
  // One scroll handler: nav background, active link, reveal on scroll,
  // timeline progress line and the back-to-top button.
  useEffect(() => {
    const root = document.documentElement
    root.classList.add("js")

    const nav = document.getElementById("nav")!
    const toTop = document.getElementById("to-top")!
    const timeline = document.getElementById("timeline")!
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a:not(.cta)"))
    const sections = links.map((a) => document.querySelector<HTMLElement>(a.getAttribute("href")!))
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))

    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const max = root.scrollHeight - vh
      nav.classList.toggle("scrolled", window.scrollY > 20)
      toTop.classList.toggle("show", window.scrollY > vh * 0.8)
      toTop.style.setProperty("--scroll", Math.min(1, window.scrollY / max).toFixed(3))

      let active = -1
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top < vh * 0.4) active = i
      })
      links.forEach((a, i) => a.classList.toggle("active", i === active))

      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < vh * 0.9) {
          el.classList.add("shown")
          return false
        }
        return true
      })

      const r = timeline.getBoundingClientRect()
      timeline.style.setProperty("--p", Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height)).toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
      root.classList.remove("js")
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Awards />
        <Beyond />
        <Moments />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

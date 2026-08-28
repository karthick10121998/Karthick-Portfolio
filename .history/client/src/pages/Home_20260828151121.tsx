/**
 * UX Field Notes: Dribbble-reference monochrome UI/UX portfolio. Editorial grid, warm paper,
 * ink typography, grayscale imagery, progressive-disclosure case studies, and product-minded interactions.
 */
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import "../interaction-enhancements.css";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  Mail,
  Menu,
  MoveDown,
  MoveUpRight,
  Plus,
  X,
} from "lucide-react";

type Project = {
  title: string;
  category: string;
  group: "ai" | "enterprise" | "product" | "web";
  image: string;
  summary: string;
  role: string;
  year: string;
  focus: string;
  tags: string[];
  context: string[];
  behanceUrl?: string;
  confidential?: boolean;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type Practice = {
  number: string;
  name: string;
  detail: string;
  keywords: string[];
};

type Capability = {
  number: string;
  name: string;
  label: string;
  detail: string;
  tags: string[];
};

type CareerRole = {
  role: string;
  company: string;
  dates: string;
  location: string;
  current?: boolean;
  detail: string;
  contributions: string[];
};

const projects: Project[] = [
  {
    title: "Indian Navy / INICAI",
    category: "AI product · Enterprise",
    group: "ai",
    image: "/Indian_Navy_applications.jpg",
    summary:
      "AI interfaces, dashboards, and information-heavy workflows designed for online and fully offline operational environments.",
    role: "UI/UX Designer",
    year: "2025–2026",
    focus: "AI UX · Dashboard patterns · Design systems",
    tags: ["AI Product", "Enterprise", "Confidential"],
    context: ["AI interfaces", "Offline workflows", "Design systems"],
    confidential: true,
  },
  {
    title: "PIMS (Talkback)",
    category: "Workflow · Dashboard",
    group: "enterprise",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    summary:
      "A clearer information hierarchy and task flow for an enterprise dashboard, helping people scan and act on key information faster.",
    role: "UI/UX Designer",
    year: "2025",
    focus: "Information architecture · Prototyping · Dashboards",
    tags: ["Dashboard", "Enterprise", "Workflow"],
    context: ["Information hierarchy", "Task flows", "Dashboards"],
  },
  {
    title: "GS Fresh Web App",
    category: "Commerce · Responsive UX",
    group: "product",
    image: "/manus-storage/karthick-project-commerce_df563adb.jpg",
    summary:
      "A responsive grocery-shopping journey focused on product discovery, straightforward purchasing, and clarity across devices.",
    role: "Product Designer",
    year: "2024",
    focus: "User flows · Responsive UI · E-commerce",
    tags: ["E-commerce", "Shopping", "Responsive"],
    context: ["Responsive UX", "Product discovery", "Purchase flow"],
  },
  {
    title: "Norwood Charity",
    category: "Web design · Accessibility",
    group: "web",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=85",
    summary:
      "A simplified donation journey and navigation system designed to make giving feel more accessible and less demanding.",
    role: "UI/UX Designer",
    year: "2024",
    focus: "User journeys · Wireframes · Accessible UI",
    tags: ["Charity", "Web design", "UX"],
    context: ["Donation journey", "Navigation", "Accessible UI"],
  },
  {
    title: "Rusticgram",
    category: "Social product · UI systems",
    group: "product",
    image: "/client/public/karthick-project-social_641dd8d5.jpg",
    summary:
      "A responsive social-platform concept with reusable components, purposeful navigation, and a quieter interface for connection.",
    role: "UI/UX Designer",
    year: "2024",
    focus: "UI systems · Responsive design · Components",
    tags: ["Social", "Components", "Responsive"],
    context: ["UI components", "Social flows", "Responsive UI"],
  },
  {
    title: "PassionPro",
    category: "SaaS · Productivity",
    group: "enterprise",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    summary:
      "Task-focused dashboard patterns designed to make complex daily work easier to understand, prioritise, and complete.",
    role: "UI/UX Designer",
    year: "2024",
    focus: "SaaS UX · Task flows · Design patterns",
    tags: ["SaaS", "Productivity", "Dashboard"],
    context: ["Task flow", "SaaS UX", "Design patterns"],
  },
];

// This stays empty until the user supplies approved quotations and attribution details.
const testimonials: Testimonial[] = [];

const filters = [
  ["all", "All work"],
  ["ai", "AI products"],
  ["enterprise", "Enterprise"],
  ["product", "Apps"],
  ["web", "Web"],
] as const;

const navigationItems = [
  ["about", "About"],
  ["work", "Work"],
  ["capabilities", "Create"],
  ["journey", "Journey"],
  ["contact", "Contact"],
] as const;

const practice: Practice[] = [
  {
    number: "01",
    name: "Discover",
    detail: "I begin with the people, tasks, constraints, and decisions behind the screen—so the design has a reason to exist.",
    keywords: ["Research", "User flows", "Information architecture"],
  },
  {
    number: "02",
    name: "Structure",
    detail: "I turn findings into an understandable product map: priorities, navigation, content hierarchy, and reusable interaction rules.",
    keywords: ["UX strategy", "Wireframes", "Content hierarchy"],
  },
  {
    number: "03",
    name: "Design",
    detail: "I shape useful interfaces into polished, responsive experiences with a consistent visual language and clear affordances.",
    keywords: ["High-fidelity UI", "Prototypes", "Design systems"],
  },
  {
    number: "04",
    name: "Deliver",
    detail: "I work alongside developers and stakeholders to reduce ambiguity, document patterns, and make handoff practical.",
    keywords: ["Developer handoff", "Components", "QA support"],
  },
];

const capabilities: Capability[] = [
  { number: "01", name: "AI Product Design", label: "What I do", detail: "Designing AI-powered applications, dashboards, chat experiences, and online or offline workflows that make complex systems feel understandable and human.", tags: ["AI interfaces", "AI chat", "Dashboards", "Online + offline"] },
  { number: "02", name: "Enterprise Application Design", label: "What I do", detail: "Organising complex information, permissions, task flows, and reusable patterns into enterprise interfaces that support confident action.", tags: ["Workflows", "Information hierarchy", "Data views", "Usability"] },
  { number: "03", name: "Mobile App Design", label: "What I create", detail: "Designing intuitive mobile journeys that make essential actions easy to find, understand, and complete across iOS and Android contexts.", tags: ["Mobile UX", "Interaction design", "Responsive patterns", "Prototypes"] },
  { number: "04", name: "Website & Web App Design", label: "What I create", detail: "Crafting responsive marketing sites and product experiences with visual clarity, strong information architecture, and practical developer handoff.", tags: ["Web design", "Web apps", "Responsive UI", "Frontend awareness"] },
  { number: "05", name: "Design Systems", label: "What I do", detail: "Creating scalable component libraries, reusable interaction patterns, and visual rules that keep interfaces consistent from screen to screen.", tags: ["Components", "Patterns", "Documentation", "Handoff"] },
  { number: "06", name: "Motion, Brand & Visual", label: "What I create", detail: "Using purposeful motion, video, poster, and logo design to help a product or message communicate with more clarity and personality.", tags: ["Motion design", "Video", "Poster design", "Brand identity"] },
  { number: "07", name: "UX Research & Strategy", label: "What I do", detail: "Moving from user needs and product constraints to clear flows, navigation, content hierarchy, and design priorities.", tags: ["Product thinking", "User research", "User flows", "UX strategy"] },
  { number: "08", name: "Frontend Development", label: "What I create", detail: "Bridging design and implementation through hands-on knowledge of React, HTML, CSS, Tailwind CSS, and modern responsive interfaces.", tags: ["React", "HTML / CSS", "Tailwind", "Developer collaboration"] },
];

const career: CareerRole[] = [
  { role: "UI/UX Designer", company: "Cloudstrats — Indian Navy / INICAI", dates: "June 2026 — Present", location: "India", current: true, detail: "Designing AI-powered applications and enterprise interfaces for Indian Navy / INICAI across different operational environments.", contributions: ["Designing AI applications, dashboards, and enterprise interfaces.", "Working across online and fully offline AI product environments.", "Creating reusable UI components and design patterns for consistency."] },
  { role: "UI/UX Developer", company: "Pinaca Technologies — Indian Navy / INICAI", dates: "April 2025 — June 2026", location: "India", detail: "Designed AI-based interfaces and supported implementation for Indian Navy / INICAI projects.", contributions: ["Created user flows, wireframes, prototypes, and responsive UI.", "Built and maintained design systems using Figma and Adobe XD.", "Supported frontend work with React.js, HTML, CSS, and Tailwind CSS."] },
  { role: "UI/UX Designer", company: "Aramporul Tech Pvt Ltd", dates: "February 2024 — June 2024", location: "Chennai", detail: "Improved website experiences by bringing structure to navigation, layouts, and reusable interaction components.", contributions: ["Designed responsive web interfaces and improved information architecture.", "Created wireframes, prototypes, polished UI, and interactive components.", "Worked alongside developers to deliver consistent user experiences."] },
  { role: "Senior Software Engineer", company: "Technology Transformation Group", dates: "November 2021 — July 2023", location: "Bangalore", detail: "Built the technical and enterprise foundation that continues to inform a product-minded design practice.", contributions: ["Redesigned enterprise interfaces across more than five applications.", "Worked with modern frontend technologies and responsive UI.", "Collaborated across teams to improve workflows and reusable patterns."] },
];

const skillDomains = [
  { name: "Product & UX", skills: ["Product thinking", "UX strategy", "User research", "Information architecture", "User flows", "User-centred design"] },
  { name: "UI & Interaction", skills: ["Wireframing", "Prototyping", "Interaction design", "High-fidelity UI", "Responsive design", "Accessibility"] },
  { name: "AI Product Design", skills: ["AI interfaces", "AI chat experiences", "AI dashboards", "AI workflows", "Online & offline AI", "Data visualisation"] },
  { name: "Design Systems", skills: ["Component libraries", "Reusable components", "Design patterns", "Design consistency", "Developer handoff"] },
];

const education = [
  { title: "Advanced UI/UX Design Certification", institution: "Web D School, Chennai", dates: "2023 — 2024" },
  { title: "Bachelor of Technology — Information Technology", institution: "Rajalakshmi Engineering College", dates: "2016 — 2020" },
];

const certifications = [
  { title: "Advanced UI/UX Designer", detail: "Web D School, Chennai" },
  { title: "AZ-900: Microsoft Azure Fundamentals", detail: "Cloud & AI fundamentals" },
  { title: ".NET (C#) Certification", detail: "Backend & application development" },
];

const toolset = ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "DaVinci Resolve", "Blender / Spline", "Framer / Webflow", "React / HTML / CSS", "Tailwind CSS", "Git / GitHub"];
const trustedContext = ["Cloudstrats", "Pinaca Technologies", "Aramporul Tech", "Technology Transformation Group", "Indian Navy / INICAI", "Norwood Charity", "GS Fresh", "Rusticgram", "PassionPro"];

const sectionIds = ["home", "about", "work", "capabilities", "journey", "practice", "credentials", "contact"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProjectModal({ project, position, total, onPrevious, onNext, onClose }: { project: Project; position: number; total: number; onPrevious: () => void; onNext: () => void; onClose: () => void }) {
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="case-modal" role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
      <button className="case-modal-scrim" aria-label="Close case study" onClick={onClose} />
      <article className="case-modal-panel">
        <div className="case-modal-image">
          <img src={project.image} alt="" />
          <button className="case-modal-close" onClick={onClose} aria-label="Close case study"><X size={19} /></button>
          <p>Case study / {project.year}</p>
        </div>
        <div className="case-modal-copy">
          <p className="eyebrow">{project.category}</p>
          <h2>{project.title}</h2>
          <p className="case-modal-summary">{project.summary}</p>
          {project.confidential && <p className="confidential-note"><Check size={13} /> Specific product information remains confidential.</p>}
          <dl className="case-modal-meta">
            <div><dt>My role</dt><dd>{project.role}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
            <div><dt>Design focus</dt><dd>{project.focus}</dd></div>
          </dl>
          <div className="case-modal-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="case-modal-controls">
            <span>{String(position + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <div>
              <button onClick={onPrevious} aria-label="View previous case study"><ArrowLeft size={15} /> Previous</button>
              <button onClick={onNext} aria-label="View next case study">Next <ArrowRight size={15} /></button>
            </div>
          </div>
          {project.behanceUrl && <a className="case-modal-behance" href={project.behanceUrl} target="_blank" rel="noreferrer">View on Behance <ArrowUpRight size={16} /></a>}
          <a className="case-modal-link" href="mailto:karthickrajavelmurugan10@gmail.com?subject=Portfolio%20enquiry">Discuss a similar project <ArrowUpRight size={16} /></a>
        </div>
      </article>
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [activePractice, setActivePractice] = useState(0);
  const [activeCapability, setActiveCapability] = useState(0);
  const [activeCareer, setActiveCareer] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderLeaving, setIsLoaderLeaving] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.group === filter)),
    [filter],
  );

  const selectedProjectPosition = selectedProject ? Math.max(0, visibleProjects.findIndex((project) => project.title === selectedProject.title)) : 0;

  const browseProject = (direction: number) => {
    if (!selectedProject || visibleProjects.length === 0) return;
    const currentIndex = Math.max(0, visibleProjects.findIndex((project) => project.title === selectedProject.title));
    const nextIndex = (currentIndex + direction + visibleProjects.length) % visibleProjects.length;
    setSelectedProject(visibleProjects[nextIndex]);
  };

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(100, Math.round((window.scrollY / available) * 100)) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -48% 0px", threshold: [0.1, 0.4, 0.65] },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((target) => {
      target.classList.add("will-reveal");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoadProgress(100);
      setIsLoading(false);
      return;
    }
    let progress = 0;
    const ticker = window.setInterval(() => {
      progress = Math.min(92, progress + 8 + Math.round(Math.random() * 7));
      setLoadProgress(progress);
    }, 86);
    const leave = window.setTimeout(() => {
      window.clearInterval(ticker);
      setLoadProgress(100);
      setIsLoaderLeaving(true);
    }, 780);
    const unmount = window.setTimeout(() => setIsLoading(false), 1050);
    return () => {
      window.clearInterval(ticker);
      window.clearTimeout(leave);
      window.clearTimeout(unmount);
    };
  }, []);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!supportsFinePointer.matches || prefersReducedMotion.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;
    const isInteractive = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, [role='tab']"));
    const moveCursor = (event: PointerEvent) => {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.classList.add("is-visible");
      cursor.classList.toggle("is-active", isInteractive(event.target));
    };
    const hideCursor = () => cursor.classList.remove("is-visible");
    const pressCursor = () => cursor.classList.add("is-pressed");
    const releaseCursor = () => cursor.classList.remove("is-pressed");

    document.body.classList.add("has-ux-cursor");
    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    window.addEventListener("pointerdown", pressCursor, { passive: true });
    window.addEventListener("pointerup", releaseCursor, { passive: true });
    return () => {
      document.body.classList.remove("has-ux-cursor");
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      window.removeEventListener("pointerdown", pressCursor);
      window.removeEventListener("pointerup", releaseCursor);
    };
  }, []);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") || "Portfolio enquiry");
    const body = `Name: ${String(data.get("name") || "")}\nEmail: ${String(data.get("email") || "")}\n\n${String(data.get("message") || "")}`;
    window.location.href = `mailto:karthickrajavelmurugan10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const navTo = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <main className="ux-field-notes">
      {isLoading && <div className={isLoaderLeaving ? "portfolio-loader is-leaving" : "portfolio-loader"} aria-hidden="true">
        <div className="loader-wordmark">KARTHICKRAJA<span>.</span></div>
        <div className="loader-center"><p>UI/UX PORTFOLIO</p><strong>{String(loadProgress).padStart(2, "0")}</strong><em>%</em></div>
        <div className="loader-progress"><i style={{ width: `${loadProgress}%` }} /></div>
        <p className="loader-footer">Building clarity from complexity</p>
      </div>}
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><i /></div>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={(event) => { event.preventDefault(); navTo("home"); }}>KARTHICKRAJA<span>.</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation"><Menu size={18} /> Menu</button>
        <nav id="primary-navigation" className={menuOpen ? "header-nav is-open" : "header-nav"} aria-label="Primary navigation">
          {navigationItems.map(([id, label]) => <button key={id} className={activeSection === id ? "is-active" : ""} onClick={() => navTo(id)}>{label}</button>)}
        </nav>
        <a className="header-availability" href="mailto:karthickrajavelmurugan10@gmail.com"><span />Available for selected projects</a>
        <div className="reading-progress" aria-hidden="true"><i style={{ width: `${scrollProgress}%` }} /></div>
      </header>

      <section id="home" className="hero-paper section-anchor">
        <div className="hero-rail"><span>01</span><p>Portfolio<br />2026</p></div>
        <div className="hero-copy">
          <p className="eyebrow">UI/UX designer / AI product designer</p>
          <h1>MAKE<br />PRODUCTS<br /><i>MAKE SENSE.</i></h1>
          <div className="hero-bottom">
            <p>I turn complex AI products, enterprise tools, and busy workflows into clear, human experiences.</p>
            <a className="round-cta" href="#work" onClick={(event) => { event.preventDefault(); navTo("work"); }} aria-label="Explore selected case studies"><MoveDown size={23} /><span>Explore<br />work</span></a>
          </div>
        </div>
        <div className="hero-portrait-block">
          <p className="portrait-caption portrait-caption-left">DESIGNER<br />EST. 2023</p>
          <div className="hero-portrait"><img src="/karthick-project-ai_a63a8c66.webp" alt="Karthickraja Velmurugan" /></div>
          <div className="hero-scope">
            <span>UX/UI</span><span>AI PRODUCTS</span><span>DESIGN SYSTEMS</span><span>RESPONSIVE WEB</span>
          </div>
        </div>
        <div className="hero-actions">
          <a className="ink-button" href="#work" onClick={(event) => { event.preventDefault(); navTo("work"); }}>View case studies <ArrowDownRight size={16} /></a>
          <a className="text-button" href="/client/public/Karthickraja_Design_Resume.pdf" download="Karthickraja_Design_Resume.pdf">Download resume <Download size={15} /></a>
        </div>
      </section>

      <section id="about" className="intro-strip section-anchor">
        <div className="section-number">02</div>
        <p className="intro-kicker">A designer who asks<br />what needs to be clear.</p>
        <h2>I use research, flow, and visual systems to make high-stakes tools feel calm, <i>clear,</i> and useful.</h2>
        <div className="intro-side">
          <p>3+ years designing AI products, enterprise applications, dashboards, and responsive digital experiences.</p>
          <button className="inline-link" onClick={() => navTo("practice")}>How I work <ArrowUpRight size={15} /></button>
        </div>
      </section>

      <section id="work" className="case-studies section-anchor">
        <div className="case-title-row">
          <div><span className="section-number">03</span><p className="eyebrow">Selected work</p></div>
          <h2>DESIGNING<br /><i>THE WAY FORWARD.</i></h2>
          <p className="case-title-note">Each project begins with an information problem, then becomes a calmer path through it.</p>
        </div>
        <div className="filter-area">
          <p>Browse by focus</p>
          <div className="filter-tools">
            <p className="filter-result-count" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? "case study" : "case studies"}</p>
            <div className="filter-tabs" role="tablist" aria-label="Filter case studies">
              {filters.map(([value, label]) => (
                <button key={value} role="tab" aria-selected={filter === value} className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="case-grid" aria-live="polite" key={filter}>
          {visibleProjects.map((project, index) => (
            <button className={index === 0 && filter === "all" ? "case-card case-card-featured" : "case-card"} key={project.title} onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title} case-study summary`}>
              <div className="case-card-image"><img src={project.image} alt="" /><span className="case-card-scan" /></div>
              <div className="case-card-top"><span>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span><span>{project.category}</span></div>
              <div className="case-card-context" aria-hidden="true"><span>Project context</span><p>{project.context.join(" · ")}</p></div>
              <div className="case-card-bottom"><h3>{project.title}</h3><span className="open-case">Open case story <Plus size={17} /></span></div>
            </button>
          ))}
        </div>
      </section>

      <section id="capabilities" className="capability-index section-anchor">
        <div className="capability-heading"><span className="section-number">04</span><p className="eyebrow">What I do / What I create</p><h2>IDEAS THAT<br /><i>WORK HARDER.</i></h2><p>Explore the range of product, interface, and visual work I bring to the table.</p></div>
        <div className="capability-browser">
          <div className="capability-list" role="tablist" aria-label="What Karthickraja does and creates">
            {capabilities.map((capability, index) => <button key={capability.name} role="tab" aria-selected={activeCapability === index} className={activeCapability === index ? "is-active" : ""} onClick={() => setActiveCapability(index)}><span>{capability.number}</span><strong>{capability.name}</strong><em>{capability.label}</em><ArrowUpRight size={16} /></button>)}
          </div>
          <article className="capability-detail" key={capabilities[activeCapability].number}>
            <p className="eyebrow">{capabilities[activeCapability].number} / {capabilities[activeCapability].label}</p>
            <h3>{capabilities[activeCapability].name}</h3>
            <p>{capabilities[activeCapability].detail}</p>
            <div>{capabilities[activeCapability].tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        </div>
      </section>

      <section id="journey" className="journey-paper section-anchor">
        <div className="journey-heading" data-reveal><span className="section-number">05</span><p className="eyebrow">Professional journey</p><h2>WHERE DESIGN<br /><i>MEETS IMPACT.</i></h2></div>
        <div className="journey-browser reveal-delay-1" data-reveal>
          <div className="journey-list" role="tablist" aria-label="Professional journey">
            {career.map((role, index) => <button key={role.company} role="tab" aria-selected={activeCareer === index} className={activeCareer === index ? "is-active" : ""} onClick={() => setActiveCareer(index)}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{role.role}</strong><small>{role.company}</small></div><em>{role.current ? "Current" : role.dates.split(" — ")[1]}</em></button>)}
          </div>
          <article className="journey-detail" key={career[activeCareer].company}>
            <div className="journey-detail-meta"><span>{career[activeCareer].current && <i />} {career[activeCareer].dates}</span><span>{career[activeCareer].location}</span></div>
            <h3>{career[activeCareer].role}</h3>
            <p className="journey-company">{career[activeCareer].company}</p>
            <p className="journey-summary">{career[activeCareer].detail}</p>
            <ul>{career[activeCareer].contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul>
          </article>
        </div>
      </section>

      <section id="practice" className="practice-dark section-anchor">
        <div className="practice-heading"><span className="section-number">06</span><p className="eyebrow">Design practice</p><h2>DESIGN IS<br /><i>A SERIES OF<br />GOOD QUESTIONS.</i></h2></div>
        <div className="practice-explorer">
          <div className="practice-list" role="tablist" aria-label="Design practice stages">
            {practice.map((item, index) => (
              <button key={item.number} role="tab" aria-selected={activePractice === index} className={activePractice === index ? "is-active" : ""} onClick={() => setActivePractice(index)}>
                <span>{item.number}</span><strong>{item.name}</strong><ChevronRight size={19} />
              </button>
            ))}
          </div>
          <article className="practice-detail" key={practice[activePractice].number}>
            <p className="eyebrow">{practice[activePractice].number} / {practice[activePractice].name}</p>
            <p className="practice-detail-copy">{practice[activePractice].detail}</p>
            <div>{practice[activePractice].keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
          </article>
        </div>
        <div className="proof-row"><span><b>03+</b> years of UI/UX practice</span><span><b>04</b> professional roles</span><span><b>06</b> selected product stories</span><span><b>02</b> AI operating environments</span></div>
        <div className="skill-ledger">
          <div className="skill-ledger-heading" data-reveal><p className="eyebrow">Skills &amp; design toolbox</p><p>Tools are only useful when they help people move from uncertainty to clarity.</p></div>
          <div className="skill-domain-grid reveal-delay-1" data-reveal>{skillDomains.map((domain, index) => <article key={domain.name}><span>0{index + 1}</span><h3>{domain.name}</h3><div>{domain.skills.map((skill) => <em key={skill}>{skill}</em>)}</div></article>)}</div>
          <div className="toolset-row reveal-delay-2" data-reveal><span>My design toolbox</span><div>{toolset.map((tool) => <em key={tool}>{tool}</em>)}</div></div>
          <div className="trusted-context reveal-delay-3" data-reveal><span>Experience across</span><div>{trustedContext.map((name) => <em key={name}>{name}</em>)}</div></div>
        </div>
      </section>

      <section id="credentials" className="credentials-paper section-anchor">
        <div className="credentials-heading"><span className="section-number">07</span><p className="eyebrow">Learning &amp; credentials</p><h2>BUILT ON<br /><i>CURIOSITY.</i></h2></div>
        <div className="credentials-grid">
          <article className="credential-column"><p className="eyebrow">Education</p>{education.map((item) => <div className="credential-item" key={item.title}><h3>{item.title}</h3><p>{item.institution}</p><span>{item.dates}</span></div>)}</article>
          <article className="credential-column"><p className="eyebrow">Certifications</p>{certifications.map((item) => <div className="credential-item" key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>)}</article>
          <article className="language-column"><p className="eyebrow">Languages</p><div><strong>Tamil</strong><span>Native</span></div><div><strong>English</strong><span>Professional</span></div><a href="/manus-storage/Karthick_Professional_Resume_7a2513c6.pdf" download="Karthickraja_Velmurugan_Professional_Resume.pdf">Download professional résumé <Download size={15} /></a></article>
        </div>
      </section>

      {testimonials.length > 0 && <section className="testimonials-paper section-anchor" aria-label="Client testimonials">
        <div><span className="section-number">08</span><p className="eyebrow">Client perspective</p><h2>GOOD WORK,<br /><i>WELL RECEIVED.</i></h2></div>
        <article className="testimonial-slider" key={activeTestimonial}>
          <p className="testimonial-quote">“{testimonials[activeTestimonial].quote}”</p>
          <div className="testimonial-attribution"><span>{testimonials[activeTestimonial].name}</span><small>{testimonials[activeTestimonial].role}</small></div>
          <div className="testimonial-controls"><span>{String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span><div><button onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ArrowLeft size={15} /></button><button onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)} aria-label="Next testimonial"><ArrowRight size={15} /></button></div></div>
        </article>
      </section>}

      <section id="contact" className="contact-paper section-anchor">
        <div className="contact-head"><span className="section-number">08</span><p className="eyebrow">A good place to start</p><h2>LET’S MAKE<br />THE NEXT STEP<br /><i>CLEAR.</i></h2></div>
        <div className="contact-body">
          <div className="contact-note"><p>Have an AI workflow, enterprise product, or digital service that needs a more thoughtful experience? Let’s talk.</p><a href="mailto:karthickrajavelmurugan10@gmail.com"><Mail size={16} />karthickrajavelmurugan10@gmail.com</a><p className="contact-location">Ariyalur, Tamil Nadu, India</p><div className="contact-socials"><a href="https://www.linkedin.com/in/karthickraja-velmurugan-10dec1998" target="_blank" rel="noreferrer">LinkedIn <MoveUpRight size={14} /></a><a href="https://dribbble.com/Carthee123" target="_blank" rel="noreferrer">Dribbble <MoveUpRight size={14} /></a><a href="https://www.behance.net/cartheeraja" target="_blank" rel="noreferrer">Behance <MoveUpRight size={14} /></a></div></div>
          <form className="paper-form" onSubmit={sendMessage}><label><span>Name</span><input name="name" placeholder="Your name" required /></label><label><span>Email</span><input name="email" type="email" placeholder="you@company.com" required /></label><label><span>What is this about?</span><input name="subject" placeholder="A product, idea, or opportunity" required /></label><label><span>Message</span><textarea name="message" rows={4} placeholder="A little context goes a long way." required /></label><button type="submit">Send message <ArrowUpRight size={16} /></button></form>
        </div>
        <footer><span>© 2026 Karthickraja Velmurugan</span><button onClick={() => navTo("home")}>Back to top <ArrowUpRight size={14} /></button></footer>
      </section>
      {selectedProject && <ProjectModal project={selectedProject} position={selectedProjectPosition} total={visibleProjects.length} onPrevious={() => browseProject(-1)} onNext={() => browseProject(1)} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}

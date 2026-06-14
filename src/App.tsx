import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  BriefcaseBusiness,
  Calendar,
  Code2,
  Download,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  Music,
  Rocket,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  aiWorkflow,
  coreSkills,
  education,
  experience,
  personalNotes,
  products,
  strengths,
  type Experience,
} from "./data";

type Theme = "light" | "dark";

const accentClasses: Record<Experience["accent"], string> = {
  leaf: "bg-leaf text-white",
  river: "bg-river text-white",
  ember: "bg-ember text-white",
  gold: "bg-gold text-zinc-950",
};

const accentBorders: Record<Experience["accent"], string> = {
  leaf: "border-leaf/45",
  river: "border-river/45",
  ember: "border-ember/45",
  gold: "border-gold/50",
};

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((value) => (value === "dark" ? "light" : "dark")),
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <m.div
      className="mx-auto mb-10 max-w-3xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <p className="mb-3 text-sm font-semibold uppercase text-leaf">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-ink md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-7 text-soft">{text}</p> : null}
    </m.div>
  );
}

function Header({
  theme,
  toggleTheme,
}: {
  theme: Theme;
  toggleTheme: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    ["AI tooling", "#ai"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Education", "#education"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgba(9,9,11,0.82)] text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 text-sm font-semibold text-white"
          aria-label="Marek Smatana portfolio home"
        >
          <span className="grid size-9 place-items-center rounded-md bg-white text-zinc-950">
            MS
          </span>
          <span className="hidden sm:inline">Marek Smatana</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-white/78 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-10 place-items-center rounded-md border border-white/18 bg-white/10 text-white transition hover:bg-white/18"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-md border border-white/18 bg-white/10 text-white transition hover:bg-white/18 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>
      <m.div
        initial={false}
        animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="overflow-hidden border-t border-white/10 bg-[rgba(9,9,11,0.94)] md:hidden"
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-semibold text-white/86 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </m.div>
    </header>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[rgb(93,166,109)]"
      style={{ scaleX }}
    />
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[86svh] items-end overflow-hidden bg-zinc-950 px-4 pb-14 pt-28 text-white sm:px-6 lg:px-8"
    >
      <img
        src="/profile.jpg"
        alt="Portrait of Marek Smatana"
        className="absolute inset-0 h-full w-full object-cover object-[58%_20%] md:object-[72%_20%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,8,0.88),rgba(10,10,8,0.58)_46%,rgba(10,10,8,0.18))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(10,10,8,0.92),rgba(10,10,8,0))]" />

      <m.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="max-w-xl">
          <m.p
            className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/18 bg-white/10 px-3 py-2 text-sm font-medium text-white/88 backdrop-blur-md"
            variants={fadeUp}
          >
            <Sparkles size={16} />
            React, React Native, TypeScript, product engineering
          </m.p>
          <m.h1
            className="text-5xl font-semibold leading-none md:text-6xl"
            variants={fadeUp}
          >
            Marek Smatana, Ing.
          </m.h1>
          <m.p
            className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl"
            variants={fadeUp}
          >
            Product-minded software engineer building fast React experiences,
            high-traffic acquisition pages, and mobile apps with clean UX.
          </m.p>
          <m.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
          >
            <a
              href="#experience"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:bg-white/88"
            >
              <BriefcaseBusiness size={18} />
              View experience
            </a>
            <a
              href="https://buildit.studio/breatheit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/22 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/18"
            >
              <ExternalLink size={18} />
              Breathe It
            </a>
            <a
              href="/marek-smatana-cv.pdf"
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/22 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/18"
            >
              <Download size={18} />
              Download CV
            </a>
          </m.div>
        </div>
      </m.div>

      <a
        href="#profile"
        aria-label="Scroll to profile summary"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-white/78 sm:block"
      >
        <ArrowDown className="animate-bounce" size={24} />
      </a>
    </section>
  );
}

function ProfileSummary() {
  return (
    <section
      id="profile"
      className="border-t border-line bg-panel px-4 pb-20 pt-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <m.div
          className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          <m.div variants={fadeUp}>
            <p className="mb-3 text-sm font-semibold uppercase text-leaf">
              Profile
            </p>
            <h2 className="max-w-xl text-3xl font-semibold text-ink md:text-5xl">
              Frontend engineer with product instincts and delivery discipline.
            </h2>
          </m.div>
          <m.div variants={fadeUp} className="space-y-6">
            <p className="text-lg leading-8 text-soft">
              I work across React, TypeScript, React Native, testing, SEO
              optimization, and performance. My recent work centers on Omio's
              organic acquisition experience, where page quality, speed, and
              experimentation directly affect business outcomes.
            </p>
            <p className="text-lg leading-8 text-soft">
              Outside client work I build mobile products under Build It Studio,
              including Breathe It, a guided breathing app for calm and focus,
              and a workout app currently preparing for release.
            </p>
          </m.div>
        </m.div>

        <m.div
          className="mt-12 grid gap-4 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {strengths.map((item) => (
            <m.article
              key={item.title}
              className="rounded-lg border border-line bg-canvas p-6 shadow-lift dark:shadow-darklift"
              variants={fadeUp}
            >
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-4 leading-7 text-soft">{item.text}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="border-y border-line bg-panel px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-ember">
            Core stack
          </p>
          <h2 className="text-2xl font-semibold text-ink">Tools I use to ship.</h2>
        </div>
        <m.div
          className="flex flex-wrap gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          {coreSkills.map((skill) => (
            <m.span
              key={skill}
              className="rounded-md border border-line bg-canvas px-3 py-2 text-sm font-medium text-ink"
              variants={fadeUp}
            >
              {skill}
            </m.span>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function AiWorkflowSection() {
  const icons = [Sparkles, Code2, Rocket];

  return (
    <section id="ai" className="bg-canvas px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI tooling"
          title="Keeping pace with AI trends through practical use."
          text="I use modern AI tools as part of my engineering workflow: to move faster, compare approaches, review code more thoroughly, and prototype ideas without lowering the bar for final implementation."
        />
        <m.div
          className="grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={stagger}
        >
          {aiWorkflow.map((item, index) => {
            const Icon = icons[index];

            return (
              <m.article
                key={item.title}
                className="rounded-lg border border-line bg-panel p-6 shadow-lift dark:shadow-darklift"
                variants={fadeUp}
              >
                <div className="grid size-11 place-items-center rounded-md bg-ink text-canvas">
                  <Icon size={21} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-4 leading-7 text-soft">{item.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-line bg-canvas px-3 py-1.5 text-sm font-medium text-ink"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </m.article>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <m.article
      className={`relative rounded-lg border ${accentBorders[item.accent]} bg-panel p-6 shadow-lift dark:shadow-darklift md:p-8`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`grid size-11 shrink-0 place-items-center rounded-md ${accentClasses[item.accent]}`}
          >
            <BriefcaseBusiness size={21} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-ink">{item.company}</h3>
            <p className="mt-1 text-soft">{item.role}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2 text-sm font-semibold text-ink">
          <Calendar size={16} />
          {item.period}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {item.projects.map((project, index) => (
          <div
            key={`${item.company}-${project.name}`}
            className={index > 0 ? "border-t border-line pt-8" : undefined}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-soft">
                  Project
                </p>
                <h4 className="mt-1 text-xl font-semibold text-ink">
                  {project.name}
                </h4>
              </div>
              <p className="text-sm font-semibold text-soft">{project.period}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-soft">
              <span className="font-semibold text-ink">Technologies:</span>{" "}
              {project.technologies}
            </p>
            <div className="mt-5 space-y-4">
              {project.summary.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-soft">
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-soft">
                  <span
                    className={`mt-2 size-2 shrink-0 rounded-full ${accentClasses[item.accent]}`}
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </m.article>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="bg-canvas px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experience"
          title="A track record across product, growth, and technical quality."
          text="From early JavaScript roles to high-traffic React and React Native work, the throughline is practical delivery with maintainable systems."
        />
        <div className="space-y-6">
          {experience.map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="projects" className="bg-panel px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Own products"
          title="Building consumer apps beyond client work."
          text="Side projects give me room to own the full loop: product thinking, UX, mobile implementation, release details, and iteration."
        />
        <m.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          {products.map((product) => (
            <m.article
              key={product.name}
              className="rounded-lg border border-line bg-canvas p-6"
              variants={fadeUp}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase text-leaf">
                    {product.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">
                    {product.name}
                  </h3>
                </div>
                <div className="grid size-11 shrink-0 place-items-center rounded-md bg-ink text-canvas">
                  <Rocket size={21} />
                </div>
              </div>
              <p className="mt-5 leading-7 text-soft">{product.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-line bg-panel px-3 py-1.5 text-sm font-medium text-ink"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              {product.url ? (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember transition hover:text-leaf"
                >
                  Open project <ExternalLink size={16} />
                </a>
              ) : null}
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function EducationAndPersonal() {
  return (
    <section id="education" className="bg-canvas px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <m.article
          className="rounded-lg border border-line bg-panel p-6 shadow-lift dark:shadow-darklift md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="grid size-12 place-items-center rounded-md bg-leaf text-white">
            <GraduationCap size={23} />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase text-leaf">
            Education
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">
            {education.title}
          </h2>
          <p className="mt-4 text-lg text-soft">{education.school}</p>
          <p className="mt-2 text-soft">{education.faculty}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2 text-sm font-semibold text-ink">
            <Calendar size={16} />
            {education.period}
          </p>
        </m.article>

        <m.article
          className="rounded-lg border border-line bg-panel p-6 shadow-lift dark:shadow-darklift md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="text-sm font-semibold uppercase text-ember">
            Work style & personality
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">
            A little outside the editor.
          </h2>
          <div className="mt-7 grid gap-4">
            {personalNotes.map((note, index) => {
              const Icon = index === 0 ? Music : index === 1 ? Gamepad2 : Code2;
              return (
                <div key={note} className="flex gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-canvas text-ember">
                    <Icon size={19} />
                  </div>
                  <p className="leading-7 text-soft">{note}</p>
                </div>
              );
            })}
          </div>
        </m.article>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <m.div
        className="mx-auto max-w-4xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <p className="text-sm font-semibold uppercase text-leaf">
          Open to the right opportunity
        </p>
        <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
          Looking for a React engineer who can care about product outcomes too?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
          I am strongest where frontend quality, measurable business impact, and
          practical product thinking meet.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="mailto:smat.marek@gmail.com"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:bg-white/88"
          >
            <Mail size={18} />
            smat.marek@gmail.com
          </a>
          <a
            href="https://buildit.studio/breatheit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/22 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/18"
          >
            <ExternalLink size={18} />
            View Breathe It
          </a>
          <a
            href="/marek-smatana-cv.pdf"
            download
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/22 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/18"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>
      </m.div>
    </section>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const motionFeatures = useMemo(() => domAnimation, []);

  return (
    <LazyMotion features={motionFeatures} strict>
      <div className="min-h-screen bg-canvas text-ink">
        {!reduceMotion ? <ScrollProgress /> : null}
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <ProfileSummary />
          <Skills />
          <AiWorkflowSection />
          <ExperienceSection />
          <ProductsSection />
          <EducationAndPersonal />
          <ContactSection />
        </main>
        <footer className="border-t border-line bg-canvas px-4 py-8 text-center text-sm text-soft sm:px-6 lg:px-8">
          <p>© 2026 Marek Smatana. Built with React, Tailwind CSS, and Framer Motion.</p>
          <a
            href="/marek-smatana-cv.pdf"
            download
            className="mt-3 inline-flex items-center justify-center gap-2 font-semibold text-ember transition hover:text-leaf"
          >
            <Download size={16} />
            Download PDF CV
          </a>
        </footer>
      </div>
    </LazyMotion>
  );
}

export default App;

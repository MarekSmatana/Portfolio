export type Project = {
  name: string;
  period: string;
  technologies: string;
  summary: string[];
  highlights: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  accent: "leaf" | "river" | "ember" | "gold";
  projects: Project[];
};

export const coreSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "React Native",
  "Tailwind CSS",
  "SCSS",
  "Jest",
  "A/B testing",
  "CI/CD",
  "GraphQL",
  "Git",
];

export const aiWorkflow = [
  {
    title: "AI-assisted development",
    text: "Daily use of AI coding assistants including ChatGPT, Codex, and Claude for software development, code reviews, debugging, architecture discussions, and rapid prototyping.",
    chips: ["ChatGPT", "Codex", "Claude", "Code review"],
  },
  {
    title: "Applied AI in mobile products",
    text: "Integrated the OpenAI API into a React Native application to generate personalized workout plans and training insights.",
    chips: ["OpenAI API", "React Native", "Personalization", "Workout insights"],
  },
  {
    title: "Pragmatic AI adoption",
    text: "Follows AI tooling trends with a practical mindset, using them to boost productivity, explore implementation options, and move faster without giving up engineering judgment.",
    chips: ["Productivity", "Architecture", "Debugging", "Prototyping"],
  },
];

export const strengths = [
  {
    title: "Frontend delivery",
    text: "Builds maintainable React and TypeScript interfaces with a bias toward readable architecture, predictable state, and reusable UI.",
  },
  {
    title: "Growth engineering",
    text: "Experienced with high-traffic SEO landing pages, A/B experiments, Core Web Vitals, and conversion-focused product work.",
  },
  {
    title: "Product ownership",
    text: "Comfortable shaping features from requirement discovery through implementation, testing, release, and production follow-up.",
  },
];

export const experience: Experience[] = [
  {
    company: "CODERAMA, s.r.o.",
    role: "Medior Software Engineer",
    period: "Mar 2024 - Present",
    accent: "ember",
    projects: [
      {
        name: "Omio",
        period: "Mar 2024 - Present",
        technologies:
          "React, TypeScript, JavaScript, SCSS, HTML, Tailwind CSS, React Native, Jest, Testing Library, Git, CI/CD, SEO optimization, A/B testing",
        summary: [
          "Contributing to Omio's Organic Acquisition team, primarily on high-traffic landing pages for search, booking discovery, user engagement, and conversion.",
          "Improved technical quality by expanding automated test coverage from a low baseline to over 80%, reducing technical debt, optimizing performance, and supporting React Native work on internal mobile integrations.",
        ],
        highlights: [
          "Developed and maintained high-traffic landing pages using React, TypeScript, JavaScript, and SCSS.",
          "Implemented and evaluated A/B experiments focused on acquisition, engagement, and conversion rates.",
          "Collaborated with SEO specialists on page structure, content delivery, and search visibility.",
          "Analyzed and optimized Core Web Vitals including Largest Contentful Paint.",
          "Diagnosed hydration issues, browser-specific rendering problems, console errors, and frontend defects.",
          "Built reusable React components and shared functionality across landing page experiences.",
          "Participated in code reviews and continuous improvement work in an international English-speaking team.",
        ],
      },
    ],
  },
  {
    company: "Sudolabs",
    role: "Medior Software Engineer",
    period: "Apr 2022 - Mar 2024",
    accent: "leaf",
    projects: [
      {
        name: "Finviz",
        period: "Jul 2022 - Mar 2024",
        technologies:
          "React.js, TypeScript, JavaScript, HTML, CSS, C#, ASP.NET Razor Pages, MSSQL, Git",
        summary: [
          "Worked on a widely used financial market analysis platform with stock screening, market visualization, charting, and trading tools.",
          "Contributed across frontend and backend areas, including legacy modernization, new feature delivery, database-related support, and charting functionality used by a large investor audience.",
        ],
        highlights: [
          "Developed and maintained server-side components using C# and ASP.NET Razor Pages.",
          "Refactored legacy code to improve maintainability, readability, and long-term scalability.",
          "Implemented new charting and market analysis functionality used by traders and investors.",
          "Modernized user interfaces based on updated design requirements.",
          "Investigated and resolved production issues and technical challenges.",
        ],
      },
      {
        name: "GEAM",
        period: "Apr 2022 - Jul 2022",
        technologies:
          "React.js, TypeScript, Apollo GraphQL, Chakra UI, Tailwind CSS, React Router, Storybook, Recharts, LocalForage, Ramda, HTML, CSS, JavaScript, Git",
        summary: [
          "Helped build a greenfield web application for UNIQA insurance case evaluation and risk assessment, combining map-based hazard visibility with client and insurance record management.",
        ],
        highlights: [
          "Participated in the design and implementation of the frontend architecture for a greenfield project.",
          "Set up project structure, development environment, and reusable application foundations.",
          "Implemented table editing, validation, state management, exports, and reporting workflows.",
          "Integrated frontend functionality with backend services through Apollo GraphQL.",
        ],
      },
    ],
  },
  {
    company: "Quest Software",
    role: "Junior JavaScript Developer",
    period: "Nov 2021 - Mar 2022",
    accent: "river",
    projects: [
      {
        name: "Internal web applications",
        period: "Nov 2021 - Mar 2022",
        technologies: "AngularJS, React.js, JavaScript",
        summary: [
          "Maintained internal user interfaces, rewrote React.js code into AngularJS, and worked with a globally distributed development team.",
        ],
        highlights: [
          "Built and maintained interfaces for internal web applications using AngularJS.",
          "Reworked React.js code into AngularJS as part of modernization and consistency efforts.",
          "Collaborated with engineers across international teams.",
        ],
      },
    ],
  },
  {
    company: "UNICORN Slovakia",
    role: "Junior JavaScript Developer",
    period: "Mar 2021 - Nov 2021",
    accent: "gold",
    projects: [
      {
        name: "Internal web applications",
        period: "Mar 2021 - Nov 2021",
        technologies: "React.js, JavaScript, unit testing",
        summary: [
          "Built and maintained internal web application interfaces and server-side JavaScript based on prepared technical documentation.",
        ],
        highlights: [
          "Built user interfaces for internal web applications using React.js.",
          "Wrote server-side JavaScript based on prepared documentation.",
          "Created full unit test coverage for newly delivered code.",
        ],
      },
    ],
  },
];

export const products = [
  {
    name: "Breathe It",
    label: "Published mobile app",
    url: "https://buildit.studio/breatheit",
    text: "A guided breathing app focused on calm, focus, and relaxation through simple sessions, visual and audio guidance, customizable durations, and saved favorites.",
    chips: ["React Native", "Wellness", "Mobile UX", "Product design"],
  },
  {
    name: "Workout app",
    label: "In development",
    url: undefined,
    text: "A mobile training product now in progress, designed around practical workout flows, useful progress feedback, and a clear day-to-day fitness experience.",
    chips: ["React Native", "Fitness", "App architecture", "Launch prep"],
  },
];

export const education = {
  school: "University of Žilina",
  faculty: "Faculty of Management Science and Informatics",
  period: "2017 - 2021",
  title: "Ing. - Engineer's degree",
};

export const personalNotes = [
  "Rock and power metal: Kabát, Avantasia, Sabaton, Wind Rose.",
  "Games: modded Minecraft, Terraria, and Megabonk.",
  "Always building side projects where design, calm UX, and practical utility meet.",
];

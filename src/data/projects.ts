import type { Project } from "./types";

/**
 * Image note
 * ──────────
 * Hero/gallery photos are illustrative stock references from Unsplash
 * (free licence, https://unsplash.com/license). They are NOT screenshots of
 * finished work, and the UI labels them that way. Every image has a generated
 * fallback cover, so a dead URL never shows a broken image.
 * Replace `src` with your own screenshots as soon as you have them and set
 * `illustrative: false` for that project.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const projects: Project[] = [
  {
    slug: "maharashtra-carpet",
    number: "01",
    name: "Maharashtra Carpet & 3D Wallpaper",
    tagline: "A digital showroom concept",
    description:
      "An immersive digital showroom concept exploring animated product presentation, premium visual storytelling, and responsive design.",
    status: "Interactive website concept",
    illustrative: true,
    tech: [],
    cover: { hue: 28, pattern: "weave" },
    hero: {
      src: u("photo-1618221195710-dd6b41faaea6"),
      alt: "Elegant living room interior with textured wall and rug (illustrative stock photo)",
      credit: "https://unsplash.com/photos/1618221195710-dd6b41faaea6",
    },
    gallery: [
      {
        src: u("photo-1586023492125-27b2c045efd7", 1200),
        alt: "Bright modern living room (illustrative stock photo)",
      },
      {
        src: u("photo-1600210492486-724fe5c67fb0", 1200),
        alt: "Interior with warm lighting and patterned decor (illustrative stock photo)",
      },
    ],
    links: {},
    caseStudy: {
      overview:
        "A concept for how a carpet and wallpaper showroom could present its products online: large imagery, smooth transitions between collections, and a layout that feels as considered as the products themselves.",
      problem:
        "Textiles and wall coverings are hard to judge on a flat product grid. Texture, scale and the feel of a room get lost, so online catalogues often feel generic.",
      approach: [
        "Lead with full-bleed room photography so visitors see products in context.",
        "Use restrained motion for product reveals instead of heavy effects.",
        "Design mobile first, since most shoppers will browse on a phone.",
      ],
      contribution:
        "This is a personal concept exploration. I am responsible for the visual direction, layout thinking and frontend experiments.",
      challenges: [
        "Presenting texture without oversized image files.",
        "Keeping animation smooth on low-end phones.",
      ],
      lessons: [
        "Image weight decides perceived speed on a visual site.",
        "Spacing and typography do more for premium feel than effects.",
      ],
      currentStatus:
        "Concept stage. No live site or source code is published yet. Visuals on this page are illustrative stock references.",
    },
  },
  {
    slug: "capacity-connect",
    number: "02",
    name: "Capacity Connect",
    tagline: "Learning and competency platform",
    description:
      "A proposed learning and competency development platform exploring personalized pathways, skills assessment, and intelligent recommendations.",
    status: "SIH 2026 hackathon project concept",
    illustrative: true,
    tech: [],
    cover: { hue: 226, pattern: "grid" },
    hero: {
      src: u("photo-1551288049-bebda4e38f71"),
      alt: "Analytics dashboard on a laptop screen (illustrative stock photo)",
      credit: "https://unsplash.com/photos/1551288049-bebda4e38f71",
    },
    gallery: [
      {
        src: u("photo-1460925895917-afdab827c52f", 1200),
        alt: "Laptop showing charts and analytics (illustrative stock photo)",
      },
      {
        src: u("photo-1522202176988-66273c2fd55f", 1200),
        alt: "Students collaborating around laptops (illustrative stock photo)",
      },
    ],
    links: {},
    caseStudy: {
      overview:
        "A proposed platform that helps learners understand where their skills stand and what to study next, built as a concept for the Smart India Hackathon 2026.",
      problem:
        "Learners often do not know which skills they are missing, and generic course lists do not adapt to what they already know.",
      approach: [
        "Start with a skills assessment to map the learner's current level.",
        "Suggest a personal learning pathway based on gaps found.",
        "Track progress visibly so learners stay motivated.",
      ],
      contribution:
        "Concept and interface exploration as part of a hackathon idea. Specific team roles and the final scope are still being defined.",
      challenges: [
        "Deciding how an assessment can be fair without being long.",
        "Keeping recommendations explainable rather than a black box.",
      ],
      lessons: [
        "A clear problem statement matters more than a long feature list.",
        "Early interface sketches expose gaps in the idea quickly.",
      ],
      currentStatus:
        "Concept stage for SIH 2026. Nothing has been built or submitted yet, and no result is claimed.",
    },
  },
  {
    slug: "campus-navigation",
    number: "03",
    name: "Campus Navigation App",
    tagline: "Wayfinding for students and visitors",
    description:
      "A proposed navigation experience to help students and visitors discover campus locations and facilities.",
    status: "Ideation-stage concept",
    illustrative: true,
    tech: [],
    cover: { hue: 168, pattern: "map" },
    hero: {
      src: u("photo-1524661135-423995f22d0b"),
      alt: "Map with a pin marking a location (illustrative stock photo)",
      credit: "https://unsplash.com/photos/1524661135-423995f22d0b",
    },
    gallery: [
      {
        src: u("photo-1562774053-701939374585", 1200),
        alt: "University campus building (illustrative stock photo)",
      },
      {
        src: u("photo-1512941937669-90a1b58e7e9c", 1200),
        alt: "Smartphone showing a map app (illustrative stock photo)",
      },
    ],
    links: {},
    caseStudy: {
      overview:
        "An idea for a simple mobile-friendly guide that helps new students and visitors find departments, labs, hostels and facilities on campus.",
      problem:
        "New students and visitors lose time finding buildings, and printed or static maps are rarely up to date.",
      approach: [
        "Search-first design: type a place, get directions.",
        "Clear indoor and outdoor landmarks rather than a dense map.",
        "Works on a phone browser, with no install required.",
      ],
      contribution: "Idea and early interface thinking. No implementation has started.",
      challenges: [
        "Getting accurate campus data and keeping it updated.",
        "Deciding how much indoor guidance is realistic for a first version.",
      ],
      lessons: ["Good ideas still need a data plan before a design plan."],
      currentStatus: "Ideation only. No prototype, code or data collection yet.",
    },
  },
  {
    slug: "esp32-robotics-lab",
    number: "04",
    name: "ESP32 Robotics Lab",
    tagline: "Learning embedded systems by doing",
    description: "Exploring embedded systems, microcontrollers, and practical robotics programming.",
    status: "Early learning and experimentation",
    illustrative: true,
    tech: ["ESP32"],
    cover: { hue: 142, pattern: "circuit" },
    hero: {
      src: u("photo-1518770660439-4636190af475"),
      alt: "Close-up of an electronic circuit board (illustrative stock photo)",
      credit: "https://unsplash.com/photos/1518770660439-4636190af475",
    },
    gallery: [
      {
        src: u("photo-1485827404703-89b55fcc595e", 1200),
        alt: "Small robot on a desk (illustrative stock photo)",
      },
      {
        src: u("photo-1555664424-778a1e5e1b48", 1200),
        alt: "Electronics components and wires on a workbench (illustrative stock photo)",
      },
    ],
    links: {},
    caseStudy: {
      overview:
        "A running log of my first steps with the ESP32: reading sensors, blinking LEDs, and understanding how code controls hardware.",
      problem:
        "My degree is about automation and robotics, but most of my coding so far has been on a screen. I want to connect software to physical devices.",
      approach: [
        "Start with tiny experiments: LEDs, buttons, simple sensors.",
        "Write down what worked and what did not for each experiment.",
        "Build up to a small robotics project once the basics feel solid.",
      ],
      contribution: "Self-directed learning. Everything here is my own practice and experimentation.",
      challenges: [
        "Moving from C++ on a computer to code that runs on a microcontroller.",
        "Debugging problems that can be wiring, not code.",
      ],
      lessons: ["Small, finished experiments teach more than one big unfinished plan."],
      currentStatus:
        "Early learning stage. No finished robot or published repository yet. Photos here are illustrative stock images.",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

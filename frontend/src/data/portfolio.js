// Static fallback copy of portfolio content — the live site loads /api/portfolio.
// Keep in sync with backend/src/seed/data/content.js.

export const portfolio = [
  {
    slug: 'mce-snehada-milana',
    tag: 'CASE-01',
    title: 'MCE Snehada Milana',
    image: '/assets/portfolio/MCE.png',
    category: 'Event Website',
    year: '2026',
    summary: 'A full registration system for an alumni reunion — sign-ups, payments, gallery and alumni info in one place.',
    problem:
      'The reunion committee needed a way to register a large alumni base without a spreadsheet spiralling out of control, take payment for the event, and give attendees a place to see the schedule and reconnect.',
    solution:
      'A React and Node.js registration platform with a payment gateway, an admin view for the organising committee, a photo gallery and an alumni-information directory, built to hold up under a last-week rush of sign-ups.',
    features: ['Online registration & payment', 'Event gallery', 'Alumni information directory', 'Admin dashboard for organisers'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://mcesnehadamilana.com',
  },
  {
    slug: 'atreya-ayurvedam',
    tag: 'CASE-02',
    title: 'Atreya Ayurvedam',
    category: 'Healthcare Website',
    year: '2025',
    image: '/assets/portfolio/ayurvedic.png',
    summary: 'A responsive healthcare and consultation platform for an Ayurvedic practice, built for trust and clarity.',
    problem:
      'An Ayurvedic healthcare practice needed a site that explained its services and consultation process clearly to patients unfamiliar with the practice, on a design that felt calm and credible rather than clinical.',
    solution:
      'A responsive MERN-stack website covering services, the consultation process and practice information, structured so a new patient understands what to expect before ever calling.',
    features: ['Services & treatment pages', 'Consultation process explainer', 'Fully responsive design'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://atreyaayurvedam.com',
  },
  {
    slug: 'kiran-kumar',
    tag: 'CASE-03',
    title: 'Kiran Kumar',
    category: 'Portfolio',
    year: '2025',
    image: '/assets/portfolio/kiran-kummar.png',
    summary:
      'A premium personal portfolio showcasing commercial photography, AI-generated imagery, creative services, and a professional brand presence.',
    problem:
      'The client needed a visually striking portfolio to showcase commercial photography, AI-generated creative work, and professional services while making it easy for brands and agencies to explore projects and get in touch.',
    solution:
      'Designed and developed a modern portfolio website with immersive galleries, smooth animations, responsive layouts, and clear calls-to-action. The site highlights photography categories, AI-generated work, client projects, and contact options while maintaining a premium visual experience across all devices.',
    features: [
      'Premium hero section',
      'Photography portfolio gallery',
      'AI-generated imagery showcase',
      'Project categorization',
      'About & experience section',
      'SEO-friendly structure',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    link: 'https://kirankumar.com',
  },
  {
    slug: 'dheeraj-singh-consultancy',
    tag: 'CASE-04',
    title: 'Dheeraj Singh Consultancy',
    category: 'Consultancy Portal',
    year: '2025',
    image: '/assets/portfolio/dheeraj-banner.png',
    summary: 'A student services and consultancy portal handling enquiries, records and staff workflows.',
    problem:
      'The consultancy needed a portal to manage student enquiries and services in an organised, searchable way instead of scattered registers and calls.',
    solution:
      'A student-services and consultancy portal with structured enquiry handling and staff-facing tools, built and maintained as part of ongoing full-time work at the firm.',
    features: ['Student services portal', 'Enquiry & records management', 'Staff-facing tools'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://www.dheerajsingh.in',
  },
  {
    slug: 'panchwati-hanuman-mandir',
    tag: 'CASE-05',
    title: 'Panchwati Hanuman Mandir',
    category: 'Temple Website',
    year: '2025',
    image: '/assets/portfolio/hanumanmandir.png',
    summary: 'A digital home for a temple community — information, events, gallery and donations.',
    problem:
      'The temple trust wanted devotees, including those living abroad, to be able to check timings, follow events and contribute donations without depending on word of mouth.',
    solution:
      'A React and Vite website presenting temple information, an events calendar, a photo gallery and a donations section, designed with a tone that respects the sanctity of the institution.',
    features: ['Temple information & timings', 'Events calendar', 'Photo gallery', 'Donations section'],
    stack: ['React', 'Vite', 'Tailwind CSS'],
    link: 'https://panchwatihanumanmandir.onrender.com',
  },
  {
    slug: 'ai-health-assistant',
    tag: 'CASE-06',
    title: 'AI Health Assistant',
    category: 'RAG / AI Project',
    year: '2025',
    image: '/assets/portfolio/aiHealth.png',
    summary: 'A Retrieval-Augmented Generation assistant that answers health questions strictly from a verified knowledge base.',
    problem:
      'General-purpose AI chatbots can answer health questions incorrectly or too generically to be useful. The project needed an assistant that only answered from a curated, trustworthy knowledge base.',
    solution:
      'A RAG application built on the Gemini API, retrieving from a structured knowledge base before generating a response — keeping answers grounded in verified source material instead of the model guessing.',
    features: ['Gemini AI integration', 'Retrieval-Augmented Generation', 'Curated knowledge base'],
    stack: ['Gemini API', 'Node.js', 'Vector search'],
    link: '',
  },
  {
    slug: 'grameen-haat',
    tag: 'CASE-07',
    title: 'Grameen Haat',
    category: 'Marketplace / E-commerce',
    year: '2025',
    image: '/assets/portfolio/grameen.png',
    summary: 'A rural marketplace with a modern buying experience — product showcase, categories and clean UI.',
    problem:
      'Rural sellers needed an online storefront that felt as modern as any city e-commerce brand, without the buyer needing to navigate a cluttered or confusing catalogue.',
    solution:
      'A category-driven e-commerce storefront on the MERN stack, with a clean product showcase and a UI designed to work well even for first-time online shoppers.',
    features: ['Product showcase & categories', 'Modern, simple UI', 'Built for first-time online buyers'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://atreyaayurvedam.com/grameen-haat',
  },
]

export const getPortfolioBySlug = (slug) => portfolio.find((p) => p.slug === slug)

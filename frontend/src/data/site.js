// Static fallback copy of site settings + shared content. The live site loads this
// from /api/site and /api/bootstrap; this is used only if the API is unreachable.
// Keep in sync with backend/src/seed/data/site.js and content.js.

export const brand = {
  name: 'BS Innovation Solutions',
  short: 'BS Innovation',
  tagline: 'Web · AI · Growth',
  founder: 'Bhuvneshwar Sharma',
  location: 'Rampur, Uttar Pradesh, India',
  domain: 'bsinnovationsolutions.com',
  email: 'bhuvneshwarsharma44@gmail.com',
  phone: '+91 76174 82996',
  whatsapp: '917617482996',
  googleReview: 'https://share.google/55Y7wRwqEJCePCqam',
  linkedin: 'https://linkedin.com/in/bhuvneshwar02',
  github: 'https://github.com/bhuvneshwar02',
  instagram: 'https://instagram.com/bhuvneshwar02',
  facebook: 'https://facebook.com/bhuvneshwar02',
}

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Contact', to: '/contact' },
]

export const commitments = [
  {
    title: 'Delivered on a timeline, in writing',
    description:
      'Every project gets a delivery date before it starts, with a staging link along the way so you see progress — not a vague "soon".',
  },
  {
    title: 'Fixed price, agreed upfront',
    description: 'You approve a single quote before work begins. The number on the quote is the number you pay.',
  },
  {
    title: 'No hidden charges',
    description:
      'Third-party costs (domain, hosting, gateway fees) are shown at cost and separately. Nothing is added to the invoice that you did not agree to.',
  },
]

export const trustedBy = [
  'MCE Snehada Milana',
  'Atreya Ayurvedam',
  'Kiran Kumar',
  'Grameen Haat',
  'Panchwati Hanuman Mandir',
  'Dheeraj Singh Consultancy',
]

export const hero = {
  statusText: 'Available for new projects — freelance, remote, worldwide',
  titleLead: 'Digital work, done properly —',
  titleAccent: 'websites, apps, AI and everything in between.',
  description:
    "BS Innovation Solutions is a one-person full-stack studio run by Bhuvneshwar Sharma. From a business website to an AI chatbot to setting up your first Gmail account for work — if it's digital, it's within scope.",
  image: '',
  stats: [
    { value: '8+', label: 'Live projects shipped' },
    { value: '12+', label: 'Digital services offered' },
    { value: '1–5', label: 'Weeks, typical build' },
  ],
}

export const hireMe = {
  eyebrow: 'Freelance / hire me',
  title: 'Bhuvneshwar Sharma — freelance full-stack developer, open for work',
  description:
    "I'm available for freelance digital work: business and portfolio websites, full web applications, AI chatbots and RAG tools, and everyday digital tasks. Direct communication, honest pricing, and code built to last — hire the person who actually builds it.",
  ctaLabel: 'Hire me for a project',
}

export const about = {
  heroTitle: 'A one-person studio, built like a full team.',
  heroDescription:
    "Founded by Bhuvneshwar Sharma, BS Innovation Solutions exists because most small businesses and institutions don't need a big agency — they need one person who can actually build the thing, explain it clearly, and stick around after launch.",
  storyEyebrow: 'The story',
  storyTitle: 'Why BS Innovation Solutions exists',
  storyParagraphs: [
    'Most of the businesses, schools and institutions that need a website the most — a local consultancy, a temple trust, an alumni committee — are the ones least served by big agencies, who quote high and disappear after the invoice clears.',
    'BS Innovation Solutions started from the opposite end: build production-grade software — the same MERN-stack applications, payment integrations and dashboards a large agency would deliver — but stay small enough to talk directly to every client, and stay around long after launch.',
    'What began as individual projects — a consultancy portal, an alumni reunion platform, a temple website — has grown into a full digital practice covering web development, AI applications and the everyday digital tasks people rarely find a dedicated freelancer for.',
  ],
  mission: 'Help businesses grow with modern websites, web applications and AI solutions.',
  vision: 'Become the default freelancer people search for — for any digital work, not just websites.',
  trustTitle: 'Nothing outsourced, nothing templated',
  trustDescription:
    "Every project on the portfolio was designed, built and deployed personally — there's no subcontracted team behind the name, and no recycled template underneath the design.",
  image: '',
}

export const footerBlurb =
  'Helping businesses, institutions and everyday people get their digital work done — websites, web apps, AI tools and the small digital chores in between.'

export const seo = {
  title: 'BS Innovation Solutions — Freelance Web, App & AI Developer',
  description:
    'BS Innovation Solutions — Bhuvneshwar Sharma, freelance full-stack web, app and AI developer in Rampur, Uttar Pradesh, working with clients across India and worldwide. Business websites, e-commerce, admin dashboards, AI chatbots, SEO and day-to-day digital operations, delivered on a fixed price with no hidden charges.',
  ogTitle: 'BS Innovation Solutions — Freelance Web, App & AI Developer',
  ogDescription:
    'Websites, web apps, AI solutions and everyday digital operations — built end-to-end by Bhuvneshwar Sharma. Fixed price, delivered on time, remote across India and worldwide.',
  serviceAreas: ['Rampur', 'Milak', 'Moradabad', 'Bareilly', 'Uttar Pradesh', 'India'],
}

export const jobs = [
  {
    title: 'Freelance React / Frontend Developer',
    employmentType: 'Freelance',
    location: 'Remote (India)',
    remote: true,
    description:
      'Project-based frontend work on client websites and web apps built with React, Vite and Tailwind. You take a Figma or a rough brief and turn it into clean, responsive, accessible UI. Paid per project or per milestone.',
    requirements: [
      '2+ years building production React apps',
      'Comfortable with Tailwind CSS and component-driven UI',
      'Git, and able to work to a brief with minimal hand-holding',
      'Available for at least one project a month',
    ],
    compensation: 'Per project — ₹8,000–₹30,000 depending on scope',
    status: 'open',
  },
  {
    title: 'Part-time Digital Operations Assistant (Rampur / Remote)',
    employmentType: 'Part-time',
    location: 'Rampur, Uttar Pradesh / Remote',
    remote: true,
    description:
      'Help run day-to-day digital tasks for retainer clients — publishing website updates, adding products and notices, keeping Google Business Profiles and social pages current, and basic inbox and document work. Training provided.',
    requirements: [
      'Good written English and attention to detail',
      'Comfortable learning admin panels and simple tools',
      'Reliable internet and 10–15 hours a week',
      'Based in or near Rampur is a plus, not required',
    ],
    compensation: '₹6,000–₹10,000 / month',
    status: 'open',
  },
]

export const gallery = [
  { title: 'MCE Snehada Milana — registration', image: '/assets/portfolio/MCE.png', caption: 'Sample — replace with real screenshot' },
  { title: 'Atreya Ayurvedam — home', image: '/assets/portfolio/ayurvedic.png', caption: 'Sample — replace with real screenshot' },
  { title: 'Kiran Kumar — portfolio', image: '/assets/portfolio/kiran-kummar.png', caption: 'Sample — replace with real screenshot' },
  { title: 'Dheeraj Singh Consultancy — portal', image: '/assets/portfolio/dheeraj-banner.png', caption: 'Sample — replace with real screenshot' },
  { title: 'Panchwati Hanuman Mandir', image: '/assets/portfolio/hanumanmandir.png', caption: 'Sample — replace with real screenshot' },
  { title: 'AI Health Assistant', image: '/assets/portfolio/aiHealth.png', caption: 'Sample — replace with real screenshot' },
  { title: 'Grameen Haat — marketplace', image: '/assets/portfolio/grameen.png', caption: 'Sample — replace with real screenshot' },
  { title: 'Admin dashboard build', image: '/assets/services/admin.png', caption: 'Sample — replace with real screenshot' },
  { title: 'E-commerce build', image: '/assets/services/e-commerce.png', caption: 'Sample — replace with real screenshot' },
]

export const processSteps = [
  { step: '01', title: 'Discover', description: 'A short call or WhatsApp chat to understand your business, audience and what the site actually needs to do — not a generic questionnaire.' },
  { step: '02', title: 'Plan & Design', description: 'A sitemap and visual direction you approve before a line of code is written, so there are no surprises at delivery.' },
  { step: '03', title: 'Build', description: 'Development in the open — you get a staging link early, so you can watch it take shape and flag changes as you go.' },
  { step: '04', title: 'Test', description: 'Checked across phones, tablets and browsers, plus load speed and form functionality, before anything goes live.' },
  { step: '05', title: 'Launch', description: 'Domain, hosting and SSL configured, site deployed, and a walkthrough so you know how to update it yourself.' },
  { step: '06', title: 'Support', description: 'Ongoing maintenance available so the site stays fast, secure and current — not abandoned the day it goes live.' },
]

export const techStack = [
  { name: 'React + Vite', note: 'Frontend framework' },
  { name: 'Tailwind CSS', note: 'Styling system' },
  { name: 'React Router', note: 'Client-side routing' },
  { name: 'Framer Motion', note: 'Motion & interaction' },
  { name: 'Node.js', note: 'Runtime' },
  { name: 'Express.js', note: 'Backend framework' },
  { name: 'MongoDB', note: 'Database' },
  { name: 'JWT Auth', note: 'Admin security' },
  { name: 'GitHub', note: 'Version control' },
  { name: 'Vercel + Render', note: 'Deployment' },
]

export const timeline = [
  { year: '2021', title: 'Started B.Tech in Information Technology', text: 'Began formal study at Dr. A.P.J. Abdul Kalam Technical University, building a foundation in computer science and web development.' },
  { year: '2024', title: 'Product Support Engineer, Samsung ASC', text: 'Worked hands-on with technical support and customer-facing problem solving — the same instinct for clear, working solutions now shapes every client project.' },
  { year: '2025', title: 'B.Tech completed', text: 'Graduated in Information Technology, with a portfolio of live full-stack projects already shipped.' },
  { year: '2025', title: 'Joined Dheeraj Singh Consultancy', text: "Started as an intern, then moved full-time as a Full Stack Developer and Technical Support Engineer, building the firm's consultancy portal." },
  { year: '2026', title: 'BS Innovation Solutions', text: 'Opened up full-stack and AI development, alongside everyday digital support, to clients directly — from businesses to temples to individuals.' },
]

export const coreValues = [
  { title: 'Say what it costs, upfront', description: 'No vague quotes. You know the price and timeline before work begins.' },
  { title: 'Build it to last', description: 'Clean, maintainable code — not something that breaks the moment you ask for a small change.' },
  { title: "Explain, don't just deliver", description: 'You should understand what was built and why, not just receive a login.' },
  { title: 'Small requests matter too', description: 'A Gmail account setup gets the same care as a full web application.' },
]

export const testimonials = [
  {
    quote:
      'The registration site was ready well before our deadline and held up fine even when everyone signed up in the last two days. Exactly what an alumni committee needed.',
    name: 'Event Organising Committee',
    context: 'MCE Snehada Milana',
  },
  {
    quote:
      'He understood the tone we needed for a temple website — respectful, simple, nothing flashy — and delivered exactly that.',
    name: 'Temple Trust',
    context: 'Panchwati Hanuman Mandir',
  },
  {
    quote:
      'Our consultancy portal has made day-to-day student enquiries far easier to track than the old system ever did.',
    name: 'Management',
    context: 'Dheeraj Singh Consultancy',
  },
]

export const faqs = [
  {
    q: 'How long does a typical website take to build?',
    a: 'A standard business website takes 7–12 days from approved design to launch. Larger builds — e-commerce stores, admin dashboards, AI applications — typically run 2–5 weeks depending on scope. You will get a specific timeline in writing before work starts.',
  },
  {
    q: 'Do you only build websites, or can you help with everyday digital tasks too?',
    a: "Both. Alongside full websites and web apps, I help with everyday digital work — setting up a business Gmail or Google Workspace account, creating a Google Business Profile, buying a domain, or filling out an online form on a government or insurance portal. If it's digital, ask.",
  },
  {
    q: 'What do I need to provide to get started?',
    a: 'Just a clear idea of your business and, ideally, your logo, photos and any existing content. If you do not have professional photos or a logo yet, I can guide you on what to get or work with placeholders while you gather them.',
  },
  {
    q: 'Will I be able to update the website myself after it launches?',
    a: 'Yes — sites are built so you can edit text, images and basic content yourself where possible, and I include a short walkthrough at launch. For anything more technical, a maintenance plan covers it.',
  },
  {
    q: 'Do you work with clients outside your city?',
    a: 'Yes, entirely remotely. Every project listed in the portfolio was built and delivered without an in-person meeting, coordinated over call, email and WhatsApp.',
  },
  {
    q: 'What if I only need a small fix, not a full new website?',
    a: 'That is exactly what the Website Maintenance and Digital Help Desk services are for — small, one-off fixes and tasks do not need a full project engagement.',
  },
]

export const pricingPlans = [
  {
    group: 'build',
    name: 'Starter Website',
    price: '₹7,999',
    unit: 'one-time',
    description: 'A clean, single-purpose site to establish a professional presence fast.',
    features: [
      'Up to 4 pages (Home, About, Services, Contact)',
      'Mobile-first responsive design',
      'WhatsApp & click-to-call buttons on every page',
      'Contact form → your email',
      'Basic on-page SEO + Google Search Console setup',
      '1 round of revisions',
      '7–10 day delivery',
    ],
    highlighted: false,
  },
  {
    group: 'build',
    name: 'Business Website',
    price: '₹18,999',
    unit: 'one-time',
    description: 'The most popular option — a full multi-page site built around your business, with a content editor.',
    features: [
      'Up to 10 pages, custom-designed',
      'Simple admin panel to edit text, images & sections yourself',
      'Contact + enquiry forms with email notification',
      'Google Maps, business hours & profile setup',
      'On-page SEO, sitemap, structured data',
      '2 rounds of revisions',
      '1 month free support after launch',
      '10–14 day delivery',
    ],
    highlighted: true,
  },
  {
    group: 'build',
    name: 'Web App / Dashboard',
    price: '₹44,999',
    unit: 'starting',
    description: 'For businesses that need logins, a database, or an admin dashboard behind the site.',
    features: [
      'Full custom design, unlimited standard pages',
      'Role-based login (admin / staff / viewer)',
      'Admin dashboard, tables, reports & CRUD screens',
      'MongoDB database, REST API, deployed end-to-end',
      'Payment gateway integration if needed',
      '3 months free maintenance',
      '2–4 week delivery',
    ],
    highlighted: false,
  },
  {
    group: 'build',
    name: 'E-commerce / AI Build',
    price: 'From ₹75,000',
    unit: 'scoped to you',
    description: 'E-commerce stores, RAG/AI chatbots and multi-system platforms, quoted to scope.',
    features: [
      'Product catalogue, cart, checkout & order management',
      'or RAG / AI assistant trained on your documents',
      'Payment gateway & third-party integrations',
      'Dedicated timeline & staging environment',
      'Fixed quote after a short scoping call',
    ],
    highlighted: false,
  },
  {
    group: 'care',
    name: 'Essential Care',
    price: '₹1,999',
    unit: '/ month',
    description: 'Keep a live site fast, secure and backed up.',
    features: [
      'Security & dependency updates',
      'Weekly backups + uptime monitoring',
      'Up to 2 small content edits / month',
      'Email support, 2-day response',
    ],
    highlighted: false,
  },
  {
    group: 'care',
    name: 'Growth',
    price: '₹4,999',
    unit: '/ month',
    description: 'Everything in Essential, plus regular content and marketing upkeep.',
    features: [
      'Everything in Essential Care',
      'Up to 8 content edits / new sections a month',
      'Blog / notice publishing done for you',
      'Google Business Profile & social pages kept current',
      'Monthly performance & SEO report',
      'Priority WhatsApp support',
    ],
    highlighted: true,
  },
  {
    group: 'care',
    name: 'Digital Operations',
    price: '₹9,999',
    unit: '/ month',
    description: 'I run the day-to-day digital side of your business so you do not have to.',
    features: [
      'Everything in Growth',
      'Daily digital operations — updates, uploads, listings',
      'Shared inbox triage & form/report exports',
      'Unlimited small "can you just…" tasks',
      'Same-day response on WhatsApp, Mon–Sat',
      'Monthly summary of everything done',
    ],
    highlighted: false,
  },
]

export const pricingAddons = [
  { name: 'Extra page', price: '₹1,500 / page' },
  { name: 'Logo design', price: '₹2,499' },
  { name: 'Domain + hosting setup (1st year)', price: '₹1,999' },
  { name: 'Payment gateway integration', price: '₹5,999' },
  { name: 'Blog / CMS section', price: '₹4,999' },
  { name: 'WhatsApp / website chatbot', price: '₹7,999' },
  { name: 'Google Business Profile setup', price: '₹1,499' },
  { name: 'SEO starter pack (one-time)', price: '₹6,999' },
  { name: 'SEO retainer', price: '₹4,999 / month' },
  { name: 'AI chatbot (RAG, on your docs)', price: 'From ₹24,999' },
]

export const siteSettings = {
  brand,
  nav,
  trustedBy,
  commitments,
  hero,
  hireMe,
  about,
  footerBlurb,
  seo,
}

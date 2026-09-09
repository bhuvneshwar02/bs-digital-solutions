// Static fallback copy of site settings + shared content. The live site loads this
// from /api/site and /api/bootstrap; this is used only if the API is unreachable.
// Keep in sync with backend/src/seed/data/site.js and content.js.

export const brand = {
  name: 'BS Innovation Solutions',
  short: 'BS Innovation',
  tagline: 'Web · AI · Growth',
  founder: 'Bhuvneshwar Sharma',
  location: 'Rampur, Uttar Pradesh, India',
  email: 'bhuvneshwarsharma44@gmail.com',
  phone: '+91 76174 82996',
  whatsapp: '917617482996',
  linkedin: 'https://linkedin.com/in/bhuvneshwar02',
  github: 'https://github.com/bhuvneshwar02',
  instagram: 'https://instagram.com/bhuvneshwar02',
  facebook: 'https://facebook.com/bhuvneshwar02',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
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
}

export const footerBlurb =
  'Helping businesses, institutions and everyday people get their digital work done — websites, web apps, AI tools and the small digital chores in between.'

export const seo = {
  title: 'BS Innovation Solutions — Web · AI · Growth',
  description:
    'BS Innovation Solutions is a full-stack web, AI and digital services studio founded by Bhuvneshwar Sharma — freelance websites, e-commerce, admin dashboards, AI chatbots, SEO and everyday digital help.',
  ogTitle: 'BS Innovation Solutions — Web · AI · Growth',
  ogDescription:
    'Websites, web apps, AI solutions and everyday digital help — built end-to-end by Bhuvneshwar Sharma, freelance full-stack developer.',
}

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
    name: 'Starter Website',
    price: '₹6,999',
    unit: 'one-time',
    description: 'A clean, single-purpose site to establish a professional presence fast.',
    features: [
      'Up to 4 pages (Home, About, Services, Contact)',
      'Mobile-responsive design',
      'WhatsApp & click-to-call buttons',
      'Basic on-page SEO setup',
      '1 round of revisions',
    ],
    highlighted: false,
  },
  {
    name: 'Business Website',
    price: '₹14,999',
    unit: 'one-time',
    description: 'The most popular option — a full multi-page site built around your business.',
    features: [
      'Up to 8 pages, custom-designed',
      'Contact form with email/WhatsApp delivery',
      'Google Maps & business info integration',
      'On-page SEO + Google Business Profile setup',
      '2 rounds of revisions',
      '1 month of free support after launch',
    ],
    highlighted: true,
  },
  {
    name: 'Premium Business Solution',
    price: '₹34,999',
    unit: 'starting',
    description: 'For businesses that need logins, a database, or a dashboard behind the site.',
    features: [
      'Full custom design, unlimited standard pages',
      'Admin dashboard or booking/ordering system',
      'Database-backed content (MongoDB)',
      'Advanced SEO & performance optimisation',
      '3 months of free maintenance',
    ],
    highlighted: false,
  },
  {
    name: 'Custom Enterprise Solution',
    price: 'Custom quote',
    unit: 'scoped to you',
    description: 'For e-commerce platforms, AI applications and multi-system builds.',
    features: [
      'E-commerce, RAG/AI applications, or multi-role platforms',
      'Payment gateway & third-party integrations',
      'Dedicated project timeline & staging environment',
      'Ongoing retainer support available',
    ],
    highlighted: false,
  },
]

export const pricingAddons = [
  { name: 'Extra page', price: '₹1,200 / page' },
  { name: 'Logo design', price: 'From ₹1,999' },
  { name: 'Domain & hosting setup', price: 'From ₹999' },
  { name: 'Payment gateway integration', price: 'From ₹4,999' },
  { name: 'Monthly maintenance', price: 'From ₹1,499 / mo' },
  { name: 'SEO retainer', price: 'From ₹3,999 / mo' },
]

export const siteSettings = {
  brand,
  nav,
  trustedBy,
  hero,
  hireMe,
  about,
  footerBlurb,
  seo,
}

/*
 * Seed content for BS Innovation Solutions.
 * Extracted from the original frontend/src/data/*.js files; image fields are now
 * site-absolute paths served from frontend/public/assets.
 */

export const serviceCategories = [
  { key: 'websites', label: 'Websites & Web Apps' },
  { key: 'commerce', label: 'Commerce & Dashboards' },
  { key: 'ai', label: 'AI & Automation' },
  { key: 'helpdesk', label: 'Everyday Digital Help' },
]

export const services = [
  {
    slug: 'business-websites',
    category: 'websites',
    tag: 'WEB-01',
    title: 'Business Websites',
    image: '/assets/services/bussiness.png',
    short: 'A fast, professional site that tells clients you mean business — built to convert visitors into enquiries.',
    description:
      "Most local businesses lose customers before the phone ever rings, because the website looks outdated, loads slowly, or doesn't say clearly what the business does. I build lean, fast business websites that load in under two seconds, read clearly on a phone, and are structured so Google can actually find them.",
    features: [
      'Home, About, Services, Gallery and Contact pages built to your business',
      'Mobile-first layout — most of your visitors will be on a phone',
      'Click-to-call and WhatsApp enquiry buttons on every page',
      'Google Maps and business hours embedded on the contact page',
      'Basic on-page SEO so you show up for local searches',
    ],
    idealFor: ['Local shops & showrooms', 'Consultants & agencies', 'Clinics & small firms'],
    timeline: '7–12 days',
  },
  {
    slug: 'portfolio-websites',
    category: 'websites',
    tag: 'WEB-02',
    title: 'Portfolio Websites',
    image: '/assets/services/portfolio.png',
    short: 'A personal site that shows your work instead of just listing it — for designers, photographers, editors and creators.',
    description:
      'A portfolio has one job: make someone stop scrolling and reach out. I design portfolio sites around your actual work — case studies, before/after, video reels — instead of generic template blocks, so what you built or shot is the first thing anyone sees.',
    features: [
      'Project/case-study pages with room for images, video and process notes',
      'Filterable work grid by category, client or medium',
      'Downloadable resume/rate-card and a direct enquiry form',
      'Built to be updated by you — no code needed to add new work',
    ],
    idealFor: ['Video editors & motion designers', 'Photographers', 'Writers & developers'],
    timeline: '5–8 days',
  },
  {
    slug: 'school-college-websites',
    category: 'websites',
    tag: 'WEB-03',
    title: 'School & College Websites',
    image: '/assets/services/school.png',
    short: 'An information hub for parents, students and staff — admissions, notices, faculty and results in one place.',
    description:
      'Institutions need a site that answers the same ten questions parents ask every admission season, without a phone call. I build structured school and college sites with an admissions flow, a notice board the staff can update, and clear academic information.',
    features: [
      'Admissions enquiry form with automatic email notification to the office',
      'Notice board / circulars section staff can post to directly',
      'Faculty, department and academic-program pages',
      'Photo gallery for events, sports day and annual functions',
    ],
    idealFor: ['Schools', 'Colleges & coaching institutes', 'Training centres'],
    timeline: '10–15 days',
  },
  {
    slug: 'hospital-websites',
    category: 'websites',
    tag: 'WEB-04',
    title: 'Hospital & Clinic Websites',
    image: '/assets/services/hospital.png',
    short: 'A trustworthy site for patients to find doctors, book appointments and understand your services before they walk in.',
    description:
      'Patients research before they visit. I build hospital and clinic websites that present doctors, departments and services clearly, with an appointment-request flow, so the first impression is calm and trustworthy rather than a bare list of services.',
    features: [
      'Doctor profiles with specialisation, timings and qualifications',
      'Department / services pages written in plain language',
      'Appointment-request form routed to WhatsApp or email',
      'Emergency contact and location fixed to the top of every page',
    ],
    idealFor: ['Hospitals & nursing homes', 'Diagnostic centres', 'Individual clinics'],
    timeline: '10–15 days',
  },
  {
    slug: 'temple-ngo-websites',
    category: 'websites',
    tag: 'WEB-05',
    title: 'Temple & NGO Websites',
    image: '/assets/services/temple.png',
    short: 'A digital home for your community — events, seva, gallery and donations, built with the same care as the institution itself.',
    description:
      "A temple or NGO's website is often the only place a devotee or donor abroad can connect with the institution. I've built this exact kind of site before — for Panchwati Hanuman Mandir — covering temple history, daily aarti timings, events calendar, photo gallery and a donation section, in a design that respects the tone of the institution.",
    features: [
      'Temple/organisation history, deity and events information',
      'Aarti/seva timings and festival calendar',
      'Photo and video gallery for events and celebrations',
      'Donation section with account details or payment gateway integration',
    ],
    idealFor: ['Temples & religious trusts', 'NGOs & charitable societies', 'Community organisations'],
    timeline: '10–14 days',
  },
  {
    slug: 'event-websites',
    category: 'websites',
    tag: 'WEB-06',
    title: 'Event Websites',
    image: '/assets/services/event.png',
    short: 'Registration, payment, schedule and gallery for a reunion, conference or festival — built to handle a rush of visitors.',
    description:
      "I built the full registration system for MCE Snehada Milana, an alumni reunion, so I know exactly what an event website needs under pressure: a registration form that doesn't break when everyone signs up in the last three days, working payments, and an alumni directory people actually use.",
    features: [
      'Online registration with payment gateway integration',
      'Event schedule, speaker/guest and venue information',
      'Photo gallery and post-event highlights section',
      'Attendee or alumni directory where relevant',
    ],
    idealFor: ['Alumni reunions', 'Conferences & seminars', 'Festivals & community events'],
    timeline: '10–18 days',
  },
  {
    slug: 'restaurant-websites',
    category: 'websites',
    tag: 'WEB-07',
    title: 'Restaurant Websites',
    image: '/assets/services/restaurant.png',
    short: 'A menu that looks as good as the food, with location, hours and table/order enquiries sorted.',
    description:
      'A restaurant site should make someone hungry within five seconds and tell them exactly how to get a table or order in. I design menu-first restaurant sites with clean food photography layouts, hours, location and a direct WhatsApp/call-to-order flow — no clunky ordering plugins required.',
    features: [
      'Digital menu with categories, pricing and photos',
      'Table reservation or order-enquiry form',
      'Location, hours and delivery-area information',
      'Optional integration links to Zomato/Swiggy listings',
    ],
    idealFor: ['Restaurants & cafés', 'Cloud kitchens', 'Catering services'],
    timeline: '7–10 days',
  },
  {
    slug: 'ecommerce-websites',
    category: 'commerce',
    tag: 'COM-01',
    title: 'E-commerce Websites',
    image: '/assets/services/e-commerce.png',
    short: 'A store you actually own — products, cart, payments and orders, without a monthly platform fee eating your margin.',
    description:
      'I build e-commerce sites on the MERN stack (MongoDB, Express, React, Node.js), which means you get a store built exactly for your catalogue and pricing model, not squeezed into a template. Grameen Haat, a rural marketplace, runs on this same stack — product showcase, categories and a modern buying flow.',
    features: [
      'Product catalogue with categories, variants and search',
      'Cart, checkout and payment gateway integration',
      'Order tracking and an admin dashboard to manage stock and orders',
      'Built to scale — add products and categories without redesigning',
    ],
    idealFor: ['D2C brands', 'Local marketplaces', 'Wholesalers moving online'],
    timeline: '3–5 weeks',
  },
  {
    slug: 'admin-dashboards',
    category: 'commerce',
    tag: 'COM-02',
    title: 'Admin Dashboards',
    image: '/assets/services/admin.png',
    short: 'A control panel for your business — orders, users, content and reports in one clean, permission-based interface.',
    description:
      "Once a site does more than show information, someone needs a way to manage it without touching code. I build admin dashboards with role-based logins, data tables, charts and CRUD screens tailored to what you actually track — the same kind of backend office that powers the consultancy portal I run for Dheeraj Singh Consultancy.",
    features: [
      'Secure, role-based login (admin / staff / viewer)',
      'Data tables with search, filter and export',
      'Charts and summary reports for quick decisions',
      'Content, order or user management screens built around your workflow',
    ],
    idealFor: ['Businesses managing orders or leads', 'Consultancies & agencies', 'Institutions with staff logins'],
    timeline: '2–4 weeks',
  },
  {
    slug: 'ai-chatbots-rag',
    category: 'ai',
    tag: 'AI-01',
    title: 'AI Chatbots & RAG Applications',
    image: '/assets/services/ai-chatbot.png',
    short: 'A chatbot trained on your own documents — answers your customers correctly, in your voice, around the clock.',
    description:
      "A generic chatbot makes things up. I build Retrieval-Augmented Generation (RAG) applications — like the AI Health Assistant I built on Gemini — where the AI answers strictly from your own knowledge base: your FAQs, brochures, price lists or policy documents, so the answers are accurate and on-brand.",
    features: [
      'Chatbot trained on your documents, FAQs or product catalogue',
      'Website widget, WhatsApp, or standalone app deployment',
      'Retrieval-Augmented Generation for accurate, source-grounded answers',
      'Usage dashboard to see what customers are actually asking',
    ],
    idealFor: ['Support-heavy businesses', 'Healthcare & consultancy', 'Anyone drowning in repeat questions'],
    timeline: '2–4 weeks',
  },
  {
    slug: 'seo-optimization',
    category: 'ai',
    tag: 'AI-02',
    title: 'SEO Optimisation',
    image: '/assets/services/seo.png',
    short: 'Get found by the people already searching for what you offer — technical SEO done properly, not keyword-stuffed.',
    description:
      "A beautiful site nobody finds doesn't grow a business. I set up the technical foundation search engines actually reward — meta tags, structured data, sitemaps — and write content around the searches your real customers are typing, whether that's 'best web developer near me' or a service-specific query.",
    features: [
      'On-page SEO: meta tags, headings, image alt text, internal linking',
      'Schema.org structured data for rich search results',
      'sitemap.xml and robots.txt configuration',
      'Google Search Console & Analytics setup with a monthly report',
    ],
    idealFor: ['Any business wanting organic traffic', 'Local service providers', 'Content-driven sites'],
    timeline: 'Ongoing / monthly',
  },
  {
    slug: 'website-maintenance',
    category: 'commerce',
    tag: 'COM-03',
    title: 'Website Maintenance',
    image: '/assets/services/maintenance.png',
    short: 'Keep it fast, secure and updated — so your site is never the reason you lose a lead.',
    description:
      "A website is not a one-time purchase. I offer ongoing maintenance — security updates, content changes, uptime monitoring and backups — so you can call, message or email a request and have it live the same week, instead of chasing a freelancer who disappeared after launch.",
    features: [
      'Regular security and dependency updates',
      'Content edits, new pages and image swaps on request',
      'Uptime monitoring and backup management',
      'Priority WhatsApp support for urgent fixes',
    ],
    idealFor: ['Any live website', 'Businesses without an in-house developer', 'Sites built by BS Innovation Solutions'],
    timeline: 'Monthly retainer',
  },
  {
    slug: 'insurance-agent-websites',
    category: 'helpdesk',
    tag: 'HLP-01',
    title: 'Insurance & Advisor Websites',
    image: '/assets/services/insurance.png',
    short: 'A professional site for LIC/insurance agents and financial advisors — policies, premium calculators and lead capture.',
    description:
      'Insurance and financial advisors are almost always selling on trust and reputation, but rarely have a website that reflects it. I build advisor websites with policy/plan explainers, a simple premium or returns calculator, testimonials and a lead form that lands straight in your inbox or WhatsApp.',
    features: [
      'Plan/policy explainer pages in simple, non-jargon language',
      'Premium or returns calculator widget',
      'Client testimonials and trust-building sections',
      'Lead capture form routed to WhatsApp, email or a CRM sheet',
    ],
    idealFor: ['LIC & insurance agents', 'Mutual fund & financial advisors', 'Loan & credit consultants'],
    timeline: '7–12 days',
  },
  {
    slug: 'email-google-workspace-setup',
    category: 'helpdesk',
    tag: 'HLP-02',
    title: 'Gmail & Google Workspace Setup',
    image: '/assets/services/workspace.png',
    short: 'A proper business email on your own domain, plus help setting up, securing or recovering everyday Google accounts.',
    description:
      '"contact@yourbusiness.com" looks a world more credible than a free Gmail address in client emails. I set up Google Workspace or business Gmail on your own domain, configure it correctly the first time (SPF/DKIM so mail doesn\'t land in spam), and help with everyday account tasks — new Gmail accounts, account recovery, two-factor setup and syncing mail to your phone.',
    features: [
      'Business email setup on your own domain (Google Workspace or equivalent)',
      'Correct SPF/DKIM/DMARC configuration so mail is trusted, not marked spam',
      'New Gmail / Google account creation and phone sync',
      'Account recovery and two-factor authentication setup',
    ],
    idealFor: ['New businesses needing professional email', 'Anyone locked out of an old account', 'Teams moving to shared Google accounts'],
    timeline: '1–2 days',
  },
  {
    slug: 'business-listing-social-setup',
    category: 'helpdesk',
    tag: 'HLP-03',
    title: 'Google Business Profile & Social Setup',
    image: '/assets/services/business-profile.png',
    short: 'Get your shop or service onto Google Maps and set up Instagram/Facebook business pages the right way, once.',
    description:
      'A huge share of "near me" searches never reach a website at all — they stop at Google Maps. I set up and verify your Google Business Profile with the right category, photos and hours, and configure Instagram, Facebook and WhatsApp Business pages correctly so they are ready to run ads or take orders from day one.',
    features: [
      'Google Business Profile creation, verification and optimisation',
      'Instagram, Facebook and WhatsApp Business page setup',
      'Consistent business info (name, address, hours) across all listings',
      'Basic guidance on posting and responding to reviews',
    ],
    idealFor: ['Local shops & service providers', 'New businesses going online for the first time', 'Anyone with an unclaimed or messy listing'],
    timeline: '2–4 days',
  },
  {
    slug: 'domain-hosting-setup',
    category: 'helpdesk',
    tag: 'HLP-04',
    title: 'Domain, Hosting & Everyday Digital Work',
    image: '/assets/services/hoisting-purchase.png',
    short: 'Buying a domain, choosing hosting, filling a government form online — the digital chores handled properly, once.',
    description:
      "Not everything digital needs a big project — sometimes you just need someone who won't get it wrong. I handle domain registration and hosting setup, SSL certificates, PDF/document digitisation, and general 'get this done online' tasks like form-filling on government or insurance portals, so you're not stuck figuring out an unfamiliar website alone.",
    features: [
      'Domain registration, DNS and hosting setup',
      'SSL certificate installation (https on every site)',
      'Document scanning, PDF creation/editing and digitisation',
      'Assistance with online forms — government portals, insurance, banking and more',
    ],
    idealFor: ['First-time domain buyers', 'Anyone digitising paper records', 'Non-technical founders and families'],
    timeline: 'Same day – 3 days',
  },
]

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

export const blog = [
  {
    slug: 'how-much-does-a-business-website-cost',
    tag: 'NOTE-01',
    title: 'How Much Does a Business Website Actually Cost?',
    date: '2026-06-02',
    readTime: '6 min read',
    excerpt: 'A straight answer, without the "it depends" runaround — what drives the price up or down, and what you should never pay for.',
    body: [
      'The honest answer is a range, but the honest reasons behind that range are rarely explained. A brochure-style business site with four or five pages sits at one end. A custom platform with logins, payments and an admin dashboard sits at the other. The gap between them is not decoration — it is engineering time.',
      'Three things move the price the most: how many unique page templates you need, whether the site needs a database and login system behind it, and how much custom design work goes into it versus reusing a proven structure. A restaurant menu page is quick. A booking system that checks real-time availability is not.',
      'What should never inflate the price is generic "platform fees" — monthly charges for hosting your own content on someone else\'s builder, indefinitely. A site built on your own stack, on your own domain, is a one-time build plus optional maintenance, not rent.',
      'A fair way to budget: decide first whether you need a website (informational, one-way) or a web application (accounts, data, transactions). That single decision explains most of the price difference you will see between quotes.',
    ],
  },
  {
    slug: 'why-every-business-needs-a-website',
    tag: 'NOTE-02',
    title: 'Why Every Business Still Needs a Website in 2026',
    date: '2026-05-18',
    readTime: '5 min read',
    excerpt: "Instagram and WhatsApp Business cover a lot — but they can't do the one thing a website can: be found by someone who's never heard of you.",
    body: [
      'A social media page works well for people who already follow you. A website works for the much larger group who don\'t — the person typing "best [service] near me" into Google with zero prior awareness of your business.',
      'A website is also the only channel you fully own. A social platform can change its algorithm, restrict reach or suspend an account overnight, and there is very little recourse. A domain and a website are yours — the traffic you build there compounds instead of resetting with every algorithm update.',
      'There is also a trust signal at play. Many customers, especially for anything involving money — insurance, consulting, healthcare — will quietly check for a website before replying to a DM, even if they found you on social media first.',
      'None of this means abandon social media. It means treat it as the funnel, and the website as the place that funnel leads to — the one place built to convert a visitor into an enquiry, not just a follow.',
    ],
  },
  {
    slug: 'react-vs-wordpress',
    tag: 'NOTE-03',
    title: 'React vs WordPress: Which One Should You Actually Pick?',
    date: '2026-05-04',
    readTime: '7 min read',
    excerpt: 'Not a religious war — a practical comparison of when a custom-coded site earns its cost, and when it genuinely does not.',
    body: [
      'WordPress is a strong choice when the site is mostly content — blog posts, static pages, a catalogue that does not need heavy custom logic — and the owner wants to edit it themselves without calling a developer for every change.',
      'A custom-coded React application earns its cost when the site needs to do something specific: a real-time dashboard, a calculator, a booking flow with business logic, or performance that a plugin-heavy WordPress install struggles to hit. Custom code also avoids the slow, plugin-bloated load times that hurt both user experience and SEO ranking.',
      'Maintenance is the quiet difference. WordPress sites need constant plugin and core updates to stay secure. A leaner custom application has a smaller attack surface and fewer moving parts to patch.',
      'The practical rule I use with clients: if the site is primarily "tell people about us" content, WordPress is a reasonable, faster option. If the site needs to do real work — process data, run logic, integrate tightly with a database — build it custom.',
    ],
  },
  {
    slug: 'best-event-website-features',
    tag: 'NOTE-04',
    title: 'The Five Features Every Event Website Actually Needs',
    date: '2026-04-21',
    readTime: '5 min read',
    excerpt: 'Learned the hard way while building registration for an alumni reunion — here is what actually matters on the day.',
    body: [
      'Registration that does not fall over under load. Most event sign-ups happen in the final 72 hours before a deadline. A registration form needs to hold up to a burst of simultaneous submissions, not just work fine in a quiet demo.',
      'Payment that confirms instantly. Nothing creates support messages faster than a payment that goes through on the bank\'s side but does not reflect on the confirmation screen. Reliable webhook handling matters more than a flashy checkout design.',
      'A schedule page that works without an internet connection at the venue. Venues have bad WiFi. A lightweight, cacheable schedule page beats a heavy, JavaScript-dependent one when it matters most.',
      'An admin view for the organisers, not just the attendees. Someone on the committee needs to see registrations, payments and numbers in real time — not export a spreadsheet the night before.',
      'A gallery and directory that outlive the event. The site should not go dark the day after — a photo gallery and an attendee or alumni directory give people a reason to come back.',
    ],
  },
  {
    slug: 'ai-in-modern-business-websites',
    tag: 'NOTE-05',
    title: "Where AI Actually Helps on a Business Website (and Where It's a Gimmick)",
    date: '2026-04-09',
    readTime: '6 min read',
    excerpt: 'A grounded look at chatbots and RAG applications — what genuinely saves a business time, versus what just looks impressive in a demo.',
    body: [
      'A chatbot trained only on general internet knowledge is a liability on a business site — it will confidently answer a pricing or policy question incorrectly. That is where Retrieval-Augmented Generation (RAG) matters: the AI is restricted to answering from your own documents, so it either answers correctly or says it does not know.',
      'The genuinely useful applications are narrow: answering repeat customer questions from a knowledge base, summarising long documents for staff, or triaging enquiries before a human takes over. These save real hours every week.',
      'The gimmick applications are the ones bolted on for the sake of having "AI" on the homepage — a chat widget with no real knowledge base behind it, or a content generator nobody on the team actually uses.',
      'The test I use before recommending AI to a client: would this replace a task someone is doing manually today? If yes, it is worth building. If the honest answer is "it would just be nice to have," it usually is not worth the added complexity yet.',
    ],
  },
  {
    slug: 'seo-tips-for-small-businesses',
    tag: 'NOTE-06',
    title: 'SEO for Small Businesses: The Five Things That Actually Move the Needle',
    date: '2026-03-27',
    readTime: '6 min read',
    excerpt: 'Skip the 40-point checklist — these are the five changes that consistently move a small business site up in local search.',
    body: [
      'Claim and complete your Google Business Profile. For most local searches, this — not your website — is what shows up first. An unverified or half-filled profile is the single most common reason a genuinely good business is invisible on Google Maps.',
      'Write your page titles and headings the way customers actually search, not the way your business describes itself internally. "Affordable dental clinic in [city]" outperforms a clever tagline in search results, even if the tagline reads better on a banner.',
      'Fix load speed before anything else. A slow site is penalised twice — once by visitors leaving, and once by the search ranking algorithm itself.',
      'Add structured data (Schema.org markup) for your business type, reviews and services. It is invisible to a visitor but tells Google exactly what your page contains, which improves how you appear in results.',
      'Keep publishing something, even monthly. A single blog post a month, answering a real customer question, does more for long-term ranking than a one-time SEO "setup" that is never touched again.',
    ],
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

// Field/column definitions that drive the generic admin collection editor.
// Field types: text | textarea | number | boolean | select | tags | list | image

export const collectionSchemas = {
  services: {
    label: 'Services',
    endpoint: 'services',
    singularLabel: 'service',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'timeline', label: 'Timeline' },
    ],
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'category', type: 'select', from: 'serviceCategories', required: true },
      { name: 'tag', type: 'text', hint: 'e.g. WEB-01' },
      { name: 'short', type: 'textarea', label: 'Short summary' },
      { name: 'description', type: 'textarea', rows: 5 },
      { name: 'image', type: 'image' },
      { name: 'features', type: 'list', label: 'What’s included (one per line)' },
      { name: 'idealFor', type: 'list', label: 'Best for (one per line)' },
      { name: 'timeline', type: 'text', hint: 'e.g. 7–12 days' },
    ],
  },

  portfolio: {
    label: 'Portfolio',
    endpoint: 'portfolio',
    singularLabel: 'project',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'year', label: 'Year' },
    ],
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'tag', type: 'text', hint: 'e.g. CASE-01' },
      { name: 'category', type: 'text' },
      { name: 'year', type: 'text' },
      { name: 'image', type: 'image' },
      { name: 'summary', type: 'textarea' },
      { name: 'problem', type: 'textarea', rows: 4 },
      { name: 'solution', type: 'textarea', rows: 4 },
      { name: 'features', type: 'list', label: 'Key features (one per line)' },
      { name: 'stack', type: 'tags', label: 'Tech stack (comma separated)' },
      { name: 'link', type: 'text', label: 'Live URL', hint: 'https://…' },
    ],
  },

  blog: {
    label: 'Blog',
    endpoint: 'blog',
    singularLabel: 'post',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'date', label: 'Date' },
      { key: 'readTime', label: 'Read time' },
    ],
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'tag', type: 'text', hint: 'e.g. NOTE-01' },
      { name: 'date', type: 'text', hint: 'YYYY-MM-DD' },
      { name: 'readTime', type: 'text', hint: 'e.g. 6 min read' },
      { name: 'excerpt', type: 'textarea' },
      { name: 'body', type: 'list', label: 'Body — one paragraph per line', rows: 12 },
    ],
  },

  'pricing-plans': {
    label: 'Pricing plans',
    endpoint: 'pricing-plans',
    singularLabel: 'plan',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'price', label: 'Price' },
      { key: 'highlighted', label: 'Featured' },
    ],
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'price', type: 'text', hint: 'e.g. ₹14,999' },
      { name: 'unit', type: 'text', hint: 'e.g. one-time' },
      { name: 'description', type: 'textarea' },
      { name: 'features', type: 'list', label: 'Features (one per line)' },
      { name: 'highlighted', type: 'boolean', label: 'Mark as “Most popular”' },
    ],
  },

  'pricing-addons': {
    label: 'Pricing add-ons',
    endpoint: 'pricing-addons',
    singularLabel: 'add-on',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'price', label: 'Price' },
    ],
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'price', type: 'text' },
    ],
  },

  testimonials: {
    label: 'Testimonials',
    endpoint: 'testimonials',
    singularLabel: 'testimonial',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'context', label: 'Context' },
    ],
    fields: [
      { name: 'quote', type: 'textarea', required: true },
      { name: 'name', type: 'text' },
      { name: 'context', type: 'text', hint: 'e.g. project or company' },
    ],
  },

  faqs: {
    label: 'FAQs',
    endpoint: 'faqs',
    singularLabel: 'FAQ',
    columns: [{ key: 'q', label: 'Question' }],
    fields: [
      { name: 'q', type: 'text', label: 'Question', required: true },
      { name: 'a', type: 'textarea', label: 'Answer', required: true, rows: 4 },
    ],
  },

  'process-steps': {
    label: 'Process steps',
    endpoint: 'process-steps',
    singularLabel: 'step',
    columns: [
      { key: 'step', label: 'No.' },
      { key: 'title', label: 'Title' },
    ],
    fields: [
      { name: 'step', type: 'text', hint: 'e.g. 01' },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
    ],
  },

  'tech-stack': {
    label: 'Tech stack',
    endpoint: 'tech-stack',
    singularLabel: 'item',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'note', label: 'Note' },
    ],
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'note', type: 'text', hint: 'e.g. Frontend framework' },
    ],
  },

  timeline: {
    label: 'About — timeline',
    endpoint: 'timeline',
    singularLabel: 'entry',
    columns: [
      { key: 'year', label: 'Year' },
      { key: 'title', label: 'Title' },
    ],
    fields: [
      { name: 'year', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea' },
    ],
  },

  'core-values': {
    label: 'About — core values',
    endpoint: 'core-values',
    singularLabel: 'value',
    columns: [{ key: 'title', label: 'Title' }],
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
    ],
  },

  'service-categories': {
    label: 'Service categories',
    endpoint: 'service-categories',
    singularLabel: 'category',
    columns: [
      { key: 'key', label: 'Key' },
      { key: 'label', label: 'Label' },
    ],
    fields: [
      { name: 'key', type: 'text', required: true, hint: 'lowercase id, e.g. websites' },
      { name: 'label', type: 'text', required: true },
    ],
  },
}

// Sidebar grouping / order.
export const adminNav = [
  { section: 'Content', items: ['services', 'portfolio', 'blog'] },
  { section: 'Pricing', items: ['pricing-plans', 'pricing-addons'] },
  { section: 'Home page', items: ['testimonials', 'faqs', 'process-steps', 'tech-stack'] },
  { section: 'About page', items: ['timeline', 'core-values'] },
  { section: 'Taxonomy', items: ['service-categories'] },
]

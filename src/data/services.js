// SVG strings for each service icon (no JSX — .js file)
const icons = {
  webApp: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><circle cx="7" cy="6" r=".5" fill="${color}"/><circle cx="10" cy="6" r=".5" fill="${color}"/><path d="M7 14h4M7 17h8"/></svg>`,
  globe: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>`,
  cart: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  megaphone: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>`,
  pos: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 8h.01M10 8h4M6 11h.01M10 11h2"/></svg>`,
  design: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l11.04 11.04"/><circle cx="11" cy="11" r="2"/></svg>`,
  video: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="15" height="10" rx="2"/><path d="M17 9l5-3v12l-5-3V9z"/></svg>`,
  cloud: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  seo: (color) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>`,
};

export const services = [
  {
    icon: icons.webApp,
    title: 'Custom Web Applications',
    description:
      'Full-stack applications engineered from the ground up — React front-ends, Node.js APIs, Firebase or PostgreSQL backends, and real-time features that hold up under actual production load.',
    tags: ['React', 'Next.js', 'Node.js', 'Firebase'],
    color: '#00e5ff',
    tagLogos: {
      'React':   `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#20232A"/><circle cx="12" cy="12" r="1.875" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="8.25" ry="3.15" stroke="#61DAFB" stroke-width="1.1" fill="none"/><ellipse cx="12" cy="12" rx="8.25" ry="3.15" stroke="#61DAFB" stroke-width="1.1" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="8.25" ry="3.15" stroke="#61DAFB" stroke-width="1.1" fill="none" transform="rotate(120 12 12)"/></svg>`,
      'Next.js': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#000"/><path d="M12 3.75C7.44 3.75 3.75 7.44 3.75 12s3.69 8.25 8.25 8.25c2.28 0 4.34-.92 5.84-2.41L9.75 9.75V15H8.25V7.5h1.5l7.13 9.83A8.22 8.22 0 0020.25 12c0-4.56-3.69-8.25-8.25-8.25z" fill="#fff"/><rect x="14.25" y="7.5" width="1.5" height="6.75" fill="#fff"/></svg>`,
      'Node.js': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#1a1a1a"/><path d="M12 3.75L4.5 8.25v7.5L12 20.25l7.5-4.5v-7.5L12 3.75zm0 1.73l5.63 3.37-5.63 3.37-5.63-3.37L12 5.48zM5.25 9.8l6 3.6v6.9l-6-3.6V9.8zm7.5 10.5v-6.9l6-3.6v6.9l-6 3.6z" fill="#539E43"/></svg>`,
      'Firebase':`<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#1a1a1a"/><path d="M6 18l3.375-10.5 2.625 4.875L14.25 7.5l3.75 10.5H6z" fill="#FFA000"/><path d="M6 18l3.375-10.5 2.625 4.875L6 18z" fill="#F57F17"/><path d="M12 12.375L14.25 7.5l3.75 10.5-6-5.625z" fill="#FFCA28"/></svg>`,
    },
  },
  {
    icon: icons.globe,
    title: 'Business Websites',
    description:
      'Fast, focused websites built around your business goals — mobile-first layout, solid semantic HTML, edge-deployed for speed, and structured for search engines from day one.',
    tags: ['Responsive', 'SEO', 'Performance'],
    color: '#8b5cf6',
    tagLogos: {
      'Responsive': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#8b5cf6"/><rect x="3.75" y="6" width="16.5" height="10.5" rx="1.5" stroke="#fff" stroke-width="1.1" fill="none"/><rect x="9.75" y="16.5" width="4.5" height="2.25" rx=".75" fill="#fff"/><rect x="7.5" y="18.75" width="9" height="1.1" rx=".55" fill="#fff"/></svg>`,
      'SEO':        `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#EA580C"/><circle cx="10.5" cy="10.5" r="4.5" stroke="#fff" stroke-width="1.5" fill="none"/><path d="M14.25 14.25l3.75 3.75" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      'Performance':`<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#0EA5E9"/><path d="M5.25 18l4.5-6 3 3 4.5-6 1.5 1.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    },
  },
  {
    icon: icons.cart,
    title: 'E-Commerce Platforms',
    description:
      'End-to-end online stores — product catalog, cart, checkout, payment integration, and inventory management. Built for conversions, not just aesthetics.',
    tags: ['E-commerce', 'PWA', 'Payment Integration'],
    color: '#10b981',
    tagLogos: {
      'E-commerce':         `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#16A34A"/><path d="M4.5 6h2.25l1.5 7.5h9l1.5-6H8.25" stroke="#fff" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="10.5" cy="18" r="1.125" fill="#fff"/><circle cx="15" cy="18" r="1.125" fill="#fff"/></svg>`,
      'PWA':                `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#5A0FC8"/><text x="2.5" y="16" font-family="Arial" font-weight="bold" font-size="7.5" fill="#fff">PWA</text></svg>`,
      'Payment Integration':`<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#0EA5E9"/><rect x="4.5" y="7.5" width="15" height="9" rx="1.5" stroke="#fff" stroke-width="1.35" fill="none"/><path d="M4.5 10.5h15" stroke="#fff" stroke-width="1.35"/></svg>`,
    },
  },
  {
    icon: icons.megaphone,
    title: 'Brand Promotion Websites',
    description:
      'High-impact landing pages and brand sites with purposeful animations, conversion-focused layouts, and the visual storytelling that makes first impressions count.',
    tags: ['Landing Pages', 'GSAP', 'Brand Identity'],
    color: '#f59e0b',
    tagLogos: {
      'Landing Pages':  `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F59E0B"/><rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="#fff" stroke-width="1.35" fill="none"/><path d="M7.5 9h9M7.5 12h6M7.5 15h4.5" stroke="#fff" stroke-width="1.35" stroke-linecap="round"/></svg>`,
      'GSAP':           `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#88CE02"/><text x="3" y="16" font-family="Arial" font-weight="bold" font-size="6.5" fill="#000">GSAP</text></svg>`,
      'Brand Identity': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F59E0B"/><circle cx="12" cy="12" r="5.25" stroke="#fff" stroke-width="1.35" fill="none"/><circle cx="12" cy="12" r="2.25" fill="#fff"/></svg>`,
    },
  },
  {
    icon: icons.pos,
    title: 'POS Systems & Store Management',
    description:
      'Digital point-of-sale systems that replace paper-based workflows — barcode generation, billing, inventory tracking, and supplier management in one coherent interface.',
    tags: ['ERP', 'Billing', 'Barcode', 'Inventory'],
    color: '#ec4899',
    tagLogos: {
      'ERP':       `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#B45309"/><rect x="4.5" y="4.5" width="6" height="5.25" rx=".75" fill="#fff" fill-opacity=".9"/><rect x="13.5" y="4.5" width="6" height="5.25" rx=".75" fill="#fff" fill-opacity=".9"/><rect x="4.5" y="13.5" width="6" height="5.25" rx=".75" fill="#fff" fill-opacity=".9"/><rect x="13.5" y="13.5" width="6" height="5.25" rx=".75" fill="#fff" fill-opacity=".9"/></svg>`,
      'Billing':   `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#EC4899"/><rect x="6" y="4.5" width="12" height="15" rx="1.5" stroke="#fff" stroke-width="1.35" fill="none"/><path d="M9 9h6M9 12h6M9 15h4" stroke="#fff" stroke-width="1.35" stroke-linecap="round"/></svg>`,
      'Barcode':   `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#EC4899"/><path d="M4.5 6v12M7.5 6v12M9 6v12M12 6v12M13.5 6v12M16.5 6v12M18 6v12M19.5 6v12" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/></svg>`,
      'Inventory': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#EC4899"/><path d="M12 3.75L4.5 8.25v7.5L12 20.25l7.5-4.5v-7.5L12 3.75z" stroke="#fff" stroke-width="1.35" fill="none"/><path d="M12 12l7.5-3.75M12 12v8.25M12 12L4.5 8.25" stroke="#fff" stroke-width="1.35"/></svg>`,
    },
  },
  {
    icon: icons.design,
    title: 'Graphic Design',
    description:
      'Visual assets with a purpose — logos, social media graphics, banners, and brand identity kits that hold up across formats and reflect the business they represent.',
    tags: ['Branding', 'Logos', 'Social Media'],
    color: '#6366f1',
    tagLogos: {
      'Branding':    `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#6366F1"/><circle cx="12" cy="12" r="5.25" stroke="#fff" stroke-width="1.35" fill="none"/><circle cx="12" cy="12" r="2.25" fill="#fff"/></svg>`,
      'Logos':       `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#6366F1"/><path d="M12 4.5l-7.5 4.5v6l7.5 4.5 7.5-4.5V9L12 4.5z" stroke="#fff" stroke-width="1.35" fill="none"/><circle cx="12" cy="12" r="2.25" fill="#fff"/></svg>`,
      'Social Media':`<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#6366F1"/><circle cx="7.5" cy="12" r="2.25" fill="#fff"/><circle cx="16.5" cy="7.5" r="2.25" fill="#fff"/><circle cx="16.5" cy="16.5" r="2.25" fill="#fff"/><path d="M9.6 10.95l4.65-2.7M9.6 13.05l4.65 2.7" stroke="#fff" stroke-width="1.35"/></svg>`,
    },
  },
  {
    icon: icons.video,
    title: 'Video Editing',
    description:
      'Professional video editing for promotional content, product showcases, reels, and campaign assets. Pacing, colour, and motion that holds attention rather than filling time.',
    tags: ['Video', 'Reels', 'Promotional'],
    color: '#f43f5e',
    tagLogos: {
      'Video':       `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F43F5E"/><rect x="4.5" y="7.5" width="11.25" height="9" rx="1.5" stroke="#fff" stroke-width="1.35" fill="none"/><path d="M15.75 10.5l3.75-2.25v7.5l-3.75-2.25v-3z" fill="#fff"/></svg>`,
      'Reels':       `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F43F5E"/><circle cx="12" cy="12" r="6" stroke="#fff" stroke-width="1.35" fill="none"/><circle cx="12" cy="12" r="2.25" fill="#fff"/></svg>`,
      'Promotional': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#F43F5E"/><path d="M5.25 9.75h1.5v4.5h-1.5v-4.5zM8.25 7.5h1.5v9H8.25v-9zM11.25 10.5h1.5v3h-1.5v-3zM14.25 6h1.5v12h-1.5V6zM17.25 9h1.5v6h-1.5V9z" fill="#fff"/></svg>`,
    },
  },
  {
    icon: icons.cloud,
    title: 'Cloud Deployment & DevOps',
    description:
      'Taking your application from working locally to running reliably in production — AWS, Vercel, or Netlify, with CI/CD pipelines, domain configuration, and performance tuning included.',
    tags: ['AWS', 'Vercel', 'Netlify', 'CI/CD'],
    color: '#0ea5e9',
    tagLogos: {
      'AWS':    `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#232F3E"/><path d="M7.5 13.875c-1.65-.6-2.625-1.875-2.625-3.375 0-1.875 1.5-3.375 3.375-3.375.3 0 .6.038.9.113C9.75 6.075 11.25 5.25 12.75 5.25c2.475 0 4.5 2.025 4.5 4.5 0 .15 0 .3-.015.45C18.15 10.65 18.75 11.625 18.75 12.75c0 1.65-1.35 3-3 3H8.25c-.263 0-.516-.038-.75-.113z" fill="#FF9900"/></svg>`,
      'Vercel': `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#000"/><path d="M12 5.25L21 18.75H3L12 5.25z" fill="#fff"/></svg>`,
      'Netlify':`<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#00AD9F"/><path d="M9 7.5h6v1.5H12v7.5h-1.5V9H9V7.5zM6.75 12l2.25-2.25v4.5L6.75 12zM17.25 12l-2.25-2.25v4.5L17.25 12z" fill="#fff"/></svg>`,
      'CI/CD':  `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#0EA5E9"/><circle cx="6" cy="12" r="2.25" stroke="#fff" stroke-width="1.35" fill="none"/><circle cx="18" cy="12" r="2.25" stroke="#fff" stroke-width="1.35" fill="none"/><path d="M8.25 12h7.5" stroke="#fff" stroke-width="1.35" stroke-dasharray="2 1.5"/><path d="M15 9.75l2.25 2.25L15 14.25" stroke="#fff" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
  },
  {
    icon: icons.seo,
    title: 'Technical SEO',
    description:
      'Structured data, Core Web Vitals optimisation, semantic HTML, and a meta strategy grounded in how search engines actually work — not just keyword stuffing and hoping for the best.',
    tags: ['SEO', 'Performance', 'Core Web Vitals'],
    color: '#84cc16',
    tagLogos: {
      'SEO':            `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#EA580C"/><circle cx="10.5" cy="10.5" r="4.5" stroke="#fff" stroke-width="1.5" fill="none"/><path d="M14.25 14.25l3.75 3.75" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      'Performance':    `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#0EA5E9"/><path d="M5.25 18l4.5-6 3 3 4.5-6 1.5 1.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
      'Core Web Vitals':`<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#84CC16"/><path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" stroke="#fff" stroke-width="1.35" stroke-linecap="round"/><circle cx="12" cy="12" r="2.25" fill="#fff"/></svg>`,
    },
  },
];

// Real brand SVG logos (inline, no external deps)
const logos = {
  JavaScript: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#F7DF1E"/><path d="M9.5 24.5l2.1-1.27c.4.72.77 1.33 1.65 1.33.84 0 1.37-.33 1.37-1.61V15h2.58v7.98c0 2.65-1.55 3.86-3.82 3.86-2.05 0-3.24-1.06-3.88-2.34zM19.1 24.2l2.1-1.22c.55.9 1.27 1.56 2.54 1.56 1.07 0 1.75-.53 1.75-1.27 0-.88-.7-1.19-1.88-1.7l-.65-.28c-1.86-.79-3.1-1.79-3.1-3.89 0-1.94 1.48-3.41 3.78-3.41 1.64 0 2.82.57 3.67 2.06l-2.01 1.29c-.44-.79-.92-1.1-1.66-1.1-.75 0-1.23.48-1.23 1.1 0 .77.48 1.08 1.58 1.56l.65.28c2.19.94 3.43 1.9 3.43 4.05 0 2.32-1.82 3.6-4.27 3.6-2.39 0-3.94-1.14-4.7-2.63z" fill="#000"/></svg>`,

  TypeScript: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#3178C6"/><path d="M18.5 17.5H21v-2h-7v2h2.5V25h2V17.5zM22 19.5c0-1.93 1.34-3.5 3.5-3.5.72 0 1.36.18 1.9.5l-.8 1.6c-.3-.18-.67-.28-1.1-.28-.83 0-1.5.67-1.5 1.68V25H22v-5.5z" fill="#fff"/></svg>`,

  SQL: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#336791"/><ellipse cx="16" cy="10" rx="8" ry="3.5" fill="#fff" fillOpacity=".9"/><path d="M8 10v4c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5v-4c0 1.93-3.58 3.5-8 3.5S8 11.93 8 10z" fill="#fff" fillOpacity=".7"/><path d="M8 14v4c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5v-4c0 1.93-3.58 3.5-8 3.5S8 15.93 8 14z" fill="#fff" fillOpacity=".5"/></svg>`,

  HTML5: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#E34F26"/><path d="M7 4l1.8 20.3L16 27l7.2-2.7L25 4H7zm14.5 6H12l.3 3h8.9l-.9 9.5L16 24l-4.3-1.5-.3-3.3h2.9l.15 1.7L16 22l1.55-.6.15-2.4H11.5L10.7 10h10.8l-.3 3h-7.7l.15 1.5h7.4l-.75 8.5z" fill="#fff"/></svg>`,

  CSS3: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#1572B6"/><path d="M7 4l1.8 20.3L16 27l7.2-2.7L25 4H7zm13 14.5l-.3 3.5L16 23l-3.7-1-.25-2.8h2.8l.13 1.4L16 21l.97-.4.1-1.1H11.8l-.7-8h9.8l-.25 2.5h-7l.15 1.5h6.7l-.45 5z" fill="#fff"/></svg>`,

  'React.js': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#20232A"/><circle cx="16" cy="16" r="2.5" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" fill="none"/><ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/></svg>`,

  'Next.js 14': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#000"/><path d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11c3.04 0 5.79-1.23 7.78-3.22L13 13v9H11V10h2l9.5 13.1A10.96 10.96 0 0027 16c0-6.075-4.925-11-11-11z" fill="#fff"/><rect x="19" y="10" width="2" height="9" fill="#fff"/></svg>`,

  'Tailwind CSS': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#0F172A"/><path d="M16 8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.56.9 2.28 1.64C17.67 13.9 19.1 15.4 22 15.4c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.56-.9-2.28-1.64C20.33 9.5 18.9 8 16 8zM10 16.6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.56.9 2.28 1.64C11.67 22.5 13.1 24 16 24c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.56-.9-2.28-1.64C14.33 18.1 12.9 16.6 10 16.6z" fill="#38BDF8"/></svg>`,

  'Node.js': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#1a1a1a"/><path d="M16 4L5 10v12l11 6 11-6V10L16 4zm0 2.3l8.7 5-8.7 5-8.7-5 8.7-5zM7 12.1l8 4.6v9.2l-8-4.6v-9.2zm10 13.8v-9.2l8-4.6v9.2l-8 4.6z" fill="#539E43"/></svg>`,

  'Express.js': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#000"/><text x="4" y="21" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#fff">express</text></svg>`,

  'RESTful APIs': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#6366F1"/><path d="M8 16h16M16 8l8 8-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,

  'MERN Stack': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#20232A"/><text x="5" y="20" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#61DAFB">MERN</text></svg>`,

  PostgreSQL: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#336791"/><ellipse cx="16" cy="12" rx="7" ry="4" fill="#fff" fillOpacity=".9"/><path d="M9 12v8c0 2.2 3.13 4 7 4s7-1.8 7-4v-8c0 2.2-3.13 4-7 4s-7-1.8-7-4z" fill="#fff" fillOpacity=".6"/></svg>`,

  Firebase: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#1C1C1C"/><path d="M8 24l4.5-14 3.5 6.5L19 10l5 14H8z" fill="#FFA000"/><path d="M8 24l4.5-14 3.5 6.5L8 24z" fill="#F57F17"/><path d="M16 16.5L19 10l5 14-8-7.5z" fill="#FFCA28"/></svg>`,

  AWS: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#232F3E"/><path d="M10 18.5c-2.2-.8-3.5-2.5-3.5-4.5 0-2.5 2-4.5 4.5-4.5.4 0 .8.05 1.2.15C13 8.1 14.9 7 17 7c3.3 0 6 2.7 6 6 0 .2 0 .4-.02.6C24.2 14.2 25 15.5 25 17c0 2.2-1.8 4-4 4H11c-.35 0-.68-.05-1-.15z" fill="#FF9900"/><path d="M9 23.5l1.5-1 1.5 1-1.5 1-1.5-1zM13 23.5l1.5-1 1.5 1-1.5 1-1.5-1zM17 23.5l1.5-1 1.5 1-1.5 1-1.5-1zM21 23.5l1.5-1 1.5 1-1.5 1-1.5-1z" fill="#FF9900"/></svg>`,

  Vercel: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#000"/><path d="M16 7L28 25H4L16 7z" fill="#fff"/></svg>`,

  Netlify: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#00AD9F"/><path d="M12 10h8v2h-3v10h-2V12h-3V10zM9 16l3-3v6l-3-3zM23 16l-3-3v6l3-3z" fill="#fff"/></svg>`,

  'Git / GitHub': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#24292E"/><path d="M16 4C9.37 4 4 9.37 4 16c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C24.56 25.8 28 21.3 28 16c0-6.63-5.37-12-12-12z" fill="#fff"/></svg>`,

  'PWA': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#5A0FC8"/><text x="4" y="21" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#fff">PWA</text></svg>`,

  'Responsive Web Design': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#0EA5E9"/><rect x="5" y="8" width="22" height="14" rx="2" stroke="#fff" strokeWidth="1.5" fill="none"/><rect x="13" y="22" width="6" height="3" rx="1" fill="#fff"/><rect x="10" y="25" width="12" height="1.5" rx=".75" fill="#fff"/></svg>`,

  'System Architecture': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#7C3AED"/><rect x="13" y="6" width="6" height="5" rx="1" fill="#fff"/><rect x="6" y="21" width="6" height="5" rx="1" fill="#fff"/><rect x="20" y="21" width="6" height="5" rx="1" fill="#fff"/><path d="M16 11v4M16 15l-7 6M16 15l7 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>`,

  'Full-Stack Development': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#059669"/><path d="M10 12l-4 4 4 4M22 12l4 4-4 4M18 9l-4 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,

  'Technical SEO': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#EA580C"/><circle cx="14" cy="14" r="6" stroke="#fff" strokeWidth="2" fill="none"/><path d="M19 19l5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>`,

  'API Integration': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#0284C7"/><path d="M8 16h4m8 0h4M16 8v4m0 8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="16" r="3" fill="#fff"/></svg>`,

  'E-commerce': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#16A34A"/><path d="M6 8h3l2 10h12l2-8H11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="14" cy="24" r="1.5" fill="#fff"/><circle cx="20" cy="24" r="1.5" fill="#fff"/></svg>`,

  'ERP Systems': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#B45309"/><rect x="6" y="8" width="8" height="7" rx="1" fill="#fff" fillOpacity=".9"/><rect x="18" y="8" width="8" height="7" rx="1" fill="#fff" fillOpacity=".9"/><rect x="6" y="18" width="8" height="7" rx="1" fill="#fff" fillOpacity=".9"/><rect x="18" y="18" width="8" height="7" rx="1" fill="#fff" fillOpacity=".9"/></svg>`,

  'Bilingual Apps (English/Urdu)': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#7C3AED"/><text x="5" y="14" fontFamily="Arial" fontSize="8" fill="#fff">EN</text><text x="17" y="14" fontFamily="Arial" fontSize="8" fill="#fff" opacity=".7">اردو</text><path d="M6 18h20" stroke="#fff" strokeWidth="1" opacity=".4"/><text x="8" y="26" fontFamily="Arial" fontSize="7" fill="#fff" opacity=".8">Bilingual</text></svg>`,
};

export const skillCategories = [
  {
    id: 1,
    title: 'Languages',
    icon: '{ }',
    skills: ['JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    id: 2,
    title: 'Frontend',
    icon: '◈',
    skills: ['React.js', 'Next.js 14', 'Responsive Web Design', 'PWA', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'Backend',
    icon: '⚙',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'System Architecture', 'MERN Stack'],
  },
  {
    id: 4,
    title: 'Databases & Cloud',
    icon: '☁',
    skills: ['PostgreSQL', 'Firebase', 'AWS', 'Vercel', 'Netlify', 'Git / GitHub'],
  },
  {
    id: 5,
    title: 'Specialties',
    icon: '★',
    skills: [
      'Full-Stack Development',
      'Technical SEO',
      'API Integration',
      'E-commerce',
      'ERP Systems',
      'Bilingual Apps (English/Urdu)',
    ],
  },
];

export const topSkills = [
  { name: 'Next.js', level: 90 },
  { name: 'React.js', level: 88 },
  { name: 'Node.js', level: 82 },
  { name: 'TypeScript', level: 80 },
  { name: 'Firebase', level: 75 },
];

export { logos };

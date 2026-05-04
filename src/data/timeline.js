// Inline SVG logos for organizations
export const orgLogos = {
  'Air University': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#1a237e"/>
    <path d="M24 8L10 20v4h4v12h6v-8h8v8h6V24h4v-4L24 8z" fill="#fff"/>
    <circle cx="24" cy="18" r="3" fill="#FFD700"/>
    <path d="M18 36h12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
  </svg>`,

  'Punjab Group of Colleges': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#006400"/>
    <rect x="10" y="14" width="28" height="4" rx="2" fill="#fff"/>
    <rect x="10" y="22" width="20" height="4" rx="2" fill="#fff"/>
    <rect x="10" y="30" width="24" height="4" rx="2" fill="#FFD700"/>
    <circle cx="36" cy="32" r="5" fill="#FFD700"/>
    <path d="M34 32l1.5 1.5L38 30" stroke="#006400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>`,

  'Elixir High School Multan': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#7B1FA2"/>
    <path d="M24 10l-12 8v4h4v14h6v-8h4v8h6V22h4v-4L24 10z" fill="#fff" fillOpacity=".9"/>
    <circle cx="24" cy="16" r="2.5" fill="#FFD700"/>
  </svg>`,

  'Arcture Technologies': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#0F172A"/>
    <path d="M24 10L12 36h6l2-5h8l2 5h6L24 10zm0 8l3 8h-6l3-8z" fill="#00e5ff"/>
    <circle cx="24" cy="10" r="2.5" fill="#8b5cf6"/>
  </svg>`,

  'Fiverr': `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#1DBF73"/>
    <circle cx="34" cy="16" r="3.5" fill="#fff"/>
    <path d="M12 36V22H9v-5h3v-1.5C12 11 14.5 9 18.5 9c1.2 0 2.2.2 3 .5v5c-.6-.2-1.2-.3-1.8-.3-1.5 0-2.2.7-2.2 2.3v.5H22v5h-4.5V36H12zM25 36V22h5.5V36H25z" fill="#fff"/>
  </svg>`,
};

export const timeline = [
  {
    type: 'work',
    period: 'Jan 2025 – Present',
    title: 'Software Engineer',
    organization: 'Arcture Technologies',
    orgUrl: 'https://arcturetechnologies.com',
    location: 'UAE · Remote',
    description:
      'Working as a Software Engineer building scalable web applications, ERP systems, and digital products. Led development of KametiPro and contributed to multiple client projects across e-commerce, SaaS, and business automation.',
    tags: ['Next.js', 'React', 'Firebase', 'Node.js', 'ERP'],
    color: '#00e5ff',
    logo: orgLogos['Arcture Technologies'],
  },
  {
    type: 'education',
    period: 'Sep 2023 – Jun 2027',
    title: 'Bachelor of Science — Computer Science',
    organization: 'Air University',
    orgUrl: 'https://www.au.edu.pk',
    location: 'Islamabad, Pakistan',
    description:
      'Pursuing BS Computer Science with focus on software engineering, data structures, algorithms, databases, and full-stack development. Currently in 6th semester.',
    tags: ['Computer Science', 'Software Engineering', 'Algorithms'],
    color: '#6366f1',
    logo: orgLogos['Air University'],
  },
  {
    type: 'education',
    period: 'Nov 2021 – May 2023',
    title: 'Intermediate — Computer Science (ICS)',
    organization: 'Punjab Group of Colleges',
    orgUrl: 'https://pgc.edu',
    location: 'Pakistan',
    description:
      'Completed Intermediate in Computer Science with distinction. Studied programming fundamentals, mathematics, and physics.',
    tags: ['ICS', 'Programming', 'Mathematics'],
    color: '#10b981',
    logo: orgLogos['Punjab Group of Colleges'],
  },
  {
    type: 'education',
    period: 'Sep 2019 – Oct 2021',
    title: 'Matriculation — General Science',
    organization: 'Elixir High School Multan',
    orgUrl: null,
    location: 'Multan, Pakistan',
    description:
      'Completed Matriculation in General Science. Built a strong foundation in mathematics, physics, chemistry, and biology.',
    tags: ['General Science', 'Mathematics', 'Physics'],
    color: '#f59e0b',
    logo: orgLogos['Elixir High School Multan'],
  },
];

import { sitePath } from './site-path';

export const profile = {
  name: 'Japhet Adjei Adjetey',
  email: 'adjetadjetey45@gmail.com',
  github: 'https://github.com/Remedy1995',
  location: 'Accra, Ghana',
  cv: sitePath('/documents/Japhet_Adjetey_CV.docx'),
};

export const experience = [
  {
    company: 'Stratr Co.',
    role: 'Full-stack Software Engineer',
    current: true,
    description: 'AI-integrated SaaS platforms with Django, TypeScript, and PostgreSQL. MCP interfaces, secure authentication, multi-tenant architectures, and distributed caching.',
  },
  {
    company: 'Prudential',
    role: 'Software Engineer',
    current: false,
    description: 'Distributed backend services, OCR and AI-assisted automation, secure payment workflows, and containerised microservices.',
  },
  {
    company: 'AI for Marketing',
    role: 'Course Instructor',
    current: false,
    description: 'Designed and delivered a 10-module, 46-hour curriculum with practical labs and an applied AI workbook.',
  },
];

export type Project = {
  id: string; number: string; name: string; category: string;
  platforms: ('Web' | 'Mobile')[]; theme: string; image: string;
  width: number; height: number; description: string; features: string[];
  context: string; href: string; contribution: string; role?: string; video?: boolean;
};

export const projects: Project[] = [
  { id: 'parentfully', number: '01', name: 'Parentfully', category: 'Web · Mobile · APIs', platforms: ['Web','Mobile'], theme: 'parentfully', image: '/images/parentfully-mobile.webp', width: 1449, height: 2655, description: 'A family platform bringing child profiles, routines, goals, and everyday coordination together.', features: ['Web development','Mobile features','API development'], context: 'A family platform bringing child profiles, routines, goals, and shared family tools together.', href: '/work/parentfully/', contribution: 'Web features, mobile features, and API development.', role: 'Full-stack Software Engineer' },
  { id: 'schoolpilot', number: '02', name: 'SchoolPilot', category: 'Education platform', platforms: ['Web'], theme: 'blue', image: '/images/schoolpilot-admin.webp', width: 2000, height: 1250, description: 'A shared workspace for school administration, academic structures, people, and financial processes.', features: ['School operations','AI & MCP','Tenant access'], context: '', href: '/work/schoolpilot/', contribution: 'Multi-tenant architecture, MCP integration, and role-based access.', role: 'Full-stack Software Engineer' },
  { id: 'theovision', number: '03', name: 'Theovision International', category: 'Donor & operations platform', platforms: ['Web'], theme: 'theovision', image: '/images/theovision-dashboard.webp', width: 2000, height: 1132, description: 'A workspace connecting donor information, programmes, communication, finance, and reporting.', features: ['Donor management','Reporting','Administration'], context: '', href: '/work/theovision/', contribution: 'Full-stack development for donor and operational workflows.', role: 'Full-stack Software Engineer', video: true },
  { id: 'rmu', number: '04', name: 'RMU Welfare Fund', category: 'Web application', platforms: ['Web'], theme: 'blue', image: '/images/loan-app.webp', width: 1440, height: 656, description: 'A staff welfare portal bringing loan applications, member information, and approval workflows into one place.', features: ['Member dashboard', 'Loan applications', 'Approval workflows'], context: 'A web application for the Regional Maritime University welfare fund. The dashboard brings together benefits, loans, member tools, and welfare news.', href: '/work/rmu/', contribution: 'Web application development for member and loan workflows.', role: 'Full-stack Software Engineer' },
  { id: 'handyman', number: '05', name: 'Handy Man', category: 'Mobile application', platforms: ['Mobile'], theme: 'lavender', image: '/images/handyman-home.webp', width: 486, height: 842, description: 'A mobile product for discovering services and managing bookings, history, wallet, and account details.', features: ['Service discovery', 'Booking navigation', 'Account management'], context: 'A mobile application organised around services, bookings, history, wallet, and account settings.', href: '/work/handyman/', contribution: 'Mobile application development for service discovery and bookings.', role: 'Full-stack Software Engineer' },
];

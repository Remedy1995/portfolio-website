import type { Metadata } from 'next';
import Image from '@/components/site-image';
import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { SchoolPilot } from '@/components/schoolpilot';

export const metadata: Metadata = {
  title: 'SchoolPilot — Full-stack engineering · Japhet Adjetey',
  description: 'A multi-tenant school platform with AI and MCP workflows, asynchronous processing, caching, and role-based access.',
};

export default function SchoolPilotPage() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation/>
    <main id="main" className="case-main">
      <section className="case-hero container">
        <Link className="text-link" href="/#work"><ArrowLeft size={17}/> Back to selected work</Link>
        <div className="case-title"><div><p className="eyebrow">EDUCATION / WEB PLATFORM / AI SYSTEMS</p><h1>SchoolPilot</h1><p>School operations and AI workflows,<br/>built on a shared tenant-aware platform.</p></div><span className="case-symbol"><GraduationCap strokeWidth={1} size={90}/></span></div>
        <div className="case-meta"><div><span>MY ROLE</span><strong>Full-stack Software Engineer</strong></div><div><span>PRODUCT</span><strong>Multi-tenant education platform</strong></div><div><span>ENGINEERING SCOPE</span><strong>Web · AI & MCP · Access control</strong></div></div>
      </section>
      <section className="case-gallery container"><SchoolPilot detail/></section>
      <section className="case-story container">
        <div className="case-chapter"><p className="eyebrow">01 / THE PRODUCT</p><div><h2>Bring school operations<br/>into one workspace.</h2><p>SchoolPilot (LongEdu) connects academic structures, people, and financial processes. The interface provides a shared starting point for managing years, classes, subjects, departments, students, and teachers.</p><p>My work spans the web experience and the underlying multi-tenant system, including natural-language access to institutional data through large language models and the Model Context Protocol.</p></div></div>
        <div className="case-chapter"><p className="eyebrow">02 / ENGINEERING DECISIONS</p><div><h2>The interface is one layer.<br/>The architecture supports it.</h2><div className="case-insights"><article><span>01</span><h3>Tenant-aware access</h3><p>I implemented role-based access control across tenants, supporting separate institutions on a shared platform.</p></article><article><span>02</span><h3>Natural-language workflows</h3><p>I integrated LLMs through MCP so users can interact with institutional data through natural language.</p></article><article><span>03</span><h3>Asynchronous processing</h3><p>I built task processing and caching infrastructure to support responsive AI workflows and avoid repeated work.</p></article></div><div className="engineering-scope"><span>IMPLEMENTED SCOPE</span><p>Multi-tenant architecture · Role-based permissions · MCP interfaces · Asynchronous tasks · Caching</p></div></div></div>
        <div className="case-chapter"><p className="eyebrow">03 / PRODUCT WORKFLOWS</p><div><h2>Make setup visible.<br/>Keep the next action clear.</h2><p>The administration workspace groups planning, structure, curriculum, and people into named modules. Setup progress communicates what has been configured, while summary counts and persistent navigation help users keep their place.</p></div></div>
        <figure className="case-figure"><Image src="/images/schoolpilot-admin.webp" alt="SchoolPilot administration with setup progress, summary cards, and management modules" width={2000} height={1250}/><figcaption>Administration workspace · school structure, people, curriculum, and finance</figcaption></figure>
        <div className="case-chapter"><p className="eyebrow">04 / ACCESS & INTRODUCTION</p><div><h2>Connect the public website<br/>to the operational experience.</h2><p>The product website introduces the platform. Sign-in separates returning-user access from school registration and keeps account recovery close to the password field.</p></div></div>
        <div className="case-pair"><figure><Image src="/images/schoolpilot-website.webp" alt="SchoolPilot product website" width={2000} height={1250}/><figcaption><span>PUBLIC WEBSITE</span>The platform’s introduction and entry points.</figcaption></figure><figure><Image src="/images/schoolpilot-login.webp" alt="SchoolPilot sign-in screen" width={2000} height={1250}/><figcaption><span>ACCOUNT ACCESS</span>Sign-in, registration, and account recovery.</figcaption></figure></div>
      </section>
      <section className="case-next container"><p className="eyebrow">BUILDING A PLATFORM WITH COMPLEX WORKFLOWS?</p><h2>Let’s talk about<br/>the product and the system.</h2><Link className="button primary" href="/contact/">Discuss your project</Link><Link href="/#work" className="text-link">Back to all work</Link></section>
    </main>
    <footer className="container footer"><Link className="wordmark" href="/">japhet adjetey.</Link><p>© {new Date().getFullYear()} Japhet Adjei Adjetey</p></footer>
  </>;
}

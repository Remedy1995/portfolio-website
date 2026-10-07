import Image from '@/components/site-image';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap } from 'lucide-react';

export function ProjectSpotlight() {
  return <article className="intro-spotlight" aria-labelledby="spotlight-title">
    <div className="spotlight-copy">
      <p className="spotlight-eyebrow">FEATURED PROJECT <span aria-hidden="true">/</span> EDUCATION</p>
      <div className="spotlight-heading">
        <span className="spotlight-icon" aria-hidden="true"><GraduationCap size={25} strokeWidth={1.7}/></span>
        <h2 id="spotlight-title">SchoolPilot</h2>
      </div>
      <p className="spotlight-description">School operations, connected.<br/>From administration to AI-assisted workflows.</p>
    </div>
    <figure className="spotlight-preview">
      <div className="spotlight-screen"><Image src="/images/schoolpilot-admin.webp" alt="SchoolPilot administration preview with setup progress, school summary cards, and management modules" width={2000} height={1250} sizes="(max-width: 900px) 800px, 650px" preload /></div>
      <figcaption>Administration workspace</figcaption>
    </figure>
    <div className="spotlight-details">
      <ul className="spotlight-scope" aria-label="Engineering scope"><li>Multi-tenant architecture</li><li>AI & MCP</li><li>Role-based access</li></ul>
      <Link className="spotlight-case-link" href="/work/schoolpilot/" aria-label="Read the SchoolPilot case study"><span>Read case study</span><ArrowUpRight size={20} aria-hidden="true"/></Link>
    </div>
  </article>;
}

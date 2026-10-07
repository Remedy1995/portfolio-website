import type { Metadata } from 'next';
import Image from '@/components/site-image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Landmark } from 'lucide-react';
import { Navigation } from '@/components/navigation';

export const metadata: Metadata = {
  title: 'RMU Welfare Fund — Full-stack engineering · Japhet Adjetey',
  description: 'A staff welfare portal for member information, loan applications, and approval workflows.',
};

export default function RmuPage() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation/>
    <main id="main" className="case-main">
      <section className="case-hero container"><Link className="text-link" href="/#work"><ArrowLeft size={17}/> Back to selected work</Link><div className="case-title"><div><p className="eyebrow">CASE STUDY / STAFF WELFARE PORTAL</p><h1>RMU Welfare Fund</h1><p>Member services.<br/><em>In one clear place.</em></p></div><span className="case-symbol"><Landmark size={90} strokeWidth={1}/></span></div><div className="case-meta"><div><span>MY ROLE</span><strong>Full-stack Software Engineer</strong></div><div><span>PRODUCT</span><strong>Staff welfare web application</strong></div><div><span>BUILD FOCUS</span><strong>Member tools · Loans · Approvals</strong></div></div></section>
      <section className="case-story container"><div className="case-chapter"><p className="eyebrow">01 / THE BRIEF</p><div><h2>Bring member services<br/><em>into the same workflow.</em></h2><p>RMU Welfare Fund is a staff-facing portal for benefits, loans, member tools, and welfare news. The product brings information and tasks that can otherwise live in separate processes into one web experience.</p></div></div><figure className="case-figure"><Image src="/images/loan-app.webp" alt="RMU Welfare Fund member portal showing loan and member-service tools" width={1440} height={656}/><figcaption>Member portal · welfare information and loan services in one workspace</figcaption></figure><div className="case-chapter"><p className="eyebrow">02 / BUILD FOCUS</p><div><h2>Make routine work<br/><em>easy to find and act on.</em></h2><div className="case-insights"><article><span>01</span><h3>Member information</h3><p>A clear place to view welfare-related information and available services.</p></article><article><span>02</span><h3>Loan applications</h3><p>A dedicated flow for initiating and following loan-related tasks.</p></article><article><span>03</span><h3>Approval workflows</h3><p>Structured pathways for handling review and member-service decisions.</p></article></div></div></div></section>
      <section className="case-next container"><p className="eyebrow">BUILDING A MEMBER PLATFORM?</p><h2>Make the next step<br/><em>clearer for everyone.</em></h2><Link className="button primary" href="/contact/">Discuss your project <ArrowUpRight size={18}/></Link><Link href="/#work" className="text-link">Back to all work <ArrowUpRight size={18}/></Link></section>
    </main><footer className="container footer"><Link className="wordmark" href="/">japhet adjetey.</Link><p>© {new Date().getFullYear()} Japhet Adjei Adjetey</p></footer>
  </>;
}

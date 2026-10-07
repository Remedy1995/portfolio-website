import type { Metadata } from 'next';
import Image from '@/components/site-image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, HeartHandshake } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { ProjectVideo } from '@/components/project-video';

export const metadata: Metadata = {
  title: 'Theovision — Full-stack engineering · Japhet Adjetey',
  description: 'Theovision International project: donor management, programme oversight, reporting, and administration. View screenshots and a product walkthrough.',
};

export default function TheovisionPage() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation/>
    <main id="main" className="case-main theovision-case">
      <section className="case-hero container">
        <Link className="text-link" href="/#work"><ArrowLeft size={17}/> Back to selected work</Link>
        <div className="case-title"><div><p className="eyebrow">PROJECT OVERVIEW / NONPROFIT OPERATIONS</p><h1>Theovision</h1><p>The people behind the mission.<br/><em>The systems that support them.</em></p></div><span className="case-symbol"><HeartHandshake size={90} strokeWidth={1}/></span></div>
        <div className="case-meta"><div><span>ORGANISATION</span><strong>Theovision International</strong></div><div><span>MY ROLE</span><strong>Full-stack Software Engineer</strong></div><div><span>PRODUCT</span><strong>Donor & operations platform</strong></div></div>
      </section>
      <section className="container theovision-walkthrough" id="walkthrough" aria-labelledby="walkthrough-title"><div className="walkthrough-heading"><p className="eyebrow">SEE THE PRODUCT IN MOTION</p><h2 id="walkthrough-title">A closer look <em>at the work.</em></h2></div><ProjectVideo/></section>
      <section className="case-story container">
        <div className="case-chapter"><p className="eyebrow">01 / THE PRODUCT</p><div><h2>Keep the mission moving.<br/><em>Keep the work connected.</em></h2><p>Theovision brings donor information, programmes, communications, finance, automation, and reporting into a shared administration interface. Office selection and persistent navigation keep the workspace organised as users move between responsibilities.</p><p>I worked on this project as a Full-stack Software Engineer. The screenshots and walkthrough below show the application’s overview, sign-in experience, and operational modules.</p></div></div>
        <div className="case-chapter"><p className="eyebrow">02 / THE WORKSPACE</p><div><h2>From an overview<br/><em>to the next action.</em></h2><div className="case-insights"><article><span>01</span><h3>Operational visibility</h3><p>The overview groups donations, programme counts, targets, and reporting controls in one workspace.</p></article><article><span>02</span><h3>Donor relationships</h3><p>The donor database separates individuals and groups, with filters and access to archived records.</p></article><article><span>03</span><h3>Administration</h3><p>Settings bring together user management, permissions, application settings, and office management.</p></article></div></div></div>
        <figure className="case-figure theovision-figure"><Image src="/images/theovision-dashboard.webp" alt="Theovision overview with donation metrics, programme counts, office selection, and reporting controls" width={2000} height={1132}/><figcaption>Overview · donations, programmes, targets, and office context</figcaption></figure>
        <div className="case-chapter"><p className="eyebrow">03 / ACCOUNT ACCESS</p><div><h2>A focused entry point.<br/><em>A consistent identity.</em></h2><p>The sign-in screen carries Theovision’s purple identity into a simple account-access flow, with email and password fields, password visibility, and account recovery.</p></div></div>
        <figure className="case-figure theovision-figure"><Image src="/images/theovision-login.webp" alt="Theovision International sign-in screen with email, password, and password recovery" width={2000} height={1133}/><figcaption>Account access · sign-in and password recovery</figcaption></figure>
      </section>
      <section className="case-next container"><p className="eyebrow">BUILDING AN OPERATIONS PLATFORM?</p><h2>Let’s make the complex<br/><em>feel connected.</em></h2><Link className="button primary" href="/contact/">Discuss your project <ArrowUpRight size={18}/></Link><Link href="/#work" className="text-link">Back to all work <ArrowUpRight size={18}/></Link></section>
    </main><footer className="container footer"><Link className="wordmark" href="/">japhet adjetey.</Link><p>© {new Date().getFullYear()} Japhet Adjei Adjetey</p></footer></>;
}

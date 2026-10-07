import type { Metadata } from 'next';
import Image from '@/components/site-image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Wrench } from 'lucide-react';
import { Navigation } from '@/components/navigation';

export const metadata: Metadata = {
  title: 'Handy Man — Mobile product · Japhet Adjetey',
  description: 'A mobile product for service discovery, bookings, history, wallet, and account management.',
};

export default function HandyManPage() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation/>
    <main id="main" className="case-main">
      <section className="case-hero container"><Link className="text-link" href="/#work"><ArrowLeft size={17}/> Back to selected work</Link><div className="case-title"><div><p className="eyebrow">CASE STUDY / SERVICE MARKETPLACE</p><h1>Handy Man</h1><p>Services people need.<br/><em>Ready when they are.</em></p></div><span className="case-symbol"><Wrench size={90} strokeWidth={1}/></span></div><div className="case-meta"><div><span>MY ROLE</span><strong>Full-stack Software Engineer</strong></div><div><span>PRODUCT</span><strong>Mobile service experience</strong></div><div><span>BUILD FOCUS</span><strong>Discovery · Bookings · Accounts</strong></div></div></section>
      <section className="case-story container"><div className="case-chapter"><p className="eyebrow">01 / THE BRIEF</p><div><h2>Keep a service journey<br/><em>in one mobile flow.</em></h2><p>Handy Man is a mobile product for finding services and managing what happens after someone chooses one. It organises service discovery, bookings, history, wallet activity, and account settings into a focused mobile experience.</p></div></div><figure className="case-figure handy-figure"><Image src="/images/handyman-home.webp" alt="Handy Man mobile application home screen" width={486} height={842}/><figcaption>Mobile home · access to services, bookings, history, wallet, and account tools</figcaption></figure><div className="case-chapter"><p className="eyebrow">02 / BUILD FOCUS</p><div><h2>Let people move from<br/><em>need to next action.</em></h2><div className="case-insights"><article><span>01</span><h3>Service discovery</h3><p>A clear starting point for choosing a service.</p></article><article><span>02</span><h3>Booking navigation</h3><p>Dedicated areas for managing active and past bookings.</p></article><article><span>03</span><h3>Account management</h3><p>Wallet, history, and profile tools kept close to the primary journey.</p></article></div></div></div></section>
      <section className="case-next container"><p className="eyebrow">BUILDING A MOBILE PRODUCT?</p><h2>Let’s make every tap<br/><em>move the work forward.</em></h2><Link className="button primary" href="/contact/">Discuss your project <ArrowUpRight size={18}/></Link><Link href="/#work" className="text-link">Back to all work <ArrowUpRight size={18}/></Link></section>
    </main><footer className="container footer"><Link className="wordmark" href="/">japhet adjetey.</Link><p>© {new Date().getFullYear()} Japhet Adjei Adjetey</p></footer>
  </>;
}

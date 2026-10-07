import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Navigation } from '@/components/navigation';
import { profile } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact Japhet Adjetey — Full-stack Software Engineer',
  description: 'Start a conversation about a web platform, mobile product, API, integration, or product redesign.',
};

export default function ContactPage() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation/>
    <main id="main" className="contact-page">
      <section className="contact-page-hero container"><Link className="text-link" href="/"><ArrowLeft size={17}/> Back to portfolio</Link><div><p className="eyebrow">START A CONVERSATION</p><h1>Let’s talk about<br/><em>your project.</em></h1><p>Share what you’re building, who it’s for, and the part you need help with. A little context helps us start in the right place.</p></div></section>
      <section className="container contact-page-grid"><div className="contact-page-aside"><p className="eyebrow">WHAT I HELP BUILD</p><ul><li>Web platforms and internal tools</li><li>Mobile product experiences</li><li>APIs and system integrations</li><li>Product workflows that need simplification</li></ul><div><span>DIRECT EMAIL</span><a href={'mailto:'+profile.email}>{profile.email}<ArrowUpRight size={16}/></a></div></div><ContactForm/></section>
    </main>
    <footer className="container footer"><Link className="wordmark" href="/">japhet adjetey.</Link><p>© {new Date().getFullYear()} Japhet Adjei Adjetey</p></footer>
  </>;
}

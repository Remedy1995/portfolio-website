import Image from '@/components/site-image';
import Link from 'next/link';
import { Download, Code2, Layers3, Workflow, Smartphone } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Work } from '@/components/work';
import { ProjectSpotlight } from '@/components/project-spotlight';
import { CopyEmail } from '@/components/contact';
import { experience, profile } from '@/lib/content';

const capabilities = [
  { icon: Layers3, title: 'Product interfaces', text: 'Clear journeys, thoughtful interactions, and consistent interfaces for products with complex workflows.', tags: 'React · TypeScript · UI systems' },
  { icon: Code2, title: 'Backend engineering', text: 'Secure multi-tenant systems, business logic, and data models that support the whole product.', tags: 'Django · Node.js · PostgreSQL' },
  { icon: Smartphone, title: 'Mobile development', text: 'Web and mobile features connected through shared APIs, with navigation designed for everyday use.', tags: 'React Native · Mobile features' },
  { icon: Workflow, title: 'AI & integrations', text: 'LLM interfaces, asynchronous workflows, and integrations that bring separate systems together.', tags: 'MCP · Redis · Celery · REST' },
];

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Navigation />
    <main id="main" className="portfolio-main">
      <section id="home" className="intro container">
        <div className="intro-grid">
          <div className="intro-copy">
            <p className="kicker">JAPHET ADJEI ADJETEY <span>/</span> FULL-STACK SOFTWARE ENGINEER</p>
            <h1>Complex systems.<br/><span>Simple experiences.</span></h1>
            <p className="intro-description">I build web platforms, mobile products, and secure backend systems. My work connects product interfaces with the architecture, data, and AI workflows behind them.</p>
            <div className="intro-actions"><a className="button primary" href="#work">Explore my work</a><Link className="button secondary" href="/contact/">Discuss a project</Link></div>
            <div className="intro-person"><Image src="/images/japhet.webp" alt="Japhet Adjei Adjetey" width={56} height={56} priority /><div><strong>Currently building at Stratr Co.</strong><span>Accra, Ghana · Working with teams worldwide</span></div></div>
          </div>
          <ProjectSpotlight />
        </div>
        <dl className="proof-strip">
          <div><dt>Experience</dt><dd><strong>5+ years</strong><span>Across product & engineering</span></dd></div>
          <div><dt>Current role</dt><dd><strong>Stratr Co.</strong><span>Full-stack software engineer</span></dd></div>
          <div><dt>Previously</dt><dd><strong>Prudential</strong><span>Backend systems & automation</span></dd></div>
        </dl>
      </section>
      <section className="selected-work section-pad" id="work"><div className="container">
        <div className="portfolio-section-heading"><div><p className="kicker">01 / SELECTED WORK</p><h2>Products, built<br/>from the inside out.</h2></div><p>Explore the product, my contribution,<br/>and the engineering behind each build.</p></div>
        <Work />
        <div className="repository-row"><p>Want to see more of the code?</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="Explore Japhet’s repositories on GitHub, opens in a new tab">Explore GitHub <Code2 size={18}/></a></div>
      </div></section>
      <section className="engineering-section section-pad container" id="expertise">
        <div className="portfolio-section-heading"><div><p className="kicker">02 / ENGINEERING CAPABILITIES</p><h2>From the interface<br/>to the infrastructure.</h2></div><p>For new platforms, existing products,<br/>and systems that need to connect.</p></div>
        <div className="engineering-grid">{capabilities.map(({icon:Icon,title,text,tags},i)=><article className="engineering-capability" key={title}><div className="capability-index"><Icon size={25} strokeWidth={1.6}/><span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p><span className="engineering-tags">{tags}</span></article>)}</div>
      </section>
      <section className="career-section section-pad" id="about"><div className="container career-grid">
        <div className="career-intro"><p className="kicker">03 / EXPERIENCE & APPROACH</p><h2>A builder who sees<br/>the whole picture.</h2><p>Over five years in software engineering, from secure backend services and AI-assisted automation to web and mobile experiences.</p><p>I care about the details people interact with and the systems they rely on.</p><div className="career-person"><Image src="/images/japhet.webp" alt="Japhet Adjei Adjetey" width={88} height={104}/><div><strong>Japhet Adjei Adjetey</strong><span>Full-stack software engineer</span><span>Accra, Ghana</span></div></div><a className="button secondary cv-button" href={profile.cv} download><Download size={17}/> Download CV <span>DOCX</span></a><div className="career-education"><span>EDUCATION</span><strong>B.Sc. Computer Science</strong><p>Accra Technical University · CGPA 3.85 / 4.0</p></div></div>
        <div className="career-history">{experience.map((item,i)=><article key={item.company}><div className="career-role"><span className="career-index">0{i+1}</span><div><h3>{item.company}</h3><span>{item.role}</span></div>{item.current&&<span className="current-role">Current role</span>}</div><p>{item.description}</p></article>)}</div>
      </div></section>
      <section className="project-contact section-pad" id="contact"><div className="container project-contact-grid"><div><p className="kicker">LET’S BUILD SOMETHING USEFUL</p><h2>Your next product<br/>starts with a conversation.</h2><p>Tell me what you’re building, who it’s for, and where you need help.</p><Link className="button primary" href="/contact/">Tell me about your project</Link></div><div className="project-contact-details"><span>GET IN TOUCH</span><div className="contact-email"><a href={'mailto:'+profile.email}>{profile.email}</a><CopyEmail/></div><p>Web platforms · Mobile products · APIs</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div></div></section>
    </main>
    <footer className="footer container"><a className="wordmark" href="#home">japhet adjetey.</a><p>© {new Date().getFullYear()} Japhet Adjei Adjetey</p><a href="#home">Back to top</a></footer>
  </>;
}

import Image from '@/components/site-image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { projects } from '@/lib/content';

export function Work() {
  return <div className="work-grid">
    {projects.map(project => <article className={'work-card work-' + project.id} key={project.id}>
      <Link className="work-card-link" href={project.href} aria-label={'Explore the ' + project.name + ' project'}>
        <div className="work-image-stage">
          <span className="work-category">{project.category}</span>
          <div className="work-image-frame"><Image src={project.image} alt={project.name + ' application interface'} width={project.width} height={project.height} sizes="(max-width: 760px) 90vw, 45vw" loading="lazy" /></div>
          {project.video&&<span className="work-video-label"><Play size={14} aria-hidden="true"/> 30-second walkthrough</span>}
          {(project.id==='parentfully'||project.id==='handyman')&&<div className="work-mobile-note"><span>{project.id==='parentfully'?'Web. Mobile. Connected.':'Services, within reach.'}</span><p>{project.id==='parentfully'?'Family tools across screens.':'A focused mobile journey.'}</p></div>}
        </div>
        <div className="work-card-body"><div className="work-card-heading"><h3>{project.name}</h3><span>{project.number}</span></div><p>{project.description}</p><div className="work-contribution"><span>MY CONTRIBUTION</span><p>{project.contribution}</p></div><div className="work-card-footer"><span>{project.role}</span><strong>Read case study</strong></div></div>
      </Link>
    </article>)}
  </div>;
}

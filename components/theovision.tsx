import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { ProjectVideo } from '@/components/project-video';

export function Theovision() {
  return <article className="theovision-feature" aria-labelledby="theovision-heading">
    <div className="theovision-copy">
      <p className="eyebrow">RECENT PROJECT / NONPROFIT OPERATIONS</p>
      <h3 id="theovision-heading">Theovision<span>International</span></h3>
      <p>Donors, programmes, and financial oversight. A connected workspace for the people behind the mission.</p>
      <div className="project-role"><span>MY ROLE</span><strong>Full-stack Software Engineer</strong></div>
      <Link className="text-link" href="/work/theovision/">Explore the project <ArrowUpRight size={18}/></Link>
      <span className="watch-hint"><Play size={15}/> Watch the product in action</span>
    </div>
    <ProjectVideo/>
  </article>;
}

'use client';
import Image from '@/components/site-image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRight, GraduationCap, Maximize2, X } from 'lucide-react';
export const schoolScreens = [
  { id: 'admin', label: 'Administration', image: '/images/schoolpilot-admin.webp', title: 'A school’s operations, in one workspace.', caption: 'Academic years, classes, subjects, staff, students, and finance — organised around the work administrators need to do.' },
  { id: 'login', label: 'Sign-in experience', image: '/images/schoolpilot-login.webp', title: 'A clear way into the product.', caption: 'A dedicated sign-in experience with account recovery and a separate path for school registration.' },
  { id: 'website', label: 'Product website', image: '/images/schoolpilot-website.webp', title: 'The product story starts before sign-in.', caption: 'A public-facing website introducing the platform, with entry points to explore the product and book a demonstration.' },
];
export function SchoolPilot({detail = false}:{detail?:boolean}) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const screen = schoolScreens[active];
  return <article className={'featured-project ' + (detail ? 'detail-gallery' : '')}>
    {!detail && <div className="featured-info"><div className="featured-name"><span className="school-icon"><GraduationCap size={27}/></span><div><span className="eyebrow">FEATURED PROJECT · EDUCATION</span><h3>SchoolPilot</h3></div></div><p>A connected experience for<br/>modern school management.</p><Link className="button dark-button" href="/work/schoolpilot/">Explore the project <ArrowUpRight size={18}/></Link></div>}
    <div className="school-stage"><div className="gallery-toolbar"><span className="gallery-label">A CLOSER LOOK</span><div className="screen-tabs" aria-label="Choose SchoolPilot screen">{schoolScreens.map((s,i)=><button key={s.id} onClick={()=>setActive(i)} aria-pressed={active===i}>{s.label}</button>)}</div><button className="expand-screen" aria-label={'Enlarge '+screen.label+' screenshot'} onClick={()=>dialog.current?.showModal()}><Maximize2 size={18}/></button></div><button className="school-screen" onClick={()=>dialog.current?.showModal()} aria-label={'Enlarge SchoolPilot '+screen.label}><Image key={screen.image} src={screen.image} alt={'SchoolPilot '+screen.label+' screenshot'} width={2000} height={1250} sizes="(max-width: 700px) 100vw, 1200px" loading="eager"/></button><div className="gallery-caption" aria-live="polite"><span className="gallery-index">0{active+1} / 03</span><div><strong>{screen.title}</strong><p>{screen.caption}</p></div></div></div>
    <dialog ref={dialog} className="image-dialog" aria-label={'SchoolPilot '+screen.label+' enlarged screenshot'} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><div><button className="dialog-close" onClick={()=>dialog.current?.close()} aria-label="Close screenshot"><X/></button><Image src={screen.image} alt={'Full SchoolPilot '+screen.label+' screenshot'} width={2000} height={1250}/><p>{screen.title}</p></div></dialog>
  </article>;
}

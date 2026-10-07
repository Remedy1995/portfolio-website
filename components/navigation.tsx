'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { sitePath } from '@/lib/site-path';
const links = [['Work', '#work'], ['Expertise', '#expertise'], ['About', '#about']] as const;
export function Navigation() {
  const [open,setOpen] = useState(false);
  const [active,setActive] = useState('');
  const pathname = usePathname();
  const prefix = pathname === '/' ? '' : sitePath('/');
  useEffect(()=>{
    const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',close);
    const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive('#'+entry.target.id)}, {rootMargin:'-15% 0px -55% 0px'});
    document.querySelectorAll('main>section[id]').forEach(el=>observer.observe(el));
    return ()=>{window.removeEventListener('keydown',close);observer.disconnect()};
  },[pathname]);
  return <header className="header"><div className="container nav-bar"><a className="wordmark" href={prefix+'#home'} aria-label="Japhet, home"><span className="monogram">ja</span>japhet adjetey<span className="brand-period">.</span></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(([name,href])=><a href={prefix+href} key={name} aria-current={active===href?'location':undefined}>{name}</a>)}</nav><Link className="nav-contact" href="/contact/">Let’s talk</Link><button className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>{open&&<nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...links.map(([name,href])=>[name,prefix+href] as const),['Contact',sitePath('/contact/')]].map(([name,href])=><a href={href} key={name} onClick={()=>setOpen(false)}>{name}</a>)}</nav>}</div></header>;
}

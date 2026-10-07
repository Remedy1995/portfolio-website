'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { profile } from '@/lib/content';
export function CopyEmail(){
  const [status, setStatus] = useState('');
  async function copy(){ try { await navigator.clipboard.writeText(profile.email); setStatus('Email copied'); } catch { setStatus('Please copy the email address above.'); } }
  return <div className="copy-wrap"><button className="copy-email" onClick={copy} aria-label="Copy email address">{status === 'Email copied' ? <Check size={18}/> : <Copy size={18}/>}</button><span className="copy-status" role="status">{status}</span></div>;
}

'use client';

import { FormEvent, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { profile } from '@/lib/content';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [status, setStatus] = useState('');
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    // Bots filling the hidden field should never reach the mail service.
    if (String(data.get('_honey') ?? '')) return;
    if (!String(data.get('name') ?? '').trim() || !String(data.get('message') ?? '').trim()) {
      setState('error');
      setStatus('Please add your name and a little detail about your project.');
      return;
    }
    sending.current = true;
    setState('sending');
    setStatus('Sending your enquiry…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const name = String(data.get('name') ?? '').trim();
      const email = String(data.get('email') ?? '').trim();
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          company: String(data.get('company') ?? '').trim() || 'Not provided',
          project: String(data.get('project') ?? ''),
          message: String(data.get('message') ?? '').trim(),
          _subject: `Portfolio enquiry from ${name}`,
          _replyto: email,
          _template: 'table',
          _honey: '',
          _url: window.location.href.split(/[?#]/)[0],
        }),
      });
      const result = await response.json();
      // Activation responses must not be presented as delivered enquiries.
      if (/activat|confirm.*email|verify.*email/i.test(String(result.message ?? ''))) {
        setState('error');
        setStatus('The contact service is awaiting email verification. Please use the direct email link below for now. Your details are still here.');
        return;
      }
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Submission was not accepted');
      }
      form.reset();
      setState('success');
      setStatus('Thank you — your enquiry has been submitted. I’ll reply to the email address you provided.');
    } catch {
      setState('error');
      setStatus('We couldn’t confirm your submission. Your details are still here; please try again or email me directly.');
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }

  return <form className="contact-form" onSubmit={submit} aria-busy={state === 'sending'}>
    <fieldset className="contact-fields" disabled={state === 'sending'}>
      <legend className="sr-only">Project enquiry</legend>
      <div className="form-row">
        <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" maxLength={120} required /></div>
        <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required /></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="company">Company or team <span>Optional</span></label><input id="company" name="company" autoComplete="organization" maxLength={160} /></div>
        <div className="form-field"><label htmlFor="project">What do you need?</label><select id="project" name="project" defaultValue="" required><option value="" disabled>Select one</option><option>Web platform</option><option>Mobile product</option><option>API or integration</option><option>Product redesign</option><option>Something else</option></select></div>
      </div>
      <div className="form-field"><label htmlFor="message">Tell me about the work</label><textarea id="message" name="message" rows={7} maxLength={5000} placeholder="What are you trying to improve or build?" required /></div>
      <div hidden aria-hidden="true"><label htmlFor="website">Leave this blank</label><input id="website" name="_honey" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-action"><button className="button primary" type="submit">{state === 'sending' ? <>Sending… <LoaderCircle className="form-spinner" size={18}/></> : <>Send enquiry <ArrowUpRight size={18}/></>}</button></div>
    </fieldset>
    <p className="form-privacy">Your details are processed by <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">FormSubmit</a> and emailed to me to respond to your enquiry.</p>
    <div className={`form-status form-status-${state}`} role="status" aria-live="polite" aria-atomic="true">{state === 'success' && <CheckCircle2 size={18} aria-hidden="true"/>}<p>{status}</p></div>
    {state === 'error' && <a className="form-email-fallback" href={`mailto:${profile.email}`}>Email {profile.email} <ArrowUpRight size={15}/></a>}
  </form>;
}

'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/content';

export function ContactForm() {
  const [status, setStatus] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const company = String(data.get('company') ?? '');
    const project = String(data.get('project') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = `Project enquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nProject type: ${project}\n\nProject details:\n${message}`;
    setStatus('Your email draft is ready. Send it from your email app to start the conversation.');
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required /></div><div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required /></div></div>
    <div className="form-row"><div className="form-field"><label htmlFor="company">Company or team <span>Optional</span></label><input id="company" name="company" autoComplete="organization" /></div><div className="form-field"><label htmlFor="project">What do you need?</label><select id="project" name="project" defaultValue="" required><option value="" disabled>Select one</option><option>Web platform</option><option>Mobile product</option><option>API or integration</option><option>Product redesign</option><option>Something else</option></select></div></div>
    <div className="form-field"><label htmlFor="message">Tell me about the work</label><textarea id="message" name="message" rows={7} placeholder="What are you trying to improve or build?" required /></div>
    <div className="form-action"><button className="button primary" type="submit">Prepare project email <ArrowUpRight size={18}/></button><p>Submitting opens a pre-addressed email in your email app.</p></div>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}

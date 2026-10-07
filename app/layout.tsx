import type { Metadata } from 'next';
import './globals.css';
import './polish.css';
import './portfolio.css';

export const metadata: Metadata = {
  title: 'Japhet Adjetey — Full-stack Software Engineer',
  description: 'Japhet Adjei Adjetey builds web platforms, mobile products, and API systems from Accra, Ghana.',
  robots: { index: true, follow: true },
  openGraph: { title: 'Japhet Adjetey — Full-stack Software Engineer', description: 'Web platforms, mobile products, and API systems. Explore selected case studies and start a conversation.', type: 'website', locale: 'en_GB' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

'use client';

import { useState } from 'react';
import { sitePath } from '@/lib/site-path';

const walkthrough = sitePath('/videos/theovision-walkthrough.mp4?v=30');

export function ProjectVideo() {
  const [failed, setFailed] = useState(false);
  return <div className="project-video">
    <video
      controls
      playsInline
      preload="none"
      poster={sitePath('/images/theovision-dashboard.webp')}
      width={1920}
      height={1200}
      aria-label="Theovision application walkthrough"
      aria-describedby="theovision-video-description"
      onError={() => setFailed(true)}
    >
      <source src={walkthrough} type="video/mp4"/>
      Your browser cannot play this video. <a href={walkthrough}>Open the walkthrough</a>.
    </video>
    {failed && <p role="alert" className="video-error">The video couldn’t load. <a href={walkthrough}>Open the recording directly</a>.</p>}
    <div className="video-description" id="theovision-video-description"><span>SILENT WALKTHROUGH · 30 SECONDS</span><p>Explore the overview, donor database, reports, administration settings, and sign-in experience.</p></div>
  </div>;
}

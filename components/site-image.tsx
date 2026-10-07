import Image, { type ImageProps } from 'next/image';
import { sitePath } from '@/lib/site-path';

export default function SiteImage({ src, ...props }: ImageProps) {
  return <Image {...props} src={typeof src === 'string' ? sitePath(src) : src} />;
}

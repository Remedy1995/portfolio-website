const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Next Link handles route prefixes; native links and public assets need this.
export function sitePath(path: string) {
  return path.startsWith('/') && !path.startsWith('//') ? `${basePath}${path}` : path;
}

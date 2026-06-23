import type { ReactNode } from 'react';

type BrowserMockProps = {
  /** Screenshot path under /public. Omit when passing children (e.g. an iframe). */
  src?: string;
  alt?: string;
  /** URL shown in the address bar. */
  url?: string;
  /** Custom screen content — used by the live embed to mount an iframe/poster. */
  children?: ReactNode;
  className?: string;
};

/**
 * A coded desktop-browser frame — traffic-light controls, an address bar, soft
 * shadow — that wraps either a screenshot (`src`) or arbitrary `children` (so the
 * live demo can mount a scaled <iframe> in the identical chrome). The desktop
 * analog of PhoneMock for full-bleed website concepts.
 */
export default function BrowserMock({
  src,
  alt = '',
  url = 'spcx-ai1.vercel.app',
  children,
  className = '',
}: BrowserMockProps) {
  return (
    <figure className={`browser ${className}`}>
      <div className="browser-frame">
        <div className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-url" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 2.5 3.5 6 3.5 10S14.5 19.5 12 22m0-20C9.5 4.5 8.5 8 8.5 12s1 7.5 3.5 10M2.5 12h19"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            {url}
          </span>
        </div>
        <div className="browser-screen">
          {children ?? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="browser-shot"
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>
    </figure>
  );
}

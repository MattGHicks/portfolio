import type { ReactNode } from 'react';

type PhoneMockProps = {
  /** Screenshot path under /public. Omit when passing children (e.g. an iframe). */
  src?: string;
  alt?: string;
  /** Caption rendered under the frame. */
  caption?: string;
  /** Custom screen content — used by the live embed to pass an iframe/poster. Overrides src. */
  children?: ReactNode;
  /** Tilt/scale presets for the hero composition. 'flat' is the default grid look. */
  variant?: 'flat' | 'left' | 'center' | 'right';
  className?: string;
};

/**
 * A coded device frame — realistic bezel, dynamic island, side buttons, screen
 * glare, and soft shadow — that wraps either a screenshot (`src`) or arbitrary
 * `children` (so the live demo can mount an <iframe> in the identical hardware).
 */
export default function PhoneMock({
  src,
  alt = '',
  caption,
  children,
  variant = 'flat',
  className = '',
}: PhoneMockProps) {
  return (
    <figure
      className={`phone ${variant !== 'flat' ? `phone--${variant}` : ''} ${className}`}
    >
      <div className="phone-frame">
        <div className="phone-island" aria-hidden="true" />
        <div className="phone-screen">
          {children ?? (
            <img
              className="phone-shot"
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <span className="phone-glare" aria-hidden="true" />
      </div>
      {caption && <figcaption className="phone-caption">{caption}</figcaption>}
    </figure>
  );
}

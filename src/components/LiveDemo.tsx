'use client';

import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import PhoneMock from './PhoneMock';

type LiveDemoProps = {
  liveUrl: string;
  repoUrl: string;
  /** Poster screenshot shown in the phone frame before the iframe boots. */
  poster: string;
};

/**
 * "Experience it live" — the live app embedded in a phone frame, loaded only on
 * click (never auto-booted for every visitor), plus an Open button, a QR code
 * to open it on a phone, and a link to the repo.
 */
export default function LiveDemo({ liveUrl, repoUrl, poster }: LiveDemoProps) {
  const [loaded, setLoaded] = useState(false);

  // Render the app at a real phone width (logical) and scale it to fit the
  // frame, so the embedded app never looks crushed at the frame's size.
  const LOGICAL_W = 402;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!loaded) return;
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [loaded]);
  const scale = box.w ? box.w / LOGICAL_W : 1;

  return (
    <section className="cs-live">
      <div className="cs-live-container">
        <p className="cs-showcase-label animate-on-scroll">Experience It Live</p>
        <h2 className="cs-live-title animate-on-scroll">
          It&apos;s not a mockup. It&apos;s the running app.
        </h2>
        <p className="cs-live-lede animate-on-scroll">
          Everything here is live and interactive — heat the device and watch the
          Aurora Core ramp, pick a strain and wash the whole app in its color.
          Simulated in the browser, no install.
        </p>

        <div className="cs-live-grid animate-on-scroll">
          <div className="cs-live-stage">
            <PhoneMock variant="flat" className="cs-live-phone">
              {loaded ? (
                <div ref={wrapRef} className="cs-live-iframe-wrap">
                  <iframe
                    className="cs-live-iframe"
                    src={liveUrl}
                    title="Dr. Dabber companion app — live interactive concept"
                    loading="lazy"
                    allow="accelerometer; clipboard-write"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                    style={{
                      width: LOGICAL_W,
                      height: box.h ? box.h / scale : '100%',
                      transform: `scale(${scale})`,
                    }}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="cs-live-poster"
                  onClick={() => setLoaded(true)}
                  aria-label="Load the live Dr. Dabber demo"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={poster} alt="" aria-hidden="true" />
                  <span className="cs-live-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="cs-live-play-label">Tap to load live demo</span>
                </button>
              )}
            </PhoneMock>
          </div>

          <div className="cs-live-actions">
            <p className="cs-live-actions-label">Try it yourself</p>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-live-open"
            >
              Open live app
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14 3h7v7m0-7L10 14M19 13v6H5V5h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <div className="cs-qr-card">
              <QRCodeSVG
                value={liveUrl}
                size={132}
                bgColor="#ffffff"
                fgColor="#1a1917"
                level="M"
                marginSize={2}
              />
              <p className="cs-qr-label">Scan to try it on your phone</p>
            </div>

            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-figma-btn cs-github-btn"
            >
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              View the Code on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

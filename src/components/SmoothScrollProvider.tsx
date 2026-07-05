"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type ScrollToTarget = string | number | HTMLElement;
type ScrollToOptions = { offset?: number; immediate?: boolean; duration?: number };

interface SmoothScrollValue {
  /** Live Lenis instance, or null when smooth-scroll is disabled (admin / reduced-motion / SSR). */
  lenisRef: { current: Lenis | null };
  /** Scroll to a selector, element, or offset. Falls back to native scroll when Lenis is off. */
  scrollTo: (target: ScrollToTarget, options?: ScrollToOptions) => void;
}

function nativeScrollTo(target: ScrollToTarget) {
  if (typeof window === "undefined") return;
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const SmoothScrollContext = createContext<SmoothScrollValue>({
  lenisRef: { current: null },
  scrollTo: nativeScrollTo,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  // Single Lenis instance driven off GSAP's ticker so ScrollTrigger and Lenis
  // share one RAF loop (prevents scroll-jank). Skipped on /admin and when the
  // user prefers reduced motion.
  useEffect(() => {
    if (isAdmin) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.2 });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isAdmin, pathname]);

  const scrollTo: SmoothScrollValue["scrollTo"] = (target, options) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: options?.offset ?? 0, ...options });
    } else {
      nativeScrollTo(target);
    }
  };

  // Global smooth scrolling for in-page hash anchors (e.g. #work, #about) —
  // replaces the old per-page anchor handler.
  useEffect(() => {
    if (isAdmin) return;
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      if (!document.querySelector(href)) return;
      e.preventDefault();
      scrollTo(href);
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <SmoothScrollContext.Provider value={{ lenisRef, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

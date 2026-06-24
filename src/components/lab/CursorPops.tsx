"use client";

import { useEffect, useRef } from "react";

// Sporadic pops of color triggered by cursor movement + clicks.
const POPS = ["#4d8dff", "#3fe0ff", "#a78bfa", "#ff5b9e", "#7cffb2", "#ffd24d"];

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
};

export default function CursorPops() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const sparks: Spark[] = [];
    const last = { x: w / 2, y: h / 2 };
    let acc = 0;
    let threshold = 130;

    const burst = (x: number, y: number, n: number, power: number) => {
      const color = POPS[Math.floor(Math.random() * POPS.length)];
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = power * (0.5 + Math.random());
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 22 + Math.random() * 24,
          color,
          size: 2 + Math.random() * 3,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const d = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      acc += d;
      last.x = e.clientX;
      last.y = e.clientY;
      if (acc > threshold && sparks.length < 240) {
        acc = 0;
        threshold = 110 + Math.random() * 90; // sporadic
        burst(e.clientX, e.clientY, 6, 1.5);
      }
    };
    const onDown = (e: MouseEvent) => burst(e.clientX, e.clientY, 18, 3.2);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.vy += 0.03;
        if (p.life > p.max) {
          sparks.splice(i, 1);
          continue;
        }
        const a = 1 - p.life / p.max;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        const s = p.size * (0.6 + a * 0.8);
        ctx.fillRect(Math.round(p.x), Math.round(p.y), s, s);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-pops" aria-hidden="true" />;
}

"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BG = "#0b0c10";

function WaveGrid({ accent }: { accent: string }) {
  const ref = useRef<THREE.Points>(null!);
  const COLS = 120;
  const ROWS = 72;
  const GAP = 0.16;

  const base = useMemo(() => {
    const arr = new Float32Array(COLS * ROWS * 3);
    let i = 0;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        arr[i * 3] = (x - COLS / 2) * GAP;
        arr[i * 3 + 1] = (y - ROWS / 2) * GAP;
        arr[i * 3 + 2] = 0;
        i++;
      }
    }
    return arr;
  }, []);
  const positions = useMemo(() => base.slice(), [base]);

  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geo = ref.current.geometry;
    const p = geo.attributes.position.array as Float32Array;
    const mx = mouse.current.x * (COLS * GAP) * 0.5;
    const my = mouse.current.y * (ROWS * GAP) * 0.5;
    for (let i = 0; i < p.length; i += 3) {
      const ox = base[i];
      const oy = base[i + 1];
      const wave =
        Math.sin(ox * 0.5 + t * 0.9) * 0.16 + Math.cos(oy * 0.45 + t * 0.7) * 0.16;
      const d = Math.hypot(ox - mx, oy - my);
      const ripple = Math.cos(d * 1.1 - t * 2.2) * Math.max(0, 1 - d / 3.2) * 0.6;
      p[i + 2] = wave + ripple;
    }
    geo.attributes.position.needsUpdate = true;
    ref.current.rotation.z = mouse.current.x * 0.04;
    ref.current.rotation.x = -1.05 + mouse.current.y * 0.05;
  });

  return (
    <points ref={ref} rotation={[-1.05, 0, 0]} position={[0, -0.4, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={accent}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroWebGL({ accent = "#4d8dff" }: { accent?: string }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.6, 5.2], fov: 55 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 3.4, 11]} />
      <WaveGrid accent={accent} />
    </Canvas>
  );
}

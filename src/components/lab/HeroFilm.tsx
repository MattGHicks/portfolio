"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uVideoAspect;
  uniform float uMotion;
  varying vec2 vUv;

  float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    // cover-fit the 16:9 film to the viewport
    float sa = uRes.x / uRes.y;
    float va = uVideoAspect;
    vec2 r = vec2(1.0);
    if (sa > va) { r.y = va / sa; } else { r.x = sa / va; }
    vec2 cuv = (vUv - 0.5) * r + 0.5;

    // cursor refraction bubble
    vec2 m = uMouse;
    float d = distance(vUv, m);
    float infl = smoothstep(0.30, 0.0, d) * uMotion;
    vec2 dir = normalize(vUv - m + 0.0001);
    cuv += dir * infl * 0.018 * sin(uTime * 2.0 - d * 26.0);

    // chromatic aberration (stronger near cursor)
    float ca = 0.0035 * (0.5 + infl * 1.8);
    vec3 col;
    col.r = texture2D(uTex, cuv + dir * ca).r;
    col.g = texture2D(uTex, cuv).g;
    col.b = texture2D(uTex, cuv - dir * ca).b;

    // cool-blue cinematic grade
    col *= vec3(0.86, 0.97, 1.16);
    col = pow(max(col, 0.0), vec3(0.94));

    // film grain
    col += (rand(vUv + fract(uTime)) - 0.5) * 0.06 * uMotion;

    // vignette
    col *= smoothstep(1.18, 0.32, distance(vUv, vec2(0.5)));

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FilmPlane({ src }: { src: string }) {
  const tex = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: "anonymous",
  });
  const { size } = useThree();
  const target = useRef<[number, number]>([0.5, 0.5]);
  const cur = useRef<[number, number]>([0.5, 0.5]);

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uVideoAspect: { value: 16 / 9 },
      uMotion: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uTex.value = tex;
  }, [tex, uniforms]);

  useEffect(() => {
    uniforms.uMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 1;
    const onMove = (e: MouseEvent) => {
      target.current = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uRes.value.set(size.width, size.height);
    const img = tex.image as HTMLVideoElement | undefined;
    if (img?.videoWidth) uniforms.uVideoAspect.value = img.videoWidth / img.videoHeight;
    cur.current[0] += (target.current[0] - cur.current[0]) * 0.06;
    cur.current[1] += (target.current[1] - cur.current[1]) * 0.06;
    uniforms.uMouse.value.set(cur.current[0], cur.current[1]);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  );
}

export default function HeroFilm({ src = "/video/home/hero-film.mp4" }: { src?: string }) {
  return (
    <Canvas dpr={[1, 1.8]} gl={{ antialias: false }} camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <FilmPlane src={src} />
      </Suspense>
    </Canvas>
  );
}

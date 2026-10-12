import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PoolPilot — Matt Hicks",
  description:
    "PoolPilot — a self-hosted smart pool controller designed and built end-to-end: reverse-engineered RS-485 pump protocol, hand-wired ESP32 bridge hardware, and a real-time mobile app that runs the family pool every day.",
};

export default function PoolPilotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/home/ParticleBackground").then((m) => ({ default: m.ParticleBackground })),
  { ssr: false }
);

export function ClientParticleBackground() {
  return <ParticleBackground />;
}

"use client"

import { type ReactNode } from "react"
import { ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine } from "@tsparticles/engine"

async function initParticles(engine: Engine) {
  await loadSlim(engine)
}

export function ParticlesProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ParticlesProvider init={initParticles}>
      {children}
    </ParticlesProvider>
  )
}

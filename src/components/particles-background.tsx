"use client"

import { useMemo } from "react"
import Particles from "@tsparticles/react"
import type { ISourceOptions } from "@tsparticles/engine"
import { useTheme } from "next-themes"

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme()

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: 50, density: { enable: true } },
        color: {
          value: resolvedTheme === "dark"
            ? ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b"]
            : ["#2563eb", "#7c3aed", "#0891b2", "#d97706"],
        },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 1, sync: false },
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 1 },
          direction: "none" as const,
          outModes: { default: "out" as const },
          straight: false,
        },
        links: {
          enable: true,
          distance: 150,
          color: resolvedTheme === "dark" ? "#3b82f6" : "#2563eb",
          opacity: 0.15,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.3 } },
        },
      },
      detectRetina: true,
    }),
    [resolvedTheme]
  )

  return (
    <div className="particles-container">
      <Particles id="ds-particles" options={options} />
    </div>
  )
}

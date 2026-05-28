"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Layout, Monitor } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import type { ColorPalette, GradientConfig } from "@/lib/design-tokens"

interface LayoutPreviewProps {
  palette: ColorPalette
  gradient: GradientConfig
}

function LayoutCodePreview({ palette, gradient }: LayoutPreviewProps) {
  const code = useMemo(() => {
    const grad = `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.via}, ${gradient.to})`
    return `{/* Layout 60-30-10 */}
<div style={{ backgroundColor: "${palette.background}" }}>
  {/* Navbar — 30% Secondary */}
  <nav style={{ backgroundColor: "${palette.secondary}" }}>
    <Logo color="${palette.accent}" />
    <NavLinks color="${palette.foreground}" />
  </nav>

  {/* Hero — 60% Primary */}
  <section style={{ backgroundColor: "${palette.primary}" }}>
    <h1 style={{ color: "${palette.foreground}" }}>...</h1>
    <p style={{ color: "${palette.muted}" }}>...</p>
    {/* CTA — 10% Accent */}
    <button style={{ background: "${grad}" }}>
      Comecar
    </button>
  </section>

  {/* Cards Grid */}
  <div className="grid grid-cols-3 gap-4">
    <Card bg="${palette.primary}" border="${palette.border}" />
    <Card bg="${palette.secondary}" border="${palette.border}" />
    <Card bg="${palette.primary}" accent="${palette.accent}" />
  </div>
</div>`
  }, [palette, gradient])

  return <CodeBlock code={code} language="jsx" title="JSX Structure" />
}

export function LayoutPreview({ palette, gradient }: LayoutPreviewProps) {
  const gradientCSS = `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.via}, ${gradient.to})`

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Monitor className="h-5 w-5 text-primary" />
          Preview de Layout — 60-30-10
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="relative overflow-hidden rounded-xl border border-border shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mini Browser Frame */}
          <div
            className="flex h-8 items-center gap-2 border-b px-3"
            style={{ backgroundColor: palette.primary, borderColor: palette.border }}
          >
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div
              className="flex-1 rounded-md px-2 py-0.5 text-center text-[9px] font-mono"
              style={{
                backgroundColor: palette.background,
                color: palette.muted,
              }}
            >
              design-system-orchestrator.app
            </div>
          </div>

          {/* Page Body */}
          <div style={{ backgroundColor: palette.background }} className="p-4 space-y-3">
            {/* Navbar - 30% */}
            <motion.div
              className="flex items-center justify-between rounded-lg p-3"
              style={{ backgroundColor: palette.secondary }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <Layout className="h-3 w-3" style={{ color: palette.accent }} />
                <div
                  className="h-2 w-16 rounded"
                  style={{ backgroundColor: palette.foreground, opacity: 0.9 }}
                />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-2 w-10 rounded"
                    style={{ backgroundColor: palette.foreground, opacity: 0.5 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Hero - 60% zone */}
            <motion.div
              className="rounded-lg p-6 space-y-3"
              style={{ backgroundColor: palette.primary }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="h-3 w-3/4 rounded"
                style={{ backgroundColor: palette.foreground, opacity: 0.8 }}
              />
              <div
                className="h-2 w-full rounded"
                style={{ backgroundColor: palette.muted, opacity: 0.5 }}
              />
              <div
                className="h-2 w-5/6 rounded"
                style={{ backgroundColor: palette.muted, opacity: 0.5 }}
              />
              {/* CTA Button - 10% accent */}
              <motion.div
                className="inline-block rounded-md px-4 py-1.5"
                style={{ background: gradientCSS }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-2 w-12 rounded bg-white/90" />
              </motion.div>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-lg p-3 space-y-2"
                  style={{
                    backgroundColor: i === 1 ? palette.secondary : palette.primary,
                    border: `1px solid ${palette.border}`,
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <div
                    className="h-2 w-2/3 rounded"
                    style={{ backgroundColor: palette.foreground, opacity: 0.7 }}
                  />
                  <div
                    className="h-1.5 w-full rounded"
                    style={{ backgroundColor: palette.muted, opacity: 0.4 }}
                  />
                  <div
                    className="h-1.5 w-4/5 rounded"
                    style={{ backgroundColor: palette.muted, opacity: 0.4 }}
                  />
                  {i === 2 && (
                    <div
                      className="h-1.5 w-8 rounded"
                      style={{ backgroundColor: palette.accent }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="flex justify-between rounded-lg p-2"
              style={{ backgroundColor: palette.primary, borderTop: `1px solid ${palette.border}` }}
            >
              <div
                className="h-1.5 w-20 rounded"
                style={{ backgroundColor: palette.muted, opacity: 0.3 }}
              />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: palette.muted, opacity: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Distribution bar overlay */}
          <div className="flex h-1.5">
            <div style={{ backgroundColor: palette.primary, width: "60%" }} />
            <div style={{ backgroundColor: palette.secondary, width: "30%" }} />
            <div style={{ backgroundColor: palette.accent, width: "10%" }} />
          </div>
        </motion.div>

        <LayoutCodePreview palette={palette} gradient={gradient} />
      </CardContent>
    </Card>
  )
}

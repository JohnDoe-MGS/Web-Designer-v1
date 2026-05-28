"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Layers, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ParticlesBackground } from "@/components/particles-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorPaletteManager } from "@/components/color-palette-manager"
import { FontScalePreview } from "@/components/font-scale-preview"
import { GradientEditor } from "@/components/gradient-editor"
import { LayoutPreview } from "@/components/layout-preview"
import { ContrastChecker } from "@/components/contrast-checker"
import { ConfigGenerator } from "@/components/config-generator"
import { ManifestoPage } from "@/components/manifesto-page"
import { AnimationsPage } from "@/components/animations-page"
import { PromptGeneratorPage } from "@/components/prompt-generator-page"
import { useDesignSystem } from "@/hooks/use-design-system"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const ds = useDesignSystem()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const activePalette = resolvedTheme === "dark" ? ds.darkPalette : ds.lightPalette

  return (
    <div className="relative min-h-screen bg-background">
      <ParticlesBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 glass-card border-b border-border">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-accent">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight gradient-text sm:text-base">
                  Design System Orchestrator
                </h1>
                <p className="hidden text-[10px] text-muted-foreground sm:block">
                  Tailwind &middot; shadcn/ui &middot; Claude Code Bridge
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 sm:flex">
                <Zap className="h-3 w-3 text-amber-500" />
                <span className="text-[10px] font-medium text-muted-foreground">
                  Regra 60-30-10
                </span>
              </div>
              <ThemeToggle />
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Tabs defaultValue="cores" className="flex! flex-col! gap-6">
            <div className="-mx-4 sm:mx-0 overflow-x-auto scrollbar-thin pb-1">
              <div className="flex justify-center min-w-max px-4 sm:px-0">
                <TabsList className="glass-card w-auto">
                  <TabsTrigger value="cores">Cores</TabsTrigger>
                  <TabsTrigger value="tipografia">Tipografia</TabsTrigger>
                  <TabsTrigger value="gradientes">Gradientes</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="acessibilidade">WCAG</TabsTrigger>
                  <TabsTrigger value="config">Config</TabsTrigger>
                  <TabsTrigger value="manifesto">Manifesto</TabsTrigger>
                  <TabsTrigger value="animacoes">Animações</TabsTrigger>
                  <TabsTrigger value="prompt">Prompt</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="cores" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ColorPaletteManager
                  lightPalette={ds.lightPalette}
                  darkPalette={ds.darkPalette}
                  onUpdateLight={ds.updateLightColor}
                  onUpdateDark={ds.updateDarkColor}
                  onSetLightPalette={ds.setLightPalette}
                  onSetDarkPalette={ds.setDarkPalette}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="tipografia">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FontScalePreview
                  fontScale={ds.fontScale}
                  fontFamily={ds.fontFamily}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="gradientes">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GradientEditor
                  gradient={ds.gradient}
                  onUpdate={ds.updateGradient}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="preview">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <LayoutPreview
                  palette={activePalette}
                  gradient={ds.gradient}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="acessibilidade">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ContrastChecker
                  lightPalette={ds.lightPalette}
                  darkPalette={ds.darkPalette}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="config">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ConfigGenerator generateConfig={ds.generateConfig} />
              </motion.div>
            </TabsContent>

            <TabsContent value="manifesto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ManifestoPage />
              </motion.div>
            </TabsContent>

            <TabsContent value="animacoes">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AnimationsPage />
              </motion.div>
            </TabsContent>

            <TabsContent value="prompt">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PromptGeneratorPage
                  lightPalette={ds.lightPalette}
                  darkPalette={ds.darkPalette}
                  gradient={ds.gradient}
                  fontScale={ds.fontScale}
                  fontFamily={ds.fontFamily}
                />
              </motion.div>
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          {/* Footer */}
          <footer className="pb-8 text-center">
            <p className="text-xs text-muted-foreground">
              Design System Orchestrator &middot; Tailwind CSS &middot; shadcn/ui &middot; Prisma &middot; Claude Code Bridge
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}

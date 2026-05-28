"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Palette, Droplets, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CodeBlock } from "@/components/code-block"
import { SuggestedCommands } from "@/components/suggested-commands"
import type { ColorPalette } from "@/lib/design-tokens"
import { GRAY_PRESETS, ACCENT_PRESETS } from "@/lib/design-tokens"
import { contrastRatio, wcagLevel } from "@/lib/utils"

interface ColorPaletteManagerProps {
  lightPalette: ColorPalette
  darkPalette: ColorPalette
  onUpdateLight: (key: keyof ColorPalette, value: string) => void
  onUpdateDark: (key: keyof ColorPalette, value: string) => void
  onSetLightPalette: (palette: ColorPalette) => void
  onSetDarkPalette: (palette: ColorPalette) => void
}

function ColorSwatch({
  color,
  label,
  percentage,
  onChange,
}: {
  color: string
  label: string
  percentage: string
  onChange: (val: string) => void
}) {
  return (
    <motion.div
      className="swatch-lift flex flex-col items-center gap-2"
      whileHover={{ y: -4 }}
    >
      <div className="relative group">
        <div
          className="h-16 w-16 rounded-xl border border-border shadow-lg cursor-pointer"
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={`Cor ${label}`}
        />
        <div className="absolute -top-1 -right-1">
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {percentage}
          </Badge>
        </div>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-[10px] font-mono text-muted-foreground uppercase">
        {color}
      </span>
    </motion.div>
  )
}

function ContrastIndicator({ fg, bg }: { fg: string; bg: string }) {
  const ratio = contrastRatio(fg, bg)
  const level = wcagLevel(ratio)
  const colorMap = {
    AAA: "text-emerald-400",
    AA: "text-blue-400",
    "AA Large": "text-amber-400",
    Fail: "text-red-400",
  }

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className={`font-bold ${colorMap[level]}`}>{level}</span>
      <span className="text-muted-foreground">{ratio.toFixed(2)}:1</span>
    </div>
  )
}

function GrayPresetSelector({
  onSelect,
}: {
  onSelect: (preset: keyof typeof GRAY_PRESETS) => void
}) {
  return (
    <div className="flex gap-2">
      {(Object.keys(GRAY_PRESETS) as Array<keyof typeof GRAY_PRESETS>).map((name) => (
        <motion.button
          key={name}
          onClick={() => onSelect(name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium capitalize text-card-foreground hover:bg-secondary"
        >
          <div className="flex -space-x-0.5">
            {[GRAY_PRESETS[name][900], GRAY_PRESETS[name][600], GRAY_PRESETS[name][300]].map(
              (c, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full border border-background"
                  style={{ backgroundColor: c }}
                />
              )
            )}
          </div>
          {name}
        </motion.button>
      ))}
    </div>
  )
}

function AccentPresetSelector({
  onSelect,
}: {
  onSelect: (light: string, dark: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(ACCENT_PRESETS).map(([key, preset]) => (
        <motion.button
          key={key}
          onClick={() => onSelect(preset.value, preset.dark)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-border hover:border-foreground"
          style={{ backgroundColor: preset.value }}
          title={preset.name}
        >
          <Sparkles className="h-3 w-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      ))}
    </div>
  )
}

function PaletteCodePreview({ light, dark }: { light: ColorPalette; dark: ColorPalette }) {
  const cssCode = useMemo(() => {
    return `:root {
  --color-primary: ${light.primary};
  --color-secondary: ${light.secondary};
  --color-accent: ${light.accent};
  --color-background: ${light.background};
  --color-foreground: ${light.foreground};
  --color-muted: ${light.muted};
  --color-border: ${light.border};
}

.dark {
  --color-primary: ${dark.primary};
  --color-secondary: ${dark.secondary};
  --color-accent: ${dark.accent};
  --color-background: ${dark.background};
  --color-foreground: ${dark.foreground};
  --color-muted: ${dark.muted};
  --color-border: ${dark.border};
}`
  }, [light, dark])

  return <CodeBlock code={cssCode} language="css" title="CSS Variables" />
}

export function ColorPaletteManager({
  lightPalette,
  darkPalette,
  onUpdateLight,
  onUpdateDark,
  onSetLightPalette,
  onSetDarkPalette,
}: ColorPaletteManagerProps) {
  const applyGrayPreset = (preset: keyof typeof GRAY_PRESETS) => {
    const g = GRAY_PRESETS[preset]
    onSetLightPalette({
      ...lightPalette,
      primary: g[100],
      secondary: g[700],
      background: g[50],
      foreground: g[900],
      muted: g[500],
      border: g[200],
    })
    onSetDarkPalette({
      ...darkPalette,
      primary: g[900],
      secondary: g[400],
      background: g[950],
      foreground: g[50],
      muted: g[600],
      border: g[800],
    })
  }

  const applyAccentPreset = (light: string, dark: string) => {
    onUpdateLight("accent", light)
    onUpdateDark("accent", dark)
  }

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="h-5 w-5 text-primary" />
          Paleta de Cores — Regra 60-30-10
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gray Presets */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Base de Cinzas
          </Label>
          <GrayPresetSelector onSelect={applyGrayPreset} />
        </div>

        {/* Accent Presets */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Cor de Acento (10%)
          </Label>
          <AccentPresetSelector onSelect={applyAccentPreset} />
        </div>

        {/* Light Theme Colors */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-amber-500" />
            <Label className="text-sm font-semibold">Tema Claro</Label>
          </div>
          <div className="flex flex-wrap gap-4">
            <ColorSwatch
              color={lightPalette.primary}
              label="Base (60%)"
              percentage="60%"
              onChange={(v) => onUpdateLight("primary", v)}
            />
            <ColorSwatch
              color={lightPalette.secondary}
              label="Secundária (30%)"
              percentage="30%"
              onChange={(v) => onUpdateLight("secondary", v)}
            />
            <ColorSwatch
              color={lightPalette.accent}
              label="Acento (10%)"
              percentage="10%"
              onChange={(v) => onUpdateLight("accent", v)}
            />
            <ColorSwatch
              color={lightPalette.background}
              label="Fundo"
              percentage="bg"
              onChange={(v) => onUpdateLight("background", v)}
            />
            <ColorSwatch
              color={lightPalette.foreground}
              label="Texto"
              percentage="fg"
              onChange={(v) => onUpdateLight("foreground", v)}
            />
          </div>
          <div className="flex gap-4 pt-1">
            <ContrastIndicator fg={lightPalette.foreground} bg={lightPalette.background} />
            <ContrastIndicator fg={lightPalette.foreground} bg={lightPalette.primary} />
          </div>
        </div>

        {/* Dark Theme Colors */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-400" />
            <Label className="text-sm font-semibold">Tema Escuro</Label>
          </div>
          <div className="flex flex-wrap gap-4">
            <ColorSwatch
              color={darkPalette.primary}
              label="Base (60%)"
              percentage="60%"
              onChange={(v) => onUpdateDark("primary", v)}
            />
            <ColorSwatch
              color={darkPalette.secondary}
              label="Secundária (30%)"
              percentage="30%"
              onChange={(v) => onUpdateDark("secondary", v)}
            />
            <ColorSwatch
              color={darkPalette.accent}
              label="Acento (10%)"
              percentage="10%"
              onChange={(v) => onUpdateDark("accent", v)}
            />
            <ColorSwatch
              color={darkPalette.background}
              label="Fundo"
              percentage="bg"
              onChange={(v) => onUpdateDark("background", v)}
            />
            <ColorSwatch
              color={darkPalette.foreground}
              label="Texto"
              percentage="fg"
              onChange={(v) => onUpdateDark("foreground", v)}
            />
          </div>
          <div className="flex gap-4 pt-1">
            <ContrastIndicator fg={darkPalette.foreground} bg={darkPalette.background} />
            <ContrastIndicator fg={darkPalette.foreground} bg={darkPalette.primary} />
          </div>
        </div>

        {/* 60-30-10 Visual Bar */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Distribuição Visual
          </Label>
          <div className="flex h-6 w-full overflow-hidden rounded-full">
            <motion.div
              className="h-full"
              style={{ backgroundColor: lightPalette.primary, width: "60%" }}
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="h-full"
              style={{ backgroundColor: lightPalette.secondary, width: "30%" }}
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            />
            <motion.div
              className="h-full"
              style={{ backgroundColor: lightPalette.accent, width: "10%" }}
              initial={{ width: 0 }}
              animate={{ width: "10%" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>

        {/* Code Preview */}
        <PaletteCodePreview light={lightPalette} dark={darkPalette} />

        {/* Comandos Sugeridos */}
        <SuggestedCommands commands={[
          {
            command: 'claude "Aplique a paleta 60-30-10 do ds-orchestrator-config.json no meu projeto Tailwind, atualizando as CSS variables em globals.css"',
            description: "Aplica a paleta completa ao projeto",
            tag: "Paleta",
          },
          {
            command: 'claude "Gere variantes de cor (hover, active, disabled) para cada token do design system, mantendo a proporção 60-30-10"',
            description: "Cria estados derivados automaticamente",
            tag: "Variantes",
          },
          {
            command: 'claude "Audite todas as cores hardcoded no projeto e substitua pelos tokens do design system"',
            description: "Remove cores hardcoded do código",
            tag: "Auditoria",
          },
        ]} />
      </CardContent>
    </Card>
  )
}

"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Blend, RotateCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import { SuggestedCommands } from "@/components/suggested-commands"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { GradientConfig } from "@/lib/design-tokens"

interface GradientEditorProps {
  gradient: GradientConfig
  onUpdate: (key: keyof GradientConfig, value: string | number) => void
}

function GradientStop({
  label,
  color,
  onChange,
}: {
  label: string
  color: string
  onChange: (val: string) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className="h-10 w-10 rounded-lg border border-border shadow-md cursor-pointer"
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label={`Cor ${label}`}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <span className="text-[10px] font-mono text-muted-foreground uppercase">{color}</span>
      </div>
    </div>
  )
}

function GradientCodePreview({ gradient, css }: { gradient: GradientConfig; css: string }) {
  const code = useMemo(() => {
    return `/* CSS */
background: ${css};

/* Tailwind CSS Classes */
<div className="bg-gradient-to-r from-[${gradient.from}] via-[${gradient.via}] to-[${gradient.to}]"
     style={{ "--tw-gradient-angle": "${gradient.angle}deg" }}>

/* Tailwind Config */
theme: {
  extend: {
    colors: {
      gradient: {
        from: "${gradient.from}",
        via: "${gradient.via}",
        to: "${gradient.to}",
      }
    }
  }
}`
  }, [gradient, css])

  return <CodeBlock code={code} language="css" title="CSS & Tailwind" />
}

export function GradientEditor({ gradient, onUpdate }: GradientEditorProps) {
  const gradientCSS = `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.via}, ${gradient.to})`

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Blend className="h-5 w-5 text-primary" />
          Editor de Gradientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Live Preview */}
        <motion.div
          className="h-24 w-full rounded-xl shadow-lg"
          style={{ background: gradientCSS }}
          animate={{ background: gradientCSS }}
          transition={{ duration: 0.5 }}
        />

        {/* Color Stops */}
        <div className="flex flex-wrap gap-6">
          <GradientStop
            label="Início"
            color={gradient.from}
            onChange={(v) => onUpdate("from", v)}
          />
          <GradientStop
            label="Meio"
            color={gradient.via}
            onChange={(v) => onUpdate("via", v)}
          />
          <GradientStop
            label="Fim"
            color={gradient.to}
            onChange={(v) => onUpdate("to", v)}
          />
        </div>

        {/* Angle Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <RotateCw className="h-3 w-3" />
              Ângulo
            </Label>
            <span className="text-xs font-mono text-foreground">{gradient.angle}°</span>
          </div>
          <Slider
            value={[gradient.angle]}
            min={0}
            max={360}
            step={5}
            onValueChange={(v) => onUpdate("angle", Array.isArray(v) ? v[0] : v)}
            className="w-full"
          />
        </div>

        {/* Code Preview */}
        <GradientCodePreview gradient={gradient} css={gradientCSS} />

        <SuggestedCommands commands={[
          {
            command: 'claude "Aplique o gradiente do design system em todos os botões CTA e elementos de destaque do projeto"',
            description: "Aplica gradiente nos CTAs do projeto",
            tag: "Gradiente",
          },
          {
            command: 'claude "Crie uma classe utilitária .gradient-brand no Tailwind com os stops de cor do design system"',
            description: "Gera classe reutilizável de gradiente",
            tag: "Classe",
          },
        ]} />
      </CardContent>
    </Card>
  )
}

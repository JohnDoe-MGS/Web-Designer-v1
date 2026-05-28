"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Type } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import { SuggestedCommands } from "@/components/suggested-commands"
import type { FontScale } from "@/lib/design-tokens"

interface FontScalePreviewProps {
  fontScale: FontScale
  fontFamily: string
}

const SCALE_ITEMS: { key: keyof FontScale; label: string; weight: number; sample: string }[] = [
  { key: "display", label: "Display", weight: 800, sample: "Orchestrator" },
  { key: "h1", label: "Heading 1", weight: 700, sample: "Design System" },
  { key: "h2", label: "Heading 2", weight: 600, sample: "Componentes visuais" },
  { key: "h3", label: "Heading 3", weight: 600, sample: "Hierarquia tipográfica" },
  { key: "body", label: "Body", weight: 400, sample: "Texto principal de conteúdo para leitura confortável em parágrafos longos." },
  { key: "small", label: "Small", weight: 400, sample: "Texto auxiliar e labels de formulário" },
  { key: "caption", label: "Caption", weight: 500, sample: "METADADOS E LEGENDAS" },
]

function FontScaleCodePreview({ fontScale, fontFamily }: FontScalePreviewProps) {
  const code = useMemo(() => {
    const entries = Object.entries(fontScale)
      .map(([key, val]) => `    "${key}": "${val}"`)
      .join(",\n")
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["${fontFamily}", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
${entries}
      },
    },
  },
}`
  }, [fontScale, fontFamily])

  return <CodeBlock code={code} language="js" title="Tailwind Config" />
}

export function FontScalePreview({ fontScale, fontFamily }: FontScalePreviewProps) {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Type className="h-5 w-5 text-primary" />
          Escala Tipográfica — {fontFamily}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          {SCALE_ITEMS.map((item, i) => (
            <motion.div
              key={item.key}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg px-3 py-2 hover:bg-secondary/50 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0 sm:w-20 shrink-0">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-[10px] text-muted-foreground/60">
                  {fontScale[item.key]}
                </span>
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <span
                  className="block truncate text-foreground group-hover:gradient-text"
                  style={{
                    fontSize: `clamp(0.75rem, ${parseFloat(fontScale[item.key]) * 0.7}rem + 0.5vw, ${fontScale[item.key]})`,
                    fontWeight: item.weight,
                    fontFamily: `var(--font-montserrat), ${fontFamily}, sans-serif`,
                    lineHeight: 1.3,
                  }}
                >
                  {item.sample}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <FontScaleCodePreview fontScale={fontScale} fontFamily={fontFamily} />

        <SuggestedCommands commands={[
          {
            command: 'claude "Refatore a tipografia do projeto para usar a escala Montserrat definida no design system, substituindo font-sizes arbitrários"',
            description: "Padroniza a tipografia em todo o projeto",
            tag: "Tipografia",
          },
          {
            command: 'claude "Adicione classes utilitárias de tipografia (text-display, text-h1, text-h2) no Tailwind config baseadas na escala do design system"',
            description: "Cria classes semânticas de texto",
            tag: "Classes",
          },
        ]} />
      </CardContent>
    </Card>
  )
}

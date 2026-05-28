"use client"

import { motion } from "framer-motion"
import { Type } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FontScale } from "@/lib/design-tokens"

interface FontScalePreviewProps {
  fontScale: FontScale
  fontFamily: string
}

const SCALE_ITEMS: { key: keyof FontScale; label: string; weight: number; sample: string }[] = [
  { key: "display", label: "Display", weight: 800, sample: "Orchestrator" },
  { key: "h1", label: "Heading 1", weight: 700, sample: "Design System" },
  { key: "h2", label: "Heading 2", weight: 600, sample: "Componentes visuais" },
  { key: "h3", label: "Heading 3", weight: 600, sample: "Hierarquia tipografica" },
  { key: "body", label: "Body", weight: 400, sample: "Texto principal de conteudo para leitura confortavel em parágrafos longos." },
  { key: "small", label: "Small", weight: 400, sample: "Texto auxiliar e labels de formulário" },
  { key: "caption", label: "Caption", weight: 500, sample: "METADADOS E LEGENDAS" },
]

export function FontScalePreview({ fontScale, fontFamily }: FontScalePreviewProps) {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Type className="h-5 w-5 text-primary" />
          Escala Tipografica — {fontFamily}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {SCALE_ITEMS.map((item, i) => (
          <motion.div
            key={item.key}
            className="flex items-baseline gap-4 rounded-lg px-3 py-2 hover:bg-secondary/50 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <div className="w-20 shrink-0">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
              <div className="text-[10px] text-muted-foreground/60">
                {fontScale[item.key]}
              </div>
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <span
                className="block truncate text-foreground group-hover:gradient-text"
                style={{
                  fontSize: fontScale[item.key],
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
      </CardContent>
    </Card>
  )
}

"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ColorPalette } from "@/lib/design-tokens"
import { contrastRatio, wcagLevel } from "@/lib/utils"

interface ContrastCheckerProps {
  lightPalette: ColorPalette
  darkPalette: ColorPalette
}

interface ContrastPair {
  name: string
  fg: string
  bg: string
  fgLabel: string
  bgLabel: string
}

function buildPairs(palette: ColorPalette, theme: string): ContrastPair[] {
  return [
    {
      name: `${theme}: Texto sobre Fundo`,
      fg: palette.foreground,
      bg: palette.background,
      fgLabel: "Foreground",
      bgLabel: "Background",
    },
    {
      name: `${theme}: Texto sobre Base (60%)`,
      fg: palette.foreground,
      bg: palette.primary,
      fgLabel: "Foreground",
      bgLabel: "Primary",
    },
    {
      name: `${theme}: Texto sobre Secundaria (30%)`,
      fg: palette.foreground,
      bg: palette.secondary,
      fgLabel: "Foreground",
      bgLabel: "Secondary",
    },
    {
      name: `${theme}: Muted sobre Fundo`,
      fg: palette.muted,
      bg: palette.background,
      fgLabel: "Muted",
      bgLabel: "Background",
    },
    {
      name: `${theme}: Acento sobre Fundo`,
      fg: palette.accent,
      bg: palette.background,
      fgLabel: "Accent",
      bgLabel: "Background",
    },
  ]
}

function ContrastRow({ pair }: { pair: ContrastPair }) {
  const ratio = contrastRatio(pair.fg, pair.bg)
  const level = wcagLevel(ratio)
  const passed = level !== "Fail"

  const badgeColor = {
    AAA: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    AA: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "AA Large": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Fail: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  return (
    <motion.div
      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-secondary/30"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {passed ? (
        <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
      ) : (
        <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-foreground truncate">{pair.name}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded border border-border" style={{ backgroundColor: pair.fg }} />
            <span className="text-[9px] font-mono text-muted-foreground">{pair.fg}</span>
          </div>
          <span className="text-[9px] text-muted-foreground">/</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded border border-border" style={{ backgroundColor: pair.bg }} />
            <span className="text-[9px] font-mono text-muted-foreground">{pair.bg}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-mono text-muted-foreground">{ratio.toFixed(2)}:1</span>
        <Badge className={`text-[10px] px-1.5 border ${badgeColor[level]}`}>
          {level}
        </Badge>
      </div>
    </motion.div>
  )
}

export function ContrastChecker({ lightPalette, darkPalette }: ContrastCheckerProps) {
  const lightPairs = buildPairs(lightPalette, "Claro")
  const darkPairs = buildPairs(darkPalette, "Escuro")
  const allPairs = [...lightPairs, ...darkPairs]
  const passCount = allPairs.filter(
    (p) => wcagLevel(contrastRatio(p.fg, p.bg)) !== "Fail"
  ).length

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Acessibilidade WCAG
          </span>
          <Badge variant="outline" className="text-xs">
            {passCount}/{allPairs.length} aprovados
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 max-h-80 overflow-y-auto">
        {allPairs.map((pair, i) => (
          <ContrastRow key={i} pair={pair} />
        ))}
      </CardContent>
    </Card>
  )
}

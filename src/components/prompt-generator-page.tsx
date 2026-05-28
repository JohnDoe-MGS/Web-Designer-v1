"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Copy,
  Check,
  Terminal,
  Wand2,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SuggestedCommands } from "@/components/suggested-commands"
import { copyToClipboard } from "@/lib/clipboard"
import type { ColorPalette, GradientConfig, FontScale } from "@/lib/design-tokens"

interface PromptGeneratorPageProps {
  lightPalette: ColorPalette
  darkPalette: ColorPalette
  gradient: GradientConfig
  fontScale: FontScale
  fontFamily: string
}

function buildPrompt(
  light: ColorPalette,
  dark: ColorPalette,
  gradient: GradientConfig,
  fontScale: FontScale,
  fontFamily: string,
): string {
  return `Aplique o seguinte Design System ao meu projeto, seguindo fielmente as especificações abaixo mas com liberdade criativa para adaptar a estrutura visual de forma harmoniosa e moderna.

## Regra de Cores 60-30-10

**Tema Claro:**
- 60% Base (fundos principais): ${light.primary}
- 30% Secundária (navegação, cards): ${light.secondary}
- 10% Acento (CTAs, links, destaques): ${light.accent}
- Background: ${light.background}
- Foreground (texto): ${light.foreground}
- Muted (texto secundário): ${light.muted}
- Bordas: ${light.border}

**Tema Escuro:**
- 60% Base: ${dark.primary}
- 30% Secundária: ${dark.secondary}
- 10% Acento: ${dark.accent}
- Background: ${dark.background}
- Foreground: ${dark.foreground}
- Muted: ${dark.muted}
- Bordas: ${dark.border}

## Gradiente Principal
- Direção: ${gradient.angle}deg
- Stops: ${gradient.from} → ${gradient.via} → ${gradient.to}
- CSS: linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.via}, ${gradient.to})
- Usar em: botões CTA, títulos destacados, elementos hero

## Tipografia — ${fontFamily}
- Display: ${fontScale.display} (weight 800)
- H1: ${fontScale.h1} (weight 700)
- H2: ${fontScale.h2} (weight 600)
- H3: ${fontScale.h3} (weight 600)
- Body: ${fontScale.body} (weight 400)
- Small: ${fontScale.small} (weight 400)
- Caption: ${fontScale.caption} (weight 500)

## Animações (Framer Motion)
- Entrada padrão: fade-in-up (opacity 0→1, y 20→0, duration 0.4s)
- Stagger entre cards: delay incremental de 0.06s
- Hover em cards: translateY(-8px) + scale(1.02) com spring stiffness 400
- Botões: whileTap scale(0.98)
- Transição de tema: 300ms ease em background-color, border-color, color

## Efeitos Visuais
- Glass morphism: backdrop-filter blur(12px) saturate(180%), bg com 80% opacidade
- Glow accent: box-shadow 0 0 20px primary/30%, 0 0 60px primary/10%
- Gradient text: background-clip text com o gradiente principal
- Border sutil: 1px solid border/50% para separações leves

## Acessibilidade WCAG AA
- Contraste mínimo texto/fundo: 4.5:1
- Contraste mínimo texto grande: 3:1
- Todos os elementos interativos com focus-visible ring
- Touch targets mínimo 44px em mobile

## Responsividade
- Mobile (< 640px): grids 1 coluna, tabs com scroll horizontal
- Tablet (640-1024px): grids 2 colunas
- Desktop (> 1024px): grids 3 colunas, layout max-width 1280px

## Implementação
- Usar CSS custom properties (:root e .dark) como fonte única de verdade
- Tailwind CSS consumindo variáveis via var()
- Componentes shadcn/ui com os tokens aplicados
- next-themes para troca suave de tema claro/escuro
- Manter a proporção 60-30-10 em todas as seções da interface

Seja criativo na aplicação desses tokens — o objetivo é uma interface premium, moderna e coesa. Use as cores e tipografia como guia mas sinta-se livre para criar layouts interessantes, micro-interações sutis e composições visuais que elevem a experiência do usuário.`
}

export function PromptGeneratorPage({
  lightPalette,
  darkPalette,
  gradient,
  fontScale,
  fontFamily,
}: PromptGeneratorPageProps) {
  const [copied, setCopied] = useState(false)
  const [copiedClaude, setCopiedClaude] = useState(false)
  const [regenerateKey, setRegenerateKey] = useState(0)

  const prompt = useMemo(
    () => buildPrompt(lightPalette, darkPalette, gradient, fontScale, fontFamily),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lightPalette, darkPalette, gradient, fontScale, fontFamily, regenerateKey]
  )

  const claudeCommand = `claude "${prompt.replace(/"/g, '\\"').replace(/\n/g, " ").replace(/\s{2,}/g, " ").slice(0, 600)}..."`

  const handleCopyPrompt = async () => {
    await copyToClipboard(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleCopyClaudeCommand = async () => {
    await copyToClipboard(`claude "${prompt.replace(/"/g, '\\"')}"`)
    setCopiedClaude(true)
    setTimeout(() => setCopiedClaude(false), 2500)
  }

  const gradientCSS = `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.via}, ${gradient.to})`

  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card overflow-hidden">
          <div className="relative p-5 sm:p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl glow-accent shrink-0" style={{ background: gradientCSS }}>
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight gradient-text">
                    Prompt para Claude Code
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Resumo estético completo &middot; Pronto para colar no terminal
                  </p>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Este prompt reúne <strong className="text-foreground">todas</strong> as decisões estéticas
                editadas no Orchestrator — cores, tipografia, gradientes, animações e acessibilidade — em
                um único comando para o Claude Code. O prompt dá liberdade criativa ao Claude para adaptar
                a estrutura visual de forma harmoniosa, usando seus tokens como guia.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Color Preview Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tokens ativos no prompt
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Light palette preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground">Tema Claro</span>
                <div className="flex h-6 rounded-lg overflow-hidden border border-border">
                  <div style={{ backgroundColor: lightPalette.primary, width: "60%" }} />
                  <div style={{ backgroundColor: lightPalette.secondary, width: "30%" }} />
                  <div style={{ backgroundColor: lightPalette.accent, width: "10%" }} />
                </div>
              </div>
              {/* Dark palette preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground">Tema Escuro</span>
                <div className="flex h-6 rounded-lg overflow-hidden border border-border">
                  <div style={{ backgroundColor: darkPalette.primary, width: "60%" }} />
                  <div style={{ backgroundColor: darkPalette.secondary, width: "30%" }} />
                  <div style={{ backgroundColor: darkPalette.accent, width: "10%" }} />
                </div>
              </div>
              {/* Gradient preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground">Gradiente</span>
                <div className="h-6 rounded-lg border border-border" style={{ background: gradientCSS }} />
              </div>
              {/* Font preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground">Tipografia</span>
                <div className="h-6 rounded-lg border border-border bg-card flex items-center justify-center">
                  <span className="text-xs font-semibold" style={{ fontFamily: `var(--font-montserrat), ${fontFamily}` }}>
                    {fontFamily} Aa
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Button onClick={handleCopyPrompt} className="flex-1 glow-accent" size="lg">
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-emerald-300" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Prompt copiado!" : "Copiar Prompt Completo"}
        </Button>
        <Button onClick={handleCopyClaudeCommand} variant="outline" size="lg" className="flex-1">
          <Terminal className="mr-2 h-4 w-4" />
          {copiedClaude ? "Comando copiado!" : "Copiar como claude \"...\""}
        </Button>
        <Button
          onClick={() => setRegenerateKey((k) => k + 1)}
          variant="outline"
          size="lg"
          className="sm:w-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
      </motion.div>

      {/* Prompt Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <span className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                Prompt Gerado
              </span>
              <Badge variant="outline" className="text-xs">
                {prompt.length} caracteres
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-h-[500px] overflow-auto rounded-lg bg-[#0d1117] p-4 sm:p-5">
              <pre className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-mono text-emerald-300/90">
                {prompt}
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Claude CLI preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Terminal className="h-5 w-5 text-primary" />
              Comando Claude Code (resumido)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Preview do comando para o terminal. O botão &ldquo;Copiar como claude&rdquo; acima copia o
              comando completo com o prompt inteiro. Cole diretamente no terminal do seu projeto.
            </p>
            <div className="rounded-lg bg-[#0d1117] p-3 sm:p-4 overflow-x-auto">
              <code className="text-[11px] sm:text-xs font-mono text-amber-300/90 break-all leading-relaxed">
                {claudeCommand}
              </code>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggested Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <SuggestedCommands commands={[
          {
            command: 'claude "Leia o prompt do Design System Orchestrator e aplique todas as cores, tipografia, gradientes e animações ao meu projeto Tailwind CSS"',
            description: "Aplica o design system completo de uma vez",
            tag: "Full Setup",
          },
          {
            command: 'claude "Aplique apenas as cores do prompt (regra 60-30-10) no meu projeto, criando CSS variables em globals.css e atualizando tailwind.config"',
            description: "Aplica somente a paleta de cores",
            tag: "Cores",
          },
          {
            command: 'claude "Aplique apenas a tipografia e animações Framer Motion do prompt no meu projeto, sem alterar as cores existentes"',
            description: "Aplica tipografia e animações separadamente",
            tag: "Motion",
          },
          {
            command: 'claude "Audite meu projeto comparando com o design system do prompt e liste todas as divergências encontradas"',
            description: "Verifica conformidade com o design system",
            tag: "Auditoria",
          },
        ]} />
      </motion.div>
    </div>
  )
}

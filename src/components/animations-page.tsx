"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wand2,
  Terminal,
  Copy,
  Check,
  Play,
  RotateCcw,
  MousePointerClick,
  Sparkles,
  Layers,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"

interface AnimationDemo {
  name: string
  description: string
  code: string
  variant: Record<string, unknown>
}

const ANIMATIONS: AnimationDemo[] = [
  {
    name: "Fade In Up",
    description: "Entrada suave com deslizamento para cima",
    code: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>`,
    variant: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
    },
  },
  {
    name: "Scale Bounce",
    description: "Escala com efeito elástico",
    code: `<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
>`,
    variant: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  },
  {
    name: "Slide In Left",
    description: "Deslizamento lateral da esquerda",
    code: `<motion.div
  initial={{ opacity: 0, x: -40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>`,
    variant: {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  {
    name: "Rotate In",
    description: "Entrada com rotação e escala",
    code: `<motion.div
  initial={{ opacity: 0, rotate: -180, scale: 0 }}
  animate={{ opacity: 1, rotate: 0, scale: 1 }}
  transition={{ duration: 0.6 }}
>`,
    variant: {
      initial: { opacity: 0, rotate: -180, scale: 0 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      transition: { duration: 0.6 },
    },
  },
  {
    name: "Hover Lift",
    description: "Elevação ao passar o mouse",
    code: `<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400 }}
>`,
    variant: {
      whileHover: { y: -8, scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400 },
    },
  },
  {
    name: "Pulse Glow",
    description: "Pulso luminoso contínuo para destaque",
    code: `<motion.div
  animate={{
    boxShadow: [
      "0 0 0 0 rgba(37,99,235,0.4)",
      "0 0 0 10px rgba(37,99,235,0)",
    ],
  }}
  transition={{ duration: 1.5, repeat: Infinity }}
>`,
    variant: {
      animate: {
        boxShadow: [
          "0 0 0 0 rgba(37,99,235,0.4)",
          "0 0 0 10px rgba(37,99,235,0)",
        ],
      },
      transition: { duration: 1.5, repeat: Infinity },
    },
  },
]

const CLAUDE_COMMANDS = [
  {
    command:
      'claude "Aplique a paleta 60-30-10 do ds-orchestrator-config.json no meu projeto Tailwind"',
    description: "Aplica toda a configuração do Orchestrator ao projeto",
    tag: "Setup",
  },
  {
    command:
      'claude "Corrija todos os contrastes WCAG AA nos componentes, usando as cores do design system"',
    description: "Corrige automaticamente problemas de acessibilidade",
    tag: "WCAG",
  },
  {
    command:
      'claude "Adicione dark mode em todos os componentes usando as CSS variables do design system"',
    description: "Implementa tema escuro com base nos tokens",
    tag: "Dark Mode",
  },
  {
    command:
      'claude "Refatore a tipografia do projeto para usar a escala Montserrat definida no design system"',
    description: "Aplica a escala tipográfica em todo o projeto",
    tag: "Typography",
  },
  {
    command:
      'claude "Adicione animações Framer Motion com fade-in-up em todos os cards e seções"',
    description: "Aplica animações de entrada nos componentes",
    tag: "Motion",
  },
  {
    command:
      'claude "Gere um componente de glass-card reutilizável com backdrop-blur e border sutil"',
    description: "Cria componente glassmorphism padronizado",
    tag: "Component",
  },
  {
    command:
      'claude "Audite o projeto e liste todos os locais onde as cores não seguem a regra 60-30-10"',
    description: "Identifica violações da regra de distribuição de cores",
    tag: "Audit",
  },
  {
    command:
      'claude "Adicione partículas interativas com tsparticles no background do hero"',
    description: "Implementa background animado com partículas",
    tag: "Particles",
  },
]

function AnimationCard({ demo }: { demo: AnimationDemo }) {
  const [playing, setPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const replay = () => {
    setKey((k) => k + 1)
    setPlaying(true)
  }

  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{demo.name}</h3>
            <p className="text-[10px] text-muted-foreground">{demo.description}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={replay}>
            {playing ? (
              <RotateCcw className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>

        {/* Demo Area */}
        <div className="flex h-20 items-center justify-center rounded-lg bg-secondary/30 border border-border/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              className="h-12 w-12 rounded-xl bg-primary glow-accent flex items-center justify-center"
              {...demo.variant}
              onAnimationComplete={() => setPlaying(false)}
            >
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </motion.div>
          </AnimatePresence>
        </div>

        <CodeBlock code={demo.code} language="jsx" title={demo.name} />
      </CardContent>
    </Card>
  )
}

function CommandCard({ command, description, tag }: { command: string; description: string; tag: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="group flex items-start gap-2 sm:gap-3 rounded-lg border border-border/50 bg-card/50 p-2.5 sm:p-3 hover:bg-secondary/30 active:bg-secondary/40 transition-colors"
      whileHover={{ x: 4 }}
    >
      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Badge variant="secondary" className="text-[9px] px-1.5">
            {tag}
          </Badge>
          <p className="text-[10px] text-muted-foreground">{description}</p>
        </div>
        <code className="block text-[10px] sm:text-[11px] font-mono text-foreground/80 break-all leading-relaxed">
          {command}
        </code>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 shrink-0 p-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3 w-3 text-emerald-400" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
    </motion.div>
  )
}

export function AnimationsPage() {
  return (
    <div className="space-y-6">
      {/* Animations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MousePointerClick className="h-5 w-5 text-primary" />
              Animações Framer Motion
              <Badge variant="secondary" className="text-[10px] ml-auto">
                {ANIMATIONS.length} presets
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {ANIMATIONS.map((demo) => (
                <AnimationCard key={demo.name} demo={demo} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CSS Animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Layers className="h-5 w-5 text-primary" />
              CSS do Design System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`.glass-card {
  background: hsl(var(--card) / 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid hsl(var(--border) / 0.5);
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent), #7c3aed, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glow-accent {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3),
              0 0 40px hsl(var(--primary) / 0.1);
}

/* Transição suave entre temas */
* {
  transition: background-color 300ms ease,
              border-color 300ms ease,
              color 300ms ease;
}`}
              language="css"
              title="globals.css"
              collapsible={false}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggested Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wand2 className="h-5 w-5 text-primary" />
              Comandos Sugeridos — Claude Code
              <Badge variant="secondary" className="text-[10px] ml-auto">
                {CLAUDE_COMMANDS.length} comandos
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {CLAUDE_COMMANDS.map((cmd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <CommandCard {...cmd} />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { BookOpen, Terminal, Layers, ArrowRight, Sparkles, Zap, Shield, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"

const BRIDGE_WORKFLOW = `# 1. Gerar configuracao no Orchestrator
#    Ajuste cores, tipografia e gradientes na UI

# 2. Exportar JSON de configuracao
#    Clique em "Gerar Configuracao JSON"

# 3. Executar ponte Claude Code
claude "Leia o arquivo ds-orchestrator-config.json \\
  e atualize o tailwind.config.js, corrigindo \\
  os contrastes WCAG AA nos componentes existentes. \\
  Use a paleta 60-30-10."

# 4. Claude Code vai:
#    - Ler a configuracao exportada
#    - Atualizar tailwind.config.js
#    - Corrigir contrastes WCAG AA
#    - Aplicar paleta 60-30-10 automaticamente`

const TAILWIND_INTEGRATION = `// tailwind.config.js (gerado automaticamente)
module.exports = {
  theme: {
    extend: {
      colors: {
        // 60% — Cor base dominante
        primary: { DEFAULT: "var(--color-primary)" },
        // 30% — Cor de suporte
        secondary: { DEFAULT: "var(--color-secondary)" },
        // 10% — Cor de acento (CTA, links)
        accent: { DEFAULT: "var(--color-accent)" },
      },
      // Escala tipografica Montserrat
      fontSize: {
        display: "3.75rem",
        h1: "2.25rem",
        h2: "1.5rem",
        body: "1rem",
      },
    },
  },
}`

const principles = [
  {
    icon: Palette,
    title: "Regra 60-30-10",
    description:
      "A distribuicao classica de design de interiores aplicada a interfaces: 60% cor dominante, 30% complementar, 10% acento. Garante harmonia visual e hierarquia clara.",
  },
  {
    icon: Shield,
    title: "WCAG AA Nativo",
    description:
      "Toda combinacao de cor e verificada automaticamente contra os criterios WCAG 2.1 AA (contraste minimo 4.5:1 para texto normal, 3:1 para texto grande).",
  },
  {
    icon: Zap,
    title: "Ponte Claude Code",
    description:
      "O JSON exportado serve como contrato entre o designer e o Claude Code. Um unico comando CLI aplica toda a configuracao visual no projeto.",
  },
  {
    icon: Sparkles,
    title: "Tokens Atomicos",
    description:
      "CSS custom properties como fonte unica de verdade. Dark mode, gradientes e tipografia sao derivados dos mesmos tokens base.",
  },
]

export function ManifestoPage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card overflow-hidden">
          <div className="relative p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary glow-accent">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight gradient-text">
                    Manifesto
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Design System Orchestrator &middot; Ponte Claude Code
                  </p>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                O Design System Orchestrator e uma ferramenta visual que transforma decisoes de
                design em tokens padronizados, prontos para serem consumidos por qualquer projeto
                Tailwind CSS. A ponte com o Claude Code elimina o gap entre design e implementacao,
                permitindo que configuracoes visuais sejam aplicadas ao codigo com um unico comando.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Principles Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          >
            <Card className="glass-card h-full">
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bridge Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Terminal className="h-5 w-5 text-primary" />
              Fluxo da Ponte Claude Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Visual Pipeline */}
            <div className="flex flex-wrap items-center justify-center gap-2 py-4">
              {["UI Orchestrator", "JSON Config", "Claude Code CLI", "tailwind.config.js"].map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="whitespace-nowrap px-3 py-1.5 text-xs"
                    >
                      <span className="mr-1.5 font-bold text-primary">{i + 1}</span>
                      {step}
                    </Badge>
                    {i < 3 && (
                      <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                )
              )}
            </div>

            <CodeBlock
              code={BRIDGE_WORKFLOW}
              language="bash"
              title="Workflow"
              collapsible={false}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Tailwind Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Layers className="h-5 w-5 text-primary" />
              Integracao Tailwind CSS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              O Orchestrator gera um JSON que mapeia diretamente para a estrutura do{" "}
              <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">
                tailwind.config.js
              </code>
              . CSS custom properties garantem transicoes suaves entre temas claro e escuro,
              enquanto a escala tipografica segue a proporcao aurea para hierarquia visual.
            </p>
            <CodeBlock
              code={TAILWIND_INTEGRATION}
              language="js"
              title="tailwind.config.js"
              collapsible={false}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Terminal,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Palette,
  Eye,
  GitBranch,
  RefreshCw,
  Target,
  Code2,
  Lightbulb,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { SuggestedCommands } from "@/components/suggested-commands"

const BRIDGE_WORKFLOW = `# 1. Gerar configuração no Orchestrator
#    Ajuste cores, tipografia e gradientes na UI

# 2. Exportar JSON de configuração
#    Clique em "Gerar Configuração JSON"

# 3. Executar ponte Claude Code
claude "Leia o arquivo ds-orchestrator-config.json \\
  e atualize o tailwind.config.js, corrigindo \\
  os contrastes WCAG AA nos componentes existentes. \\
  Use a paleta 60-30-10."

# 4. Claude Code vai:
#    - Ler a configuração exportada
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
      // Escala tipográfica Montserrat
      fontSize: {
        display: "3.75rem",
        h1: "2.25rem",
        h2: "1.5rem",
        body: "1rem",
      },
    },
  },
}`

const CSS_VARIABLES_EXAMPLE = `:root {
  /* Tokens atômicos — fonte única de verdade */
  --color-primary: #f4f4f5;     /* 60% base */
  --color-secondary: #3f3f46;   /* 30% suporte */
  --color-accent: #2563eb;      /* 10% acento */
  --color-background: #fafafa;
  --color-foreground: #18181b;
  --color-muted: #71717a;
  --color-border: #e4e4e7;
}

.dark {
  --color-primary: #18181b;
  --color-secondary: #a1a1aa;
  --color-accent: #3b82f6;
  --color-background: #09090b;
  --color-foreground: #fafafa;
  --color-muted: #52525b;
  --color-border: #27272a;
}`

const principles = [
  {
    icon: Palette,
    title: "Regra 60-30-10",
    description:
      "A distribuição clássica de design de interiores aplicada a interfaces digitais: 60% cor dominante para áreas de fundo, 30% cor complementar para navegação e elementos de suporte, 10% cor de acento para CTAs e destaques. Essa proporção garante harmonia visual e hierarquia clara sem sobrecarregar o usuário.",
  },
  {
    icon: Shield,
    title: "WCAG AA Nativo",
    description:
      "Toda combinação de cor é verificada automaticamente contra os critérios WCAG 2.1 AA. O contraste mínimo exigido é de 4.5:1 para texto normal e 3:1 para texto grande (≥18px ou ≥14px bold). O Orchestrator sinaliza visualmente os pares que falham e sugere correções.",
  },
  {
    icon: Zap,
    title: "Ponte Claude Code",
    description:
      "O JSON exportado serve como contrato formal entre o designer e o Claude Code. Um único comando CLI aplica toda a configuração visual no projeto — cores, tipografia, gradientes e border-radius. Elimina o retrabalho manual de transcrever decisões de design para código.",
  },
  {
    icon: Sparkles,
    title: "Tokens Atômicos",
    description:
      "CSS custom properties como fonte única de verdade. Modo escuro, gradientes e tipografia são todos derivados dos mesmos tokens base, garantindo consistência automática. Alterações propagam-se instantaneamente por todo o sistema.",
  },
  {
    icon: Eye,
    title: "Preview em Tempo Real",
    description:
      "Cada alteração de cor, tipografia ou gradiente é refletida instantaneamente no preview visual. O layout simulado mostra exatamente como a distribuição 60-30-10 se aplica a um site real, incluindo navbar, hero, cards e footer.",
  },
  {
    icon: GitBranch,
    title: "Versionamento de Design",
    description:
      "O JSON exportado pode ser versionado junto ao código no Git. Isso cria um histórico rastreável de decisões de design — quando a paleta mudou, por que o acento foi alterado, quem aprovou a nova escala tipográfica.",
  },
]

const howItWorksSteps = [
  {
    number: "01",
    title: "Configure Visualmente",
    description: "Use a interface do Orchestrator para ajustar cores (com presets de cinza e acento), definir a escala tipográfica Montserrat, e configurar gradientes com preview ao vivo.",
  },
  {
    number: "02",
    title: "Valide Acessibilidade",
    description: "A aba WCAG verifica automaticamente 10 combinações de contraste (5 por tema). Corrija os pares que falharem antes de exportar — o sistema indica o nível exato (AAA, AA, AA Large ou Fail).",
  },
  {
    number: "03",
    title: "Exporte a Configuração",
    description: "Gere o JSON com todas as decisões de design: paleta light/dark, gradiente, escala de fontes e border-radius. Copie o JSON, faça download, ou copie o comando Claude Code diretamente.",
  },
  {
    number: "04",
    title: "Execute a Ponte",
    description: "Cole o comando no terminal. O Claude Code lê o JSON, atualiza o tailwind.config.js, aplica as CSS variables em globals.css, e corrige contrastes automaticamente nos componentes existentes.",
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
          <div className="relative p-5 sm:p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary glow-accent shrink-0">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight gradient-text">
                    Manifesto
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Design System Orchestrator &middot; Ponte Claude Code
                  </p>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                O Design System Orchestrator é uma ferramenta visual que transforma decisões de
                design em tokens padronizados, prontos para serem consumidos por qualquer projeto
                Tailwind CSS. A ponte com o Claude Code elimina o gap entre design e implementação,
                permitindo que configurações visuais sejam aplicadas ao código com um único comando.
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Nascido da necessidade de manter consistência visual em projetos que evoluem
                rapidamente, o Orchestrator centraliza todas as decisões estéticas — cores,
                tipografia, gradientes e espaçamento — em uma interface intuitiva que qualquer
                membro da equipe pode usar, independente do nível técnico.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Principles Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-primary" />
              Princípios Fundamentais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <div className="flex gap-3 rounded-lg border border-border/50 bg-card/50 p-3 sm:p-4 h-full">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <p.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <RefreshCw className="h-5 w-5 text-primary" />
              Como Funciona — Passo a Passo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {howItWorksSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="flex gap-3 sm:gap-4 rounded-lg border border-border/50 bg-card/50 p-3 sm:p-4"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4">
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

            <p className="text-xs text-muted-foreground leading-relaxed">
              A ponte funciona em uma direção: do visual para o código. O Orchestrator não lê
              o projeto existente — ele gera uma configuração nova que o Claude Code sabe
              interpretar e aplicar. Isso garante que o design system seja a fonte de verdade,
              não o contrário. Conflitos são resolvidos a favor das decisões visuais mais recentes.
            </p>

            <CodeBlock
              code={BRIDGE_WORKFLOW}
              language="bash"
              title="Workflow"
              collapsible={false}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* CSS Variables Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Code2 className="h-5 w-5 text-primary" />
              Arquitetura de Tokens CSS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Os tokens são implementados como CSS custom properties no <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">:root</code> (tema claro)
              e <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">.dark</code> (tema escuro).
              Essa abordagem permite transições suaves entre temas (300ms ease) e funciona com qualquer
              framework — React, Vue, Svelte ou HTML puro. O Tailwind consome essas variáveis via
              <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">var()</code>, mantendo uma única fonte de verdade.
            </p>
            <CodeBlock
              code={CSS_VARIABLES_EXAMPLE}
              language="css"
              title="globals.css — Tokens"
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
              Integração Tailwind CSS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              O Orchestrator gera um JSON que mapeia diretamente para a estrutura do{" "}
              <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">
                tailwind.config.js
              </code>
              . As cores são mapeadas para classes utilitárias (<code className="bg-secondary px-1 rounded text-foreground">bg-primary</code>,{" "}
              <code className="bg-secondary px-1 rounded text-foreground">text-accent</code>), e a escala tipográfica
              segue a proporção áurea para hierarquia visual. Componentes shadcn/ui consomem esses tokens nativamente.
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

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Stack Tecnológico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Next.js 16", desc: "App Router com Turbopack para compilação ultrarrápida" },
                { name: "Tailwind CSS v4", desc: "@theme inline e @custom-variant para tokens nativos" },
                { name: "shadcn/ui", desc: "Componentes base-nova com @base-ui/react primitives" },
                { name: "Framer Motion", desc: "Animações declarativas com spring physics e gestos" },
                { name: "next-themes", desc: "Troca de tema claro/escuro com transições suaves" },
                { name: "tsparticles", desc: "Background interativo com partículas responsivas" },
                { name: "Montserrat", desc: "Família tipográfica com 7 pesos (300–900)" },
                { name: "Claude Code", desc: "CLI que aplica configurações do Orchestrator ao projeto" },
                { name: "Vercel", desc: "Deploy contínuo com preview por branch" },
              ].map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="rounded-lg border border-border/50 bg-card/50 p-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.04 }}
                >
                  <h4 className="text-xs font-semibold text-foreground">{tech.name}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggested Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <SuggestedCommands commands={[
          {
            command: 'claude "Leia o Manifesto do Design System Orchestrator e configure o projeto seguindo todos os princípios descritos"',
            description: "Aplica toda a filosofia do Orchestrator ao projeto",
            tag: "Setup",
          },
          {
            command: 'claude "Implemente o padrão de tokens CSS com variáveis :root e .dark conforme a arquitetura do Design System Orchestrator"',
            description: "Configura a arquitetura de tokens do zero",
            tag: "Tokens",
          },
          {
            command: 'claude "Integre o Design System Orchestrator com CI/CD: adicione validação de contraste WCAG no pipeline de build"',
            description: "Automatiza verificação de acessibilidade no CI",
            tag: "CI/CD",
          },
          {
            command: 'claude "Crie um componente ThemeProvider com next-themes, suportando light/dark com transição suave de 300ms e persistência em localStorage"',
            description: "Implementa troca de tema com persistência",
            tag: "Tema",
          },
          {
            command: 'claude "Gere um design-tokens.ts com tipos TypeScript para ColorPalette, FontScale e GradientConfig, incluindo paletas padrão light e dark"',
            description: "Cria a camada tipada de tokens do sistema",
            tag: "TypeScript",
          },
          {
            command: 'claude "Adicione Framer Motion em todos os componentes de card e seção com fade-in-up staggered (delay incremental de 0.06s)"',
            description: "Aplica animações de entrada coordenadas",
            tag: "Motion",
          },
          {
            command: 'claude "Configure o Tailwind CSS v4 com @theme inline consumindo as CSS custom properties do design system para todas as cores, fontes e border-radius"',
            description: "Integra tokens CSS com Tailwind v4",
            tag: "Tailwind",
          },
          {
            command: 'claude "Crie um layout responsivo com glass-card (backdrop-blur), gradientes e partículas tsparticles, seguindo a regra 60-30-10 em todas as seções"',
            description: "Monta o layout completo com efeitos visuais",
            tag: "Layout",
          },
          {
            command: 'claude "Adicione meta tags Open Graph, favicon e manifest.json para tornar o projeto PWA-ready com título e descrição do Design System Orchestrator"',
            description: "Prepara o projeto para SEO e instalação como PWA",
            tag: "PWA",
          },
          {
            command: 'claude "Audite todo o projeto e gere um relatório de consistência: tokens não utilizados, cores hardcoded, componentes sem dark mode e violações WCAG"',
            description: "Gera relatório completo de conformidade do design system",
            tag: "Auditoria",
          },
        ]} />
      </motion.div>
    </div>
  )
}

"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileJson, Copy, Check, Terminal, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SuggestedCommands } from "@/components/suggested-commands"
import { copyToClipboard } from "@/lib/clipboard"
import type { DesignSystemConfig } from "@/lib/design-tokens"
import { generateTailwindConfig } from "@/lib/design-tokens"

interface ConfigGeneratorProps {
  generateConfig: () => DesignSystemConfig
}

export function ConfigGenerator({ generateConfig }: ConfigGeneratorProps) {
  const [config, setConfig] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [copiedCommand, setCopiedCommand] = useState(false)

  const handleGenerate = useCallback(() => {
    const dsConfig = generateConfig()
    const json = generateTailwindConfig(dsConfig)
    setConfig(json)
  }, [generateConfig])

  const handleCopy = useCallback(async () => {
    if (!config) return
    await copyToClipboard(config)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [config])

  const handleCopyCommand = useCallback(async () => {
    if (!config) return
    const parsed = JSON.parse(config)
    await copyToClipboard(parsed.claudeCodeCommand || "")
    setCopiedCommand(true)
    setTimeout(() => setCopiedCommand(false), 2000)
  }, [config])

  const handleDownload = useCallback(() => {
    if (!config) return
    const blob = new Blob([config], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ds-orchestrator-config.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [config])

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileJson className="h-5 w-5 text-primary" />
          Gerador de Configuração
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Gere o arquivo JSON de configuração para integrar com o{" "}
          <span className="font-semibold text-foreground">Claude Code</span> e atualizar
          automaticamente seu <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">tailwind.config.js</code>.
        </p>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button onClick={handleGenerate} className="w-full glow-accent" size="lg">
            <FileJson className="mr-2 h-4 w-4" />
            Gerar Configuração JSON
          </Button>
        </motion.div>

        <AnimatePresence>
          {config && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  {copied ? "Copiado!" : "Copiar JSON"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyCommand}>
                  <Terminal className="mr-1.5 h-3.5 w-3.5" />
                  {copiedCommand ? "Comando copiado!" : "Copiar Comando Claude"}
                </Button>
              </div>

              {/* Claude Code Command */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <Badge variant="secondary" className="text-[10px]">
                    Claude Code
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cole o comando no terminal para que o Claude Code atualize seu{" "}
                  <code className="bg-secondary px-1 rounded">tailwind.config.js</code>{" "}
                  com base nesta configuração, corrigindo contrastes WCAG AA automaticamente.
                </p>
              </div>

              {/* JSON Preview */}
              <div className="relative max-h-72 overflow-auto rounded-lg bg-[#0d1117] p-4">
                <pre className="text-xs leading-relaxed">
                  <code className="text-emerald-300/90">{config}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <SuggestedCommands commands={[
          {
            command: 'claude "Leia o arquivo ds-orchestrator-config.json e atualize o tailwind.config.js com todas as cores, tipografia e gradientes definidos"',
            description: "Aplica a configuração completa ao Tailwind",
            tag: "Config",
          },
          {
            command: 'claude "Compare o tailwind.config.js atual com o JSON do Orchestrator e liste as diferenças"',
            description: "Verifica divergências entre config e projeto",
            tag: "Diff",
          },
        ]} />
      </CardContent>
    </Card>
  )
}

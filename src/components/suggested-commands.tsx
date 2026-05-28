"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, Copy, Check, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { copyToClipboard } from "@/lib/clipboard"

interface Command {
  command: string
  description: string
  tag: string
}

function CommandItem({ command, description, tag }: Command) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="group flex items-start gap-2 sm:gap-3 rounded-lg border border-border/50 bg-card/50 p-2.5 sm:p-3 hover:bg-secondary/30 active:bg-secondary/40 transition-colors"
      whileHover={{ x: 4 }}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary">
        <Terminal className="h-3.5 w-3.5 text-primary" />
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

export function SuggestedCommands({ commands }: { commands: Command[] }) {
  return (
    <div className="space-y-3 rounded-xl border border-border/60 bg-card/30 p-4">
      <div className="flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-primary" />
        <h4 className="text-xs font-semibold text-foreground">
          Comandos Sugeridos — Claude Code
        </h4>
        <Badge variant="secondary" className="text-[9px] ml-auto">
          {commands.length} comandos
        </Badge>
      </div>
      <div className="space-y-1.5">
        {commands.map((cmd, i) => (
          <CommandItem key={i} {...cmd} />
        ))}
      </div>
    </div>
  )
}

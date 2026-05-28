"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  collapsible?: boolean
  defaultOpen?: boolean
}

export function CodeBlock({
  code,
  language = "css",
  title,
  collapsible = true,
  defaultOpen = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(defaultOpen)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const show = !collapsible || open

  return (
    <div className="rounded-lg border border-border/60 overflow-hidden">
      <div
        className="flex items-center justify-between bg-secondary/40 px-3 py-1.5 cursor-pointer"
        onClick={() => collapsible && setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {collapsible && (
            open ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />
          )}
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            {title || language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-[10px]"
          onClick={(e) => {
            e.stopPropagation()
            handleCopy()
          }}
        >
          {copied ? (
            <Check className="mr-1 h-3 w-3 text-emerald-400" />
          ) : (
            <Copy className="mr-1 h-3 w-3" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
      {show && (
        <motion.div
          initial={collapsible ? { height: 0, opacity: 0 } : false}
          animate={{ height: "auto", opacity: 1 }}
          className="max-h-64 overflow-auto bg-[#0d1117] p-3"
        >
          <pre className="text-xs leading-relaxed">
            <code className="text-emerald-300/90">{code}</code>
          </pre>
        </motion.div>
      )}
    </div>
  )
}

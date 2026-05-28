import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ParticlesProviderWrapper } from "@/components/particles-provider-wrapper"
import "./globals.css"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Design System Orchestrator",
  description: "Painel visual para gerenciar consistencia estetica com Tailwind, shadcn/ui e integracao Claude Code",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ParticlesProviderWrapper>
            <TooltipProvider>{children}</TooltipProvider>
          </ParticlesProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

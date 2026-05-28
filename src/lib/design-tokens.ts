export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
}

export interface GradientConfig {
  from: string
  via: string
  to: string
  angle: number
}

export interface FontScale {
  display: string
  h1: string
  h2: string
  h3: string
  body: string
  small: string
  caption: string
}

export interface DesignSystemConfig {
  name: string
  version: string
  colorRule: "60-30-10"
  palette: {
    light: ColorPalette
    dark: ColorPalette
  }
  gradient: GradientConfig
  fontFamily: string
  fontScale: FontScale
  borderRadius: string
  generatedAt: string
}

export const DEFAULT_LIGHT_PALETTE: ColorPalette = {
  primary: "#f4f4f5",
  secondary: "#3f3f46",
  accent: "#2563eb",
  background: "#fafafa",
  foreground: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
}

export const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: "#18181b",
  secondary: "#a1a1aa",
  accent: "#3b82f6",
  background: "#09090b",
  foreground: "#fafafa",
  muted: "#52525b",
  border: "#27272a",
}

export const DEFAULT_GRADIENT: GradientConfig = {
  from: "#2563eb",
  via: "#7c3aed",
  to: "#06b6d4",
  angle: 135,
}

export const DEFAULT_FONT_SCALE: FontScale = {
  display: "3.75rem",
  h1: "2.25rem",
  h2: "1.5rem",
  h3: "1.25rem",
  body: "1rem",
  small: "0.875rem",
  caption: "0.75rem",
}

export const GRAY_PRESETS = {
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
}

export const ACCENT_PRESETS = {
  blue: { name: "Blue", value: "#2563eb", dark: "#3b82f6" },
  violet: { name: "Violet", value: "#7c3aed", dark: "#8b5cf6" },
  cyan: { name: "Cyan", value: "#0891b2", dark: "#06b6d4" },
  amber: { name: "Amber", value: "#d97706", dark: "#f59e0b" },
  emerald: { name: "Emerald", value: "#059669", dark: "#10b981" },
  rose: { name: "Rose", value: "#e11d48", dark: "#f43f5e" },
}

export function generateTailwindConfig(config: DesignSystemConfig): string {
  return JSON.stringify(
    {
      _meta: {
        generator: "Design System Orchestrator",
        version: config.version,
        generatedAt: config.generatedAt,
        colorRule: config.colorRule,
      },
      theme: {
        extend: {
          colors: {
            background: {
              DEFAULT: config.palette.light.background,
              dark: config.palette.dark.background,
            },
            foreground: {
              DEFAULT: config.palette.light.foreground,
              dark: config.palette.dark.foreground,
            },
            primary: {
              DEFAULT: config.palette.light.accent,
              dark: config.palette.dark.accent,
              "60": config.palette.light.primary,
              "60-dark": config.palette.dark.primary,
            },
            secondary: {
              DEFAULT: config.palette.light.secondary,
              dark: config.palette.dark.secondary,
            },
            muted: {
              DEFAULT: config.palette.light.muted,
              dark: config.palette.dark.muted,
            },
            border: {
              DEFAULT: config.palette.light.border,
              dark: config.palette.dark.border,
            },
            gradient: {
              from: config.gradient.from,
              via: config.gradient.via,
              to: config.gradient.to,
            },
          },
          fontFamily: {
            sans: [config.fontFamily, "ui-sans-serif", "system-ui", "sans-serif"],
          },
          fontSize: config.fontScale,
          borderRadius: {
            DEFAULT: config.borderRadius,
          },
        },
      },
      cssVariables: {
        light: config.palette.light,
        dark: config.palette.dark,
        gradient: config.gradient,
        fontScale: config.fontScale,
      },
      claudeCodeCommand: `claude "Leia o arquivo de configuração gerado pelo Design System Orchestrator e atualize o tailwind.config.js, corrigindo os contrastes de acessibilidade WCAG AA nos componentes existentes. Use a paleta 60-30-10: 60% ${config.palette.light.primary}, 30% ${config.palette.light.secondary}, 10% ${config.palette.light.accent}. Fonte: ${config.fontFamily}."`,
    },
    null,
    2
  )
}

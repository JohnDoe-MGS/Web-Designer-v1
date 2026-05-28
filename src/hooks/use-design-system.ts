"use client"

import { useState, useCallback } from "react"
import {
  type ColorPalette,
  type GradientConfig,
  type FontScale,
  type DesignSystemConfig,
  DEFAULT_LIGHT_PALETTE,
  DEFAULT_DARK_PALETTE,
  DEFAULT_GRADIENT,
  DEFAULT_FONT_SCALE,
} from "@/lib/design-tokens"

export function useDesignSystem() {
  const [lightPalette, setLightPalette] = useState<ColorPalette>(DEFAULT_LIGHT_PALETTE)
  const [darkPalette, setDarkPalette] = useState<ColorPalette>(DEFAULT_DARK_PALETTE)
  const [gradient, setGradient] = useState<GradientConfig>(DEFAULT_GRADIENT)
  const [fontScale] = useState<FontScale>(DEFAULT_FONT_SCALE)
  const [fontFamily] = useState("Montserrat")
  const [borderRadius, setBorderRadius] = useState("0.625rem")

  const updateLightColor = useCallback(
    (key: keyof ColorPalette, value: string) => {
      setLightPalette((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const updateDarkColor = useCallback(
    (key: keyof ColorPalette, value: string) => {
      setDarkPalette((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const updateGradient = useCallback(
    (key: keyof GradientConfig, value: string | number) => {
      setGradient((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const generateConfig = useCallback((): DesignSystemConfig => {
    return {
      name: "Design System Orchestrator Config",
      version: "1.0.0",
      colorRule: "60-30-10",
      palette: { light: lightPalette, dark: darkPalette },
      gradient,
      fontFamily,
      fontScale,
      borderRadius,
      generatedAt: new Date().toISOString(),
    }
  }, [lightPalette, darkPalette, gradient, fontFamily, fontScale, borderRadius])

  return {
    lightPalette,
    darkPalette,
    gradient,
    fontScale,
    fontFamily,
    borderRadius,
    setBorderRadius,
    updateLightColor,
    updateDarkColor,
    updateGradient,
    setLightPalette,
    setDarkPalette,
    setGradient,
    generateConfig,
  }
}

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.cssText =
    "position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none"
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, text.length)
  let ok = false
  try {
    ok = document.execCommand("copy")
  } catch {
    ok = false
  }
  document.body.removeChild(textarea)
  return ok
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      if (navigator.permissions) {
        const perm = await navigator.permissions
          .query({ name: "clipboard-write" as PermissionName })
          .catch(() => null)
        if (perm && perm.state === "denied") {
          return fallbackCopy(text)
        }
      }
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return fallbackCopy(text)
    }
  }
  return fallbackCopy(text)
}

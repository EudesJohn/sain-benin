/**
 * Logger qui s'affiche uniquement en développement.
 * En production, les logs restent silencieux pour ne pas fuite d'informations.
 */
export function logError(...args: unknown[]): void {
  if (import.meta.env.DEV) {
    console.error(...args)
  }
}

export function logWarn(...args: unknown[]): void {
  if (import.meta.env.DEV) {
    console.warn(...args)
  }
}

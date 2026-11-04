/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional POST endpoint for quote requests. See src/config/business.ts. */
  readonly VITE_REQUEST_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

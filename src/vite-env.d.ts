/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key: contact form messages go straight to Zakia's inbox */
  readonly VITE_WEB3FORMS_KEY?: string
  /** Same key, under the name used on Vercel */
  readonly WEB3FORMS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

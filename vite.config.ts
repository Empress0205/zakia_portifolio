import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Variables starting with these prefixes are available to the site.
  // WEB3FORMS_ lets the contact-form key be named WEB3FORMS_KEY on Vercel.
  envPrefix: ["VITE_", "WEB3FORMS_"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

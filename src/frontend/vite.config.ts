import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

import preact from "@preact/preset-vite"

// https://vite.dev/config/
export default defineConfig({
	build: {
		emptyOutDir: true,
		manifest: true,
		outDir: "../../src/backend/resources/dist",
		rollupOptions: {
			input: {
				main: resolve(__dirname, "../../src/frontend/index.tsx"),
				serviceWorker: resolve(
					__dirname,
					"../../src/frontend/serviceWorker.ts",
				),
			},
		},
	},
	plugins: [preact()],
	publicDir: "./public",
})

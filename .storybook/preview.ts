import type { Preview } from "@storybook/preact-vite"
// biome-ignore lint/correctness/noUnusedImports: Storybook needs this
import { h } from "preact"
import "../src/frontend/styles/index.scss"

const preview: Preview = {
	parameters: {
		controls: {},
	},
}

export default preview

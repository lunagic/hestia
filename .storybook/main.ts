import type { StorybookConfig } from "@storybook/preact-vite"

const config: StorybookConfig = {
	addons: [],
	framework: {
		name: "@storybook/preact-vite",
		options: {
			builder: {
				viteConfigPath: "src/frontend/vite.config.ts",
			},
		},
	},
	stories: ["../src/frontend/**/*stories.@(js|jsx|mjs|ts|tsx)"],
}
export default config

import { LoreCounter } from "."

export default {
	component: LoreCounter,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Hestia/Components/LoreCounter",
}

export const Primary = () => {
	return <LoreCounter />
}

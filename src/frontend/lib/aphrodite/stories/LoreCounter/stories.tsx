import { LoreCounter } from "."

export default {
	component: LoreCounter,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Components/LoreCounter",
}

export const Primary = () => {
	return <LoreCounter />
}

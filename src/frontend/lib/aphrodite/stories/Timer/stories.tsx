import { Timer } from "."

export default {
	component: Timer,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Components/Timer",
}

export const Primary = () => {
	return <Timer />
}

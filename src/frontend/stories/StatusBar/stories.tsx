import { StatusBar } from "."

export default {
	component: StatusBar,
	parameters: {
		layout: "StatusBar",
	},
	tags: ["autodocs"],
	title: "Components/StatusBar",
}

export const Primary = () => {
	return <StatusBar />
}

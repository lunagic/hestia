import { StatusBar } from "."

export default {
	component: StatusBar,
	parameters: {
		layout: "StatusBar",
	},
	tags: ["autodocs"],
	title: "Hestia/Components/StatusBar",
}

export const Primary = () => {
	return <StatusBar />
}

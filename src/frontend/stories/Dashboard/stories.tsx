import { Dashboard } from "."

export default {
	component: Dashboard,
	parameters: {
		layout: "Dashboard",
	},
	tags: ["autodocs"],
	title: "Hestia/Components/Dashboard",
}

export const Primary = () => {
	return <Dashboard />
}

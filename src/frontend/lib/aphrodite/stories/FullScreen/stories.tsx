import { FullScreen } from "."

export default {
	component: FullScreen,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Aphrodite/Components/FullScreen",
}

export const Primary = () => {
	return <FullScreen>Foobar</FullScreen>
}

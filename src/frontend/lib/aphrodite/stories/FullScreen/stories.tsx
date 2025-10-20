import { FullScreen } from "."

export default {
	component: FullScreen,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Components/FullScreen",
}

export const Primary = () => {
	return <FullScreen>Foobar</FullScreen>
}

import { Button } from "."

export default {
	component: Button,
	parameters: {
		layout: "Button",
	},
	tags: ["autodocs"],
	title: "Components/Button",
}

export const Primary = () => {
	return <Button>Foobar</Button>
}

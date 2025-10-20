import { useState } from "preact/hooks"
import { DropDown } from "."

export default {
	component: DropDown,
	parameters: {
		layout: "DropDown",
	},
	tags: ["autodocs"],
	title: "Aphrodite/Components/DropDown",
}

export const Primary = () => {
	const [open, setOpen] = useState(false)
	return (
		<DropDown content={<>Click me</>} open={open} setOpen={setOpen}>
			Foobar
		</DropDown>
	)
}

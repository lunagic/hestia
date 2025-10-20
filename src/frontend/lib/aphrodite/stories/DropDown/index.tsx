import type { CSSProperties } from "preact"
import type { Dispatch } from "preact/compat"
import type { StateUpdater } from "preact/hooks"

type DropDownProps = {
	content: preact.ComponentChildren
	children: preact.ComponentChildren
	style?: CSSProperties
	open: boolean
	setOpen: Dispatch<StateUpdater<boolean>>
}

export const DropDown = (props: DropDownProps) => {
	if (!props.style) {
		props.style = {}
	}

	props.style.position = "relative"

	return (
		<div style={props.style}>
			<div
				onClick={() => {
					props.setOpen(false)
				}}
				style={{
					background: "black",
					inset: 0,
					opacity: ".5",
					position: "fixed",
					visibility: props.open ? "visible" : "hidden",
					zIndex: 99,
				}}
			/>
			<div
				style={{
					zIndex: 100,
				}}
			>
				{props.content}
			</div>
			<div
				style={{
					background: "var(--reset-css-background-secondary)",
					border: "1px solid var(--reset-css-background-tertiary)",
					borderRadius: ".5rem",
					left: ".5rem",
					padding: "1rem",
					position: "absolute",
					top: "calc(100% + .5rem)",
					visibility: props.open ? "visible" : "hidden",
					zIndex: 101,
				}}
			>
				{props.children}
			</div>
		</div>
	)
}

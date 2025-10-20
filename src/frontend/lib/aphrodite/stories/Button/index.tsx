import type { CSSProperties, MouseEventHandler } from "preact/compat"
import styles from "./styles.module.scss"

type ButtonProps = {
	children: preact.ComponentChildren
	onClick?: MouseEventHandler<HTMLButtonElement>
	style?: CSSProperties
}

export const Button = (props: ButtonProps) => {
	return (
		<button
			className={styles.main}
			onClick={props.onClick}
			style={props.style}
			type="button"
		>
			{props.children}
		</button>
	)
}

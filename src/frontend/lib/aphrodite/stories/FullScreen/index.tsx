import type { CSSProperties } from "preact"
import styles from "./styles.module.scss"

type FullScreenProps = {
	children: preact.ComponentChildren
	style?: CSSProperties
}

export const FullScreen = (props: FullScreenProps) => {
	if (!props.style) {
		props.style = {}
	}

	props.style.userSelect = "none"

	return (
		<div className={styles.main} style={props.style}>
			{props.children}
		</div>
	)
}

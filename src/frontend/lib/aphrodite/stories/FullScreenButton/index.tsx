import { Button } from "@lunagic/aphrodite"
import type { Dispatch, StateUpdater } from "preact/hooks"

type FullScreenButtonProps = {
	fullScreen: boolean | null
	setFullScreen: Dispatch<StateUpdater<boolean | null>>
}
export const FullScreenButton = (props: FullScreenButtonProps) => {
	if (props.fullScreen === null) {
		return
	}

	return (
		<Button
			onClick={() => {
				props.setFullScreen((oldValue) => {
					return !oldValue
				})
			}}
		>
			{props.fullScreen && "Exit"} Full Screen
		</Button>
	)
}

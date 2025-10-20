import { Button } from "@lunagic/aphrodite"
import { type Dispatch, type StateUpdater, useEffect } from "preact/hooks"

type FullScreenButtonProps = {
	fullScreen: boolean
	setFullScreen: Dispatch<StateUpdater<boolean>>
}
export const FullScreenButton = (props: FullScreenButtonProps) => {
	// Do nothing if the browser does not allow full screen
	if (!document.body.requestFullscreen) {
		return
	}

	const handleFullscreenChange = () => {
		props.setFullScreen(document.fullscreenElement !== null)
	}

	useEffect(() => {
		if (!props.fullScreen) {
			if (document.fullscreenElement !== null) {
				document.exitFullscreen()
			}
		} else {
			document.documentElement.requestFullscreen()
		}

		document.addEventListener("fullscreenchange", handleFullscreenChange)

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange)
		}
	}, [props.fullScreen])

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

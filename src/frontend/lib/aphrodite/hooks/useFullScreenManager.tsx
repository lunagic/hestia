import {
	type Dispatch,
	type StateUpdater,
	useEffect,
	useState,
} from "preact/hooks"

export function useFullScreenManager(): [
	boolean | null,
	Dispatch<StateUpdater<boolean | null>>,
] {
	const ableToGoFullScreen = document.body.requestFullscreen !== undefined
	const [fullScreen, setFullScreen] = useState<boolean | null>(
		ableToGoFullScreen ? document.fullscreenElement !== null : null,
	)

	const handleFullscreenChange = () => {
		setFullScreen(document.fullscreenElement !== null)
	}

	useEffect(() => {
		if (fullScreen === null) {
			return
		}

		if (!fullScreen) {
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
	}, [fullScreen])

	return [fullScreen, setFullScreen]
}

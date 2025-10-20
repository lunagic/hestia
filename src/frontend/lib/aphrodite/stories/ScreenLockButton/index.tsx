import { Button } from "@lunagic/aphrodite"
import { type Dispatch, type StateUpdater, useEffect } from "preact/hooks"

type ScreenLockButtonProps = {
	screenLocked: boolean
	setScreenLocked: Dispatch<StateUpdater<boolean>>
}

export const ScreenLockButton = (props: ScreenLockButtonProps) => {
	useEffect(() => {
		let wakeLockSentinel: WakeLockSentinel | null = null
		if (props.screenLocked) {
			navigator.wakeLock
				.request()
				.then((wakeLock) => {
					wakeLock.onrelease = () => {
						props.setScreenLocked(false)
					}
					wakeLockSentinel = wakeLock
				})
				.catch((e) => {
					alert(e)
					props.setScreenLocked(false)
				})
		}

		return () => {
			if (wakeLockSentinel) {
				wakeLockSentinel.release()
			}
		}
	}, [props.screenLocked])

	return (
		<Button
			onClick={() => {
				props.setScreenLocked((oldValue) => {
					return !oldValue
				})
			}}
		>
			{props.screenLocked && "Un"}Lock Screen
		</Button>
	)
}

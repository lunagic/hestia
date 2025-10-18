import {
	type Dispatch,
	type StateUpdater,
	useEffect,
	useState,
} from "preact/hooks"
import { time } from "../../internal/time"
import { Button } from "../Button"

type RefreshButtonProps = {
	needsRefresh: boolean
	setNeedsRefresh: Dispatch<StateUpdater<boolean>>
}

export const RefreshButton = (props: RefreshButtonProps) => {
	const interval = time.Second
	const endpoint = "/.vite/manifest.json"

	const [_, setContents] = useState<string | null>(null)

	useEffect(() => {
		const poll = async () => {
			try {
				const response = await fetch(endpoint)
				const newContents = await response.text()

				setContents((oldValue) => {
					if (oldValue !== null && newContents !== oldValue) {
						props.setNeedsRefresh(true)
					}

					return newContents
				})
			} catch (error) {
				console.error("Polling error:", error)
			}

			setTimeout(poll, interval)
		}

		poll()
	}, [])

	if (!props.needsRefresh) {
		return <></>
	}

	return (
		<Button
			onClick={() => {
				location.reload()
			}}
		>
			Refresh Page
		</Button>
	)
}

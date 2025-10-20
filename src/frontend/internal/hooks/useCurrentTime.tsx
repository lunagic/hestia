import { time } from "@lunagic/ares"
import { useEffect, useState } from "preact/hooks"

export function useCurrentTime() {
	const [currentTime, setCurrentTime] = useState(time.Now())

	useEffect(() => {
		const delay = time.Second - (time.Now().Unix() % time.Second)

		const timeout = setTimeout(() => {
			setCurrentTime(time.Now().Truncate(time.Second))

			const interval = setInterval(() => {
				setCurrentTime(time.Now().Truncate(time.Second))
			}, time.Second)

			return () => clearInterval(interval)
		}, delay)

		return () => clearTimeout(timeout)
	}, [])

	return currentTime
}

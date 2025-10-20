import { time } from "@lunagic/ares"
import type { CSSProperties } from "preact/compat"
import { useState } from "preact/hooks"
import { forge } from "../../internal/forge"
import { useCurrentTime } from "../../internal/hooks/useCurrentTime"
import { Button } from "../Button"
import styles from "./styles.module.scss"

export const Timer = () => {
	const currentTime = useCurrentTime()
	const [targetTime, setTargetTime] = useState<time.Time | null>(null)
	const [startTime, setStartTime] = useState(currentTime)

	const startTimer = (target: time.Time) => {
		setStartTime(currentTime)
		setTargetTime(target)
	}

	const options: time.Time[][] = []
	forge.forEachN(4, (i: number) => {
		const roundedDownTime = currentTime.Truncate(time.Hour)

		const subOptions: time.Time[] = [
			roundedDownTime.Add(time.Hour * i),
			roundedDownTime.Add(time.Hour * i + time.Minute * 15),
			roundedDownTime.Add(time.Hour * i + time.Minute * 30),
			roundedDownTime.Add(time.Hour * i + time.Minute * 45),
		]

		options.push(subOptions)
	})

	if (!targetTime) {
		return (
			<div
				style={{
					alignContent: "center",
					alignItems: "center",
					display: "flex",
					flexGrow: 1,
					flexWrap: "wrap",
					gap: "1rem",
					justifyContent: "center",
				}}
			>
				{options.map((subOptions) => {
					return (
						<div
							style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
						>
							{subOptions.map((optionTime) => {
								if (optionTime.Before(currentTime)) {
									return <></>
								}

								return (
									<Button
										onClick={() => {
											startTimer(optionTime)
										}}
									>
										{forge.DisplayTime(optionTime)}
									</Button>
								)
							})}
						</div>
					)
				})}
			</div>
		)
	}

	// const adjustedStartTime = startTime.Add(time.Second)
	let durationRemainingActual = targetTime.Sub(currentTime)

	const targetTimeAdjusted = targetTime.Add(time.Second * -1)

	let durationRemaining = targetTimeAdjusted.Sub(currentTime)

	const durationTotal = targetTimeAdjusted.Sub(startTime)
	const durationElapsed = durationTotal - durationRemaining

	let progressPercentage = (durationElapsed / durationTotal) * 100

	if (durationRemainingActual <= 0) {
		durationRemainingActual = 0
	}

	if (durationRemaining <= 0) {
		durationRemaining = 0
	}

	if (progressPercentage >= 100) {
		progressPercentage = 100
	}

	const progressBarStyle: CSSProperties = {
		height: "100%",
		minHeight: "3rem",
		transition: "width 1s linear",
		width: `${progressPercentage}%`,
	}

	let progressBarClassName = ""
	if (targetTime.Sub(currentTime) <= 0) {
		progressBarClassName = styles.progressBarBlink
		progressBarStyle.backgroundColor = "#ae0000"
	} else if (durationRemaining <= 5 * time.Minute) {
		progressBarStyle.backgroundColor = "#ae0000"
	} else if (durationRemaining <= 10 * time.Minute) {
		progressBarStyle.backgroundColor = "orange"
	} else {
		progressBarStyle.backgroundColor = "var(--reset-css-accent-primary)"
	}

	return (
		<div
			className={styles.main}
			style={{
				display: "flex",
				flexDirection: "column",
				flexGrow: "1",
				gap: "1rem",
			}}
		>
			<div
				onClick={() => {
					setTargetTime(null)
				}}
				style={{
					cursor: "pointer",
					display: "flex",
					fontFamily: "monospace",
					fontSize: "15dvw",
					justifyContent: "center",
				}}
			>
				{forge.DurationToClock(durationRemainingActual)}
			</div>
			<div
				style={{
					flexGrow: "1",
					position: "relative",
				}}
			>
				<div className={progressBarClassName} style={progressBarStyle} />
			</div>
		</div>
	)
}

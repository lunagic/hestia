import type { CSSProperties } from "preact"
import { type Dispatch, type StateUpdater, useState } from "preact/hooks"

type PlayerProps = {
	score: number
	setScore: Dispatch<StateUpdater<number>>
	style?: CSSProperties
}

const Player = (props: PlayerProps) => {
	const style = props.style || {}

	style.display = "grid"
	style.gap = "1rem"
	style.gridTemplateColumns = "1fr 1fr 1fr"

	return (
		<div style={style}>
			<div
				onClick={() => {
					props.setScore((oldValue) => {
						if (oldValue <= 0) {
							return oldValue
						}
						return oldValue - 1
					})
				}}
				style={{
					alignItems: "center",
					cursor: "pointer",
					display: "flex",
					fontSize: "2rem",
					justifyContent: "center",
					opacity: ".5",
				}}
			>
				-1
			</div>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					fontSize: "10rem",
					justifyContent: "center",
				}}
			>
				{props.score}
			</div>
			<div
				onClick={() => {
					props.setScore((oldValue) => {
						if (oldValue >= 20) {
							return oldValue
						}

						return oldValue + 1
					})
				}}
				style={{
					alignItems: "center",
					cursor: "pointer",
					display: "flex",
					fontSize: "2rem",
					justifyContent: "center",
					opacity: ".5",
				}}
			>
				+1
			</div>
		</div>
	)
}

export const LoreCounter = () => {
	const [player1, setPlayer1] = useState<number>(0)
	const [player2, setPlayer2] = useState<number>(0)

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flexGrow: 1,
			}}
		>
			<div
				style={{
					display: "grid",
					flexGrow: 1,
					gap: "1rem",
				}}
			>
				<Player
					score={player1}
					setScore={setPlayer1}
					style={{
						transform: "rotate(180deg)",
					}}
				/>
				<Player score={player2} setScore={setPlayer2} />
			</div>
			<div
				style={{
					display: "flex",
				}}
			>
				<div
					onClick={() => {
						setPlayer1(0)
						setPlayer2(0)
					}}
					style={{
						cursor: "pointer",
						display: "flex",
						flexGrow: "1",
						fontWeight: "bold",
						gap: "1rem",
						justifyContent: "center",
						opacity: ".5",
						padding: "1rem",
					}}
				>
					Reset
				</div>
			</div>
		</div>
	)
}

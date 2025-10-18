import { Timer } from "../Timer"

export const Dashboard = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flexGrow: "1",
				gap: "1rem",
			}}
		>
			<div
				style={{
					display: "flex",
					flexGrow: "1",
					gap: "1rem",
				}}
			>
				<Timer />
			</div>
		</div>
	)
}

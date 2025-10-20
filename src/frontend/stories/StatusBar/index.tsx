import {
	DropDown,
	FullScreenButton,
	RefreshButton,
	ScreenLockButton,
	useBatteryManager,
	useCurrentTime,
	useCurrentWeather,
} from "@lunagic/aphrodite"
import { ares } from "@lunagic/ares"
import { useState } from "preact/hooks"
import { useLocation } from "preact-iso"
import styles from "./styles.module.scss"

export const StatusBar = () => {
	const [open, setOpen] = useState(false)
	const [screenLocked, setScreenLocked] = useState(false)
	const [fullscreen, setFullscreen] = useState(
		document.fullscreenElement !== null,
	)
	const [needsRefresh, setNeedsRefresh] = useState(false)
	const location = useLocation()
	const currentTime = useCurrentTime()
	const currentWeather = useCurrentWeather()
	const batteryManager = useBatteryManager()

	let batteryLevel = <></>
	if (batteryManager && batteryManager.charging === false) {
		batteryLevel = (
			<div>{ares.DurationToClock(batteryManager.dischargingTime * 1000)}</div>
		)
	}

	const statusIcons = []

	if (needsRefresh) {
		statusIcons.push(
			<i
				className="lni lni-refresh-circle-1-clockwise"
				onClick={() => {
					document.location.reload()
				}}
			/>,
		)
	}

	if (!fullscreen) {
		statusIcons.push(
			<i
				class="lni lni-expand-square-4"
				onClick={() => {
					setFullscreen(true)
				}}
			/>,
		)
	}

	if (!screenLocked) {
		statusIcons.push(
			<i
				class="lni lni-locked-2"
				onClick={() => {
					setScreenLocked(true)
				}}
			/>,
		)
	}

	const dropDownContent = (
		<div
			style={{
				display: "flex",
				gap: "1rem",
			}}
		>
			<div
				onClick={() => {
					setOpen((oldValue) => {
						return !oldValue
					})
				}}
				style={{
					alignItems: "center",
					display: "flex",
					fontSize: "1.5rem",
					opacity: ".5",
				}}
			>
				<i className="lni lni-menu-hamburger-1" />
			</div>
			{statusIcons && (
				<div
					style={{
						alignItems: "center",
						display: "flex",
						fontSize: "1rem",
						gap: ".5rem",
					}}
				>
					{statusIcons}
				</div>
			)}
		</div>
	)

	return (
		<div
			className={styles.main}
			style={{
				alignItems: "center",
				display: "flex",
				fontWeight: "bold",
				gap: "1rem",
			}}
		>
			<DropDown content={dropDownContent} open={open} setOpen={setOpen}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						minWidth: "12rem",
					}}
				>
					{location.path !== "/" && (
						<div
							style={{
								alignItems: "center",
								display: "flex",
								fontWeight: "bold",
								gap: "1rem",
								opacity: ".5",
							}}
						>
							<a
								onClick={(e) => {
									e.preventDefault()
									location.route("/")
								}}
								style={{
									cursor: "pointer",
								}}
							>
								Go Home
							</a>
						</div>
					)}
					<RefreshButton
						needsRefresh={needsRefresh}
						setNeedsRefresh={setNeedsRefresh}
					/>
					<ScreenLockButton
						screenLocked={screenLocked}
						setScreenLocked={setScreenLocked}
					/>
					<FullScreenButton
						fullScreen={fullscreen}
						setFullScreen={setFullscreen}
					/>
				</div>
			</DropDown>

			<div style={{ flexGrow: 1 }}>{/* Separator */}</div>

			<div
				style={{
					alignItems: "center",
					display: "flex",
					fontWeight: "bold",
					gap: "1rem",
					opacity: ".5",
				}}
			>
				{batteryLevel}
				{currentWeather.Display && <div>{currentWeather.Display}</div>}
				<div>{ares.DisplayDateAndTime(currentTime)}</div>
			</div>
		</div>
	)
}

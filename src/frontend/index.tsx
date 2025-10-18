import "./styles/index.scss"
import { render } from "preact"
import {
	ErrorBoundary,
	LocationProvider,
	Route,
	Router,
	useLocation,
} from "preact-iso"
import { Button } from "./stories/Button"
import { Dashboard } from "./stories/Dashboard"
import { FullScreen } from "./stories/FullScreen"
import { LoreCounter } from "./stories/LoreCounter"
import { StatusBar } from "./stories/StatusBar"

// window.addEventListener("load", () => {
// 	navigator.serviceWorker.register("/service-worker.js")
// })

export const NotFound = () => {
	return <div>Not found</div>
}
export const Home = () => {
	const location = useLocation()
	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexGrow: 1,
				gap: "1rem",
				justifyContent: "center",
			}}
		>
			<Button
				onClick={() => {
					location.route("/dashboard")
				}}
			>
				Dashboard
			</Button>
			<Button
				onClick={() => {
					location.route("/lore-counter")
				}}
			>
				Lore Counter
			</Button>
		</div>
	)
}

function App() {
	return (
		<LocationProvider>
			<ErrorBoundary>
				<FullScreen>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							flexGrow: "1",
							gap: "1rem",
						}}
					>
						<StatusBar />
						<Router>
							<Route component={Home} path="/" />
							<Route component={Dashboard} path="/dashboard" />
							<Route component={LoreCounter} path="/lore-counter" />
							<Route component={NotFound} path="*" />
						</Router>
					</div>
				</FullScreen>
			</ErrorBoundary>
		</LocationProvider>
	)
}

render(<App />, document.getElementById("app") as HTMLDivElement)

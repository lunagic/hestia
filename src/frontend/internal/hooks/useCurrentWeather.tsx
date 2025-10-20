import { time } from "@lunagic/ares"
import { useEffect, useState } from "preact/hooks"
import { forge } from "../forge"

export type CurrentWeather = {
	Display: string
	Error: string
	TemperatureFahrenheit: number | null
	TemperatureFahrenheitString: string
	TemperatureCelsius: number | null
	TemperatureCelsiusString: string
}

export const useCurrentWeather = (): CurrentWeather => {
	type Location = {
		latitude: number
		longitude: number
	}

	const [temperatureC, setTemperatureC] = useState<number | null>(null)
	const [location, setLocation] = useState<Location | null>(null)
	const [error, setError] = useState<string>("")

	const fetchWeather = async (latitude: number, longitude: number) => {
		try {
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
			)
			const data = await response.json()
			setTemperatureC(data.current_weather.temperature)
		} catch (err) {
			console.error(err)
			setError("Failed to fetch weather data")
		}
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords
				setLocation({ latitude, longitude })
			},
			() => setError("Location access denied"),
		)
	}, [])

	useEffect(() => {
		if (!location) return

		fetchWeather(location.latitude, location.longitude)

		const intervalId = setInterval(() => {
			fetchWeather(location.latitude, location.longitude)
		}, time.Minute * 5)

		return () => clearInterval(intervalId)
	}, [location])

	const temperatureF =
		temperatureC !== null ? (temperatureC * 9) / 5 + 32 : null

	const temperatureFahrenheitString = temperatureF
		? `${Math.round(temperatureF)}°F`
		: ""
	const temperatureCelsiusString = temperatureC
		? `${temperatureC.toFixed(1)}°C`
		: ""
	return {
		Display: forge.PrefersTemperatureFahrenheit()
			? temperatureFahrenheitString
			: temperatureCelsiusString,
		Error: error,
		TemperatureCelsius: temperatureC,
		TemperatureCelsiusString: temperatureCelsiusString,
		TemperatureFahrenheit: temperatureF,
		TemperatureFahrenheitString: temperatureFahrenheitString,
	}
}

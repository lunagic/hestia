import { time } from "@lunagic/ares"

export namespace forge {
	export function padWithZero(n: number) {
		return String(n).padStart(2, "0")
	}

	export function forEachN(x: number, fn: (i: number) => void) {
		Array.from({ length: x }, (_, i) => i).forEach(fn)
	}

	export function Country(): string {
		const locale = navigator.language
		return locale.split("-")[1]?.toUpperCase() || "US"
	}

	export function PrefersTemperatureFahrenheit(): boolean {
		const countryCode = Country()
		const fahrenheitCountries = ["US", "BS", "BZ", "KY", "PW", "FM", "MH", "LR"]

		return fahrenheitCountries.includes(countryCode)
	}

	export function DurationToClock(d: time.Duration): string {
		if (d === Infinity) {
			return "Infinity"
		}

		const hours = Math.floor(d / time.Hour)
		const minutes = Math.floor((d % time.Hour) / time.Minute)
		const seconds = Math.floor((d % time.Minute) / time.Second)

		if (hours >= 1) {
			return `${hours}h ${forge.padWithZero(minutes)}m`
		}

		return `${minutes}m ${forge.padWithZero(seconds)}s`
	}

	export function DisplayDateAndTime(u: time.Time) {
		return `${time.Days[u.JavaScriptDate.getDay()].Short} ${time.Months[u.JavaScriptDate.getMonth()].Short} ${u.JavaScriptDate.getDate()} ${DisplayTime(u)}`
	}

	export function DisplayTime(u: time.Time): string {
		return u.JavaScriptDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})
	}
}

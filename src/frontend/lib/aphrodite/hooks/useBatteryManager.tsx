import { useEffect, useState } from "preact/hooks"

export function useBatteryManager() {
	interface BatteryManager {
		charging: boolean
		chargingTime: number
		dischargingTime: number
		level: number
	}

	interface RealBatteryManager extends EventTarget, BatteryManager {}

	const copyBattery = (old: RealBatteryManager): BatteryManager => {
		return {
			charging: old.charging,
			chargingTime: old.chargingTime,
			dischargingTime: old.dischargingTime,
			level: old.level,
		}
	}

	interface Navigator {
		getBattery?: () => Promise<RealBatteryManager>
	}

	const [batteryManager, setBatteryManager] = useState<BatteryManager | null>(
		null,
	)

	useEffect(() => {
		let localBatteryManager: RealBatteryManager

		const handleChange = () => {
			setBatteryManager(copyBattery(localBatteryManager))
		}

		const getBattery = (navigator as Navigator).getBattery?.()
		if (getBattery) {
			getBattery
				.then((navigatorBatteryManager) => {
					localBatteryManager = navigatorBatteryManager
					setBatteryManager(copyBattery(localBatteryManager))

					localBatteryManager.addEventListener("chargingchange", handleChange)
					localBatteryManager.addEventListener(
						"chargingtimechange",
						handleChange,
					)
					localBatteryManager.addEventListener(
						"dischargingtimechange",
						handleChange,
					)
					localBatteryManager.addEventListener("levelchange", handleChange)
				})
				.catch((e) => {
					console.error(e)
				})
		}

		return () => {
			if (!localBatteryManager) {
				return
			}

			localBatteryManager.removeEventListener("chargingchange", handleChange)
			localBatteryManager.removeEventListener(
				"chargingtimechange",
				handleChange,
			)
			localBatteryManager.removeEventListener(
				"dischargingtimechange",
				handleChange,
			)
			localBatteryManager.removeEventListener("levelchange", handleChange)
		}
	}, [])

	return batteryManager
}

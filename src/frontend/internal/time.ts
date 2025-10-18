export namespace time {
	export class Time {
		readonly JavaScriptDate: Date

		constructor(input: string | number | Date) {
			this.JavaScriptDate = new Date(input)
		}

		Add(d: Duration): Time {
			return new Time(this.Unix() + d)
		}

		After(u: Time): boolean {
			return this.Compare(u) === 1
		}

		Before(u: Time): boolean {
			return this.Compare(u) === -1
		}

		/**
		 * if t is before u, it returns -1 ;
		 * if t is after u, it returns +1 ;
		 * if they're the same, it returns 0
		 */
		Compare(u: Time): Duration {
			const tc = this.Unix()
			const uc = u.Unix()
			if (tc < uc) {
				return -1
			} else if (tc > uc) {
				return +1
			}

			return 0
		}

		Equal(u: Time): boolean {
			return this.Compare(u) === 0
		}

		IsZero(): boolean {
			return this.Unix() === 0
		}

		Round(d: Duration): Time {
			return new Time(Math.round(this.Unix() / d) * d)
		}

		Sub(u: Time): Duration {
			return this.Unix() - u.Unix()
		}

		Truncate(d: Duration): Time {
			return new Time(Math.floor(this.Unix() / d) * d)
		}

		Unix(): number {
			return this.JavaScriptDate.getTime()
		}
	}

	export type Duration = number

	export const Millisecond: Duration = 1
	export const Second: Duration = Millisecond * 1000
	export const Minute: Duration = Second * 60
	export const Hour: Duration = Minute * 60

	export type Month = {
		Index: number
		Short: string
		Name: string
	}

	export const Months: Month[] = [
		{ Index: 0, Name: "January", Short: "Jan" },
		{ Index: 1, Name: "February", Short: "Feb" },
		{ Index: 2, Name: "March", Short: "Mar" },
		{ Index: 3, Name: "April", Short: "Apr" },
		{ Index: 4, Name: "May", Short: "May" },
		{ Index: 5, Name: "June", Short: "Jun" },
		{ Index: 6, Name: "July", Short: "Jul" },
		{ Index: 7, Name: "August", Short: "Aug" },
		{ Index: 8, Name: "September", Short: "Sep" },
		{ Index: 9, Name: "October", Short: "Oct" },
		{ Index: 10, Name: "November", Short: "Nov" },
		{ Index: 11, Name: "December", Short: "Dec" },
	]

	export type Day = {
		Index: number
		Name: string
		Short: string
	}

	export const Days: Day[] = [
		{ Index: 0, Name: "Sunday", Short: "Sun" },
		{ Index: 1, Name: "Monday", Short: "Mon" },
		{ Index: 2, Name: "Tuesday", Short: "Tue" },
		{ Index: 3, Name: "Wednesday", Short: "Wed" },
		{ Index: 4, Name: "Thursday", Short: "Thu" },
		{ Index: 5, Name: "Friday", Short: "Fri" },
		{ Index: 6, Name: "Saturday", Short: "Sat" },
	]

	export function Now(): Time {
		return new Time(new Date())
	}
}

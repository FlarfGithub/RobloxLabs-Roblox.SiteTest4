export class DateTimeConverter {
	public static TwentyFourHourToTwelveHour(time: any) {
		// Check correct time format and split into components
		time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(''); // return adjusted time or original string
	}

	public static DateToLocaleDate(date: Date) {
		const split = date.toLocaleString().replace(',', '').split(' '); // split to [Date, Time]
		const time = DateTimeConverter.TwentyFourHourToTwelveHour(split[1]);
		return `${split[0]} ${time}`;
	}
}

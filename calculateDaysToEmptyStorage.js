let result = [
    {
        "eventdate": "2017-10-06T00:00:00.000Z",
        "deviceid": "352008095231095",
        "modelbrand": "Samsung",
        "modelcode": "SM-N950F",
        "avg_free_storage": 46100504576
    },
    {
        "eventdate": "2017-10-05T00:00:00.000Z",
        "deviceid": "352008095231095",
        "modelbrand": "Samsung",
        "modelcode": "SM-N950F",
        "avg_free_storage": 46188446879
    },
    {
        "eventdate": "2017-10-04T00:00:00.000Z",
        "deviceid": "352008095231095",
        "modelbrand": "Samsung",
        "modelcode": "SM-N950F",
        "avg_free_storage": 46403856514
    },
    {
        "eventdate": "2017-10-03T00:00:00.000Z",
        "deviceid": "352008095231095",
        "modelbrand": "Samsung",
        "modelcode": "SM-N950F",
        "avg_free_storage": 44260782685
    }
];

/*
* If we have 7 days data within past 90 days
* then return true, otherwise return false.
*/
function calculateRange(result) {
	let latestDate = new Date(result[0].eventdate);
	let today = new Date();
	if (
		result.length >= 2 &&
		today.setDate(today.getDate() - 90) <
			latestDate.setDate(latestDate.getDate())
	) {
		return true;
	}
	return false;
}

function calculateStorageReductionPerDay(today, nextDay) {
	return ((today.avg_free_storage - nextDay.avg_free_storage) / this.calculateDaysDifference(nextDay.eventdate, today.eventdate));
}

function calculateDaysDifference(toDate, fromDate) {
	console.log((new Date(toDate) - new Date(fromDate)) / 86400000);
	return ((new Date(toDate) - new Date(fromDate)) / 86400000);
}

function calculateDaysToEmptyStorage(result) {
	let methodName = 'calculateDaysToEmptyStorage';
	let reducedStorage = 0;
	let prediction = [];
	let latestDate = new Date(result[0].eventdate);
	if (this.calculateRange(result)) {
		for (var i = result.length - 1; i >= 1; i--) {
			reducedStorage =
				reducedStorage + this.calculateStorageReductionPerDay(result[i], result[i-1]);
			console.log(reducedStorage);
		}
		let daysToEmptyStorage = Math.round(
			Number(
				result[0].avg_free_storage /
					(reducedStorage / (result.length - 1))
			)
		);
		if (daysToEmptyStorage >= 0) {
			let d = new Date(
				latestDate.setDate(latestDate.getDate() + daysToEmptyStorage)
			);
			let dateToEmptyStorage =
				d.getUTCFullYear() +
				'-' +
				(d.getUTCMonth() + 1 > 9
					? d.getUTCMonth() + 1
					: '0' + (d.getUTCMonth() + 1)) +
				'-' +
				(d.getUTCDate() > 9 ? d.getUTCDate() : '0' + d.getUTCDate()) +
				'T00:00:00.000Z';
			prediction.push({
				daysToEmptyStorage: daysToEmptyStorage,
				dateToEmptyStorage: dateToEmptyStorage,
			});
			return prediction;
		}
	}
	prediction.push({
		//Unable to predict
		daysToEmptyStorage: -1,
		dateToEmptyStorage: '2099-01-01T00:00:00.000Z',
	});
	return prediction;
}

this.calculateDaysToEmptyStorage(result);

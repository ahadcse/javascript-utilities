let result = [
    {
        "eventdate": "2017-10-22T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 225401514
    },
    {
        "eventdate": "2017-10-21T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 224547840
    },
    {
        "eventdate": "2017-10-20T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 227819747
    },
    {
        "eventdate": "2017-10-19T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 240999914
    },
    {
        "eventdate": "2017-10-18T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 589117155
    },
    {
        "eventdate": "2017-10-17T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 537533098
    },
    {
        "eventdate": "2017-10-03T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 1068580864
    },
    {
        "eventdate": "2017-09-26T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 1198432699
    },
    {
        "eventdate": "2017-09-25T00:00:00.000Z",
        "deviceid": "358125077818501",
        "modelbrand": "Sony",
        "modelcode": "F3111",
        "avg_free_storage": 1196891996
    }
];

/*
* If we have 2 days data within past 90 days
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

function calculateDaysDifference(toDate, fromDate) {
	let dayDifference = (new Date(toDate) - new Date(fromDate)) / 86400000;
	return dayDifference;
}

function calculateStorageReductionPerDay(today, nextDay) {
	let storageReductionPerConsecutiveSample =
		(today.avg_free_storage - nextDay.avg_free_storage) /
		this.calculateDaysDifference(nextDay.eventdate, today.eventdate);
	return storageReductionPerConsecutiveSample;
}

function calculateDaysToEmptyStorage(result) {
	let methodName = 'calculateDaysToEmptyStorage';
	let reducedStorage = 0;
	let prediction = [];
	let latestDate = new Date(result[0].eventdate);
	if (this.calculateRange(result)) {
		let divisor = 0;
		for (var i = result.length - 1; i >= 1; i--) {
			let perDayReduction = this.calculateStorageReductionPerDay(
				result[i],
				result[i - 1]
			);
			if (perDayReduction > 0) {
				reducedStorage = reducedStorage + perDayReduction;
				divisor++;
			}
		}
		let daysToEmptyStorage = Math.round(
			Number(result[0].avg_free_storage / (reducedStorage / divisor))
		);
		if (daysToEmptyStorage >= 0) {
			let d = new Date(
				latestDate.setDate(latestDate.getDate() + daysToEmptyStorage)
			);

			//If the prediction is less than or equal today's date
			if (d <= new Date()) {
				d = new Date(new Date().setDate(new Date().getDate() + 1));
			}
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

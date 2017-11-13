/*
* If deviceOs < reportOs false, 
* Otherwise true
*/
function compareVersionNumbers(deviceOs, reportOs) {
	let methodName = 'compareVersionNumbers';
	let deviceVersion = deviceOs;
	let reportVersion = reportOs;

	if (!deviceVersion || !reportVersion) {
		return NaN;
	}

	let v1parts = deviceVersion.split('.');
	let v2parts = reportVersion.split('.');

	//First, validate both numbers are true version numbers
	function validateParts(parts) {
		for (var i = 0; i < parts.length; ++i) {
			if (!isPositiveInteger(parts[i])) {
				return false;
			}
		}
		return true;
	}
	function isPositiveInteger(x) {
		return /^\d+$/.test(x);
	}
	if (!validateParts(v1parts) || !validateParts(v2parts)) {
		return NaN;
	}
	for (var i = 0; i < v1parts.length; ++i) {
		if (parseInt(v1parts[i]) > parseInt(v2parts[i])) {
			return true;
		}
		if (v2parts.length === i) {
			return true;
		}
		if (v1parts[i] === v2parts[i]) {
			continue;
		}
		return false;
	}
	if (v1parts.length != v2parts.length) {
		return false;
	}
	return true;
}

console.log('False: ' + this.compareVersionNumbers('9.0.1', '10.3.3')); 
console.log('False: ' + this.compareVersionNumbers('10.0.1', '10.3.3')); 
console.log('False: ' + this.compareVersionNumbers('10.0.1', '10.0.3')); 
console.log('True: ' + this.compareVersionNumbers('11', '10.3.3')); 
console.log('True: ' + this.compareVersionNumbers('11.0.0', '10.3.3')); 
console.log('True: ' + this.compareVersionNumbers('11.10.0', '11.9.3')); 
console.log('True: ' + this.compareVersionNumbers('11.10.0', '11.10.0')); 
console.log('False: ' + this.compareVersionNumbers('11.10.0', '11.10.2')); 
console.log('True: ' + this.compareVersionNumbers('11.10.3', '11.10.2')); 
console.log('True: ' + this.compareVersionNumbers('11.10.3', '11.10.2')); 
console.log('True: ' + this.compareVersionNumbers('11.10.3', '11.10.2')); 
console.log('NaN: ' + this.compareVersionNumbers('11.3.3', '11..2')); 

console.log(this.compareVersionNumbers('1.0.0', '2.0'));
console.log(this.compareVersionNumbers('6.0.1', '7.0.1'));
console.log(this.compareVersionNumbers('6.0.1', '6.0.1'));
console.log(this.compareVersionNumbers('1.7.1', '1.7.10'));
console.log(this.compareVersionNumbers('1.6.1', '1.7.10'));
console.log(this.compareVersionNumbers('1.6.20', '1.7.10'));
console.log(this.compareVersionNumbers('1.7.1', '1.7.10'));
console.log(this.compareVersionNumbers('1.7', '1.8.0'));
console.log(this.compareVersionNumbers('1.7.10', '1.7.1'));
console.log(this.compareVersionNumbers('1.7.10', '1.6.1'));
console.log(this.compareVersionNumbers('1.7.10', '1.6.20'));
console.log(this.compareVersionNumbers('1.7.0', '1.7'));
console.log(this.compareVersionNumbers('1.7', '1.7'));
console.log(this.compareVersionNumbers('7.0', '7'));
console.log(this.compareVersionNumbers('7.0.1', '7'));
console.log(this.compareVersionNumbers('7', '7.0.1'));
console.log(isNaN(this.compareVersionNumbers('1.7', '1..7')));
console.log(isNaN(this.compareVersionNumbers('1.7', 'Bad')));
console.log(isNaN(this.compareVersionNumbers('1..7', '1.7')));
console.log(isNaN(this.compareVersionNumbers(null, null)));
isNaN(this.compareVersionNumbers('Bad', '1.7'))


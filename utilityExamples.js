const getOnlyUniqueByHighestTimestamp = (acc = [], curr = {}) => {
	const index = acc.findIndex((item) => item.productId === curr.productId)
	if (!acc[index]) {
		return [...acc, curr]
	}
	if (acc[index].timestamp < curr.timestamp) {
		acc[index] = curr
	}
	return acc
}
// console.log('Unique by highest timestamp: ', getOnlyUniqueByHighestTimestamp(inputWithHighest, { "productId": 1, "timestamp": 3 }));

const skus = "DW00100038, DW00100037"
const makeSkuArray = (skus) => skus.split(',').map((r) => `'${r.trim()}'`)
// console.log(`AND items.Sku IN (${ makeSkuArray(skus) })`)

const checkForItemInArray = (it) => {
	const arrayToCheck = ['integration-28', 'integration-30', 'integration-31']
	return arrayToCheck.some(item => it.includes(item))
}

//Gives number of occurrences of each letter in specified string
charCount = s => {
	var uchars = {};
	s.replace(/\S/g, l => {
		uchars[l] = (isNaN(uchars[l]) ? 1 : uchars[l] + 1)
	})
	return uchars;
}

// Finding factors of a number
const factors = n => {
	let output = [];
	for (let i = 2; i <= Math.sqrt(n); i++) {
		if (n % i === 0) {
			output.push(i);
			if (i !== Math.sqrt(n)) output.push(n / i);
		}
	}
	if (output.indexOf(n) === -1) output.push(n);
	return output;
}

// Filtering technique. Finding total drink price.
const cart = [{ name: "Drink", price: 3.12 },
{ name: "Steak", price: 45.15 },
{ name: "Drink", price: 11.01 }];

console.log(`Total: ${cart.filter(x => x.name === 'Drink').map(x => x.price).reduce((t, v) => t += v).toFixed(2)}`)

//Remove duplicate item from array
function uniq(a) {
	return Array.from(new Set(a));
}

//Shorter way to remove duplicate item from array
let unique = a => [...new Set(a)];


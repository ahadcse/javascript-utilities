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

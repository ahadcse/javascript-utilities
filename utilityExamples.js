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
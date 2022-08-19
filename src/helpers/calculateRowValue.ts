const calculateRowValue = (diceList: number[]) => {
	let totalValue = 0;

	if (!diceList) {
		return totalValue;
	}

	if (diceList.length === 1) {
		totalValue = diceList[0];
		return totalValue;
	}

	let diceSet = new Set(diceList);
	const diceListUniqueNumbers = [...diceSet];

	if (diceList.length === diceListUniqueNumbers.length) {
		diceList.forEach((value) => (totalValue += value));

		return totalValue;
	}

	if (diceList.length === 2 || diceListUniqueNumbers.length === 1) {
		diceList.forEach((value) => {
			if (totalValue === 0) totalValue = 1;
			if (value === 1) {
				totalValue *= 2;
			} else {
				totalValue *= value;
			}
		});

		return totalValue;
	}

	let duplicate = diceList.filter((value) => {
		if (diceSet.has(value)) {
			diceSet.delete(value);
		} else {
			return value;
		}
	});

	diceList.forEach((value) => {
		if (totalValue === 0) totalValue = 1;

		if (value === duplicate[0]) {
			if (value === 1) {
				totalValue *= 2;
			} else {
				totalValue *= value;
			}
		}
	});

	diceList.forEach((value) => {
		if (value !== duplicate[0]) {
			totalValue += value;
		}
	});
	return totalValue;
};

export default calculateRowValue;

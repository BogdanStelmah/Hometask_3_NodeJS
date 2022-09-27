//Regular expression for finding dates
export const dateSearch = (content: string): string[] => {
	const dateReg = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/g;
	const dates = content.match(dateReg);
	if (Array.isArray(dates)) {
		return dates
	}

	return []
}
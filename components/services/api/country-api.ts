export const getCountry = async () => {
	var url = `${process.env.BASE_URL}/country/`;
	return fetch(url);
};

export const getCountryById = async (countryId:string) => {
	var url = `${process.env.BASE_URL}/country/`+countryId;
	return fetch(url);
};
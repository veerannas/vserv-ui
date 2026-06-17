export const getAllActiveVendor = async () => {
	var url = `${process.env.BASE_URL}/vendor/search/active`
	return fetch(url);
};

export const getAllInActiveVendor = async () => {
	var url = `${process.env.BASE_URL}/vendor/search/inactive`
	return fetch(url);
};

export const getallDeletedVendor = async () => {
	var url = `${process.env.BASE_URL}/vendor/all/delete`;
	return fetch(url);
};
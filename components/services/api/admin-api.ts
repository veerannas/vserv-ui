export const postVendorActivateDeactivate = async (data: any) => {
	var url = `${process.env.BASE_URL}/vendor/admin/activate-deactivate`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postVendorDelete = async (data: any) => {
	var url = `${process.env.BASE_URL}/vendor/admin/delete`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postVendorRestore = async (data: any) => {
	var url = `${process.env.BASE_URL}/vendor/admin/restore`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getTotalCustomer = async () => {
	var url = `${process.env.BASE_URL}/users/count`;
	return fetch(url);
};

export const getTotalBusiness = async () => {
	var url = `${process.env.BASE_URL}/business/count`;
	return fetch(url);
};

export const getTotalCategories = async () => {
	var url = `${process.env.BASE_URL}/category/count`;
	return fetch(url);
};

export const getTotalLocation = async () => {
	var url = `${process.env.BASE_URL}/cities/count`;
	return fetch(url);
};

export const getTotalMonthlyAppointment = async () => {
	var url = `${process.env.BASE_URL}/reservation/current-month/count`;
	return fetch(url);
};

export const getUserIsAdmin = async (userId:any) => {
	var url = `${process.env.BASE_URL}/users/admin/available?userId=`+userId;
	return fetch(url);
};
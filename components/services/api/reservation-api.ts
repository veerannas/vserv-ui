//user reminder on off
export const remainderOnOffApi = async (body: any) => {
	var url = `${process.env.BASE_URL}/reservation/remainder`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const cancelAppointment = async (body: any) => {
	var url = `${process.env.BASE_URL}/reservation/cancelappointment`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const updateRestaurantAppointment = async (body: any) => {
	var url = `${process.env.BASE_URL}/restaurant-reservation/update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};
export const updateFinanceAppointment = async (body: any) => {
	var url = `${process.env.BASE_URL}/finance-reservation/update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const updateAutomotiveAppointment = async (body: any) => {
	var url = `${process.env.BASE_URL}/automotive-reservation/update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const updateHealthAppointment = async (body: any) => {
	var url = `${process.env.BASE_URL}/health-reservation/update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

//api of user today appointment
export const getUserTodayAppointmnetDateBet = async (id: any) => {
	var url = `${process.env.BASE_URL}/reservation/todayappointment?userId=` + id ;
	return fetch(url);
};

//api of user past appointment
export const getUserPastAppointmnetDateBet = async (id: any, from: any, to: any) => {
	var url = `${process.env.BASE_URL}/reservation/pastappointmentbydate?userId=` + id + `&from=` + from + `&to=` + to;
	return fetch(url);
};

//api of user today appointment
export const getBusinessTodayAppointmnetDateBet = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/reservation/business/todayappointment?businessInfoId=` + businessInfoId ;
	return fetch(url);
};


//api of Business Past appointment
export const getBusinessPastAppointmnet = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/reservation/business/pastappointment?businessInfoId=` + businessInfoId;
	return fetch(url);
};

//api of Business past appointment date between
export const getBusinessPastAppointmnetDateBet = async (businessInfoId: any, from: any, to: any) => {
	var url =
		`${process.env.BASE_URL}/reservation/business/pastappointmentbydate?businessInfoId=` +
		businessInfoId +
		`&from=` +
		from +
		`&to=` +
		to;
	return fetch(url);
};

export const cancelAppointmentByBusiness = async (body: any) => {
	var url = `${process.env.BASE_URL}/reservation/business/cancelappointment`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postAddBusinessReservationHour = async (body: any) => {
	var url = `${process.env.BASE_URL}/reservation/hours/add`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessReservationHourIsAvailable = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/reservation/hours/available?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getBusinessReservationHour = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/reservation/hours/?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getTotalAppointmment = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/reservation/total/appointment?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getTotalCancelAppointmment = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/reservation/total/cancel/appointment?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getRestuarantPeople = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/restaurant-info/get/capacity?businessInfoId=`+businessInfoId;
	return fetch(url);
};

export const postRestaurantBookAppointment = async (body: any) => {
	var url = `${process.env.BASE_URL}/restaurant-reservation/bookappointment`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postBookAppointment = async (body: any, pathname: string) => {
	var url = '';
	if (pathname == '/finance') {
		url = `${process.env.BASE_URL}/finance-reservation/bookappointment`;
	} else if (pathname == '/automative') {
		url = `${process.env.BASE_URL}/automotive-reservation/bookappointment`;
	} else if (pathname == '/health') {
		url = `${process.env.BASE_URL}/health-reservation/bookappointment`;
	}
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

//api of user past appointment
export const getReservationCountByUserId = async (userId: any) => {
	var url = `${process.env.BASE_URL}/reservation/count/`+userId;
	return fetch(url);
};


export const getBusinessSearchResult = async (serviceId: any, locationId: any, date: any) => {
	var url =
		`${process.env.BASE_URL}/service/search?service=` + serviceId + '&location=' + locationId + '&date=' + date;
	return fetch(url);
};

export const postVendorRegistration = async (data: any) => {
	var url = `${process.env.BASE_URL}/vendor/register`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getIsVendor = async (userId: any) => {
	var url = `${process.env.BASE_URL}/vendor/available?userId=` + userId;
	return fetch(url);
};

export const getVendorId = async (userId: any) => {
	var url = `${process.env.BASE_URL}/vendor/find?userId=` + userId;
	return fetch(url);
};

export const getBusinessNotificationByVendorId = async (vendorId: any) => {
	var url = `${process.env.BASE_URL}/business/notifications/findbusinessnotification?vendorId=` + vendorId;
	return fetch(url);
};

export const postUpdateBusinessNotification = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/notifications/update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getLocation = async () => {
	var url = `${process.env.BASE_URL}/cities/search`;
	return fetch(url);
};

export const getCategories = async () => {
	var url = `${process.env.BASE_URL}/category/search`;
	return fetch(url);
};

export const postRegisterBusiness = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/register`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessByVendorId = async (vendorId: any) => {
	var url = `${process.env.BASE_URL}/service/search/id?vendorId=` + vendorId;
	return fetch(url);
};

export const postDeleteBusiness = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/delete`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postRestoreBusiness = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/restore`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getActiveBusiness = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/business/status?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const postBusinessActivateDeactivate = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/status-update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getActiveBusinessList = async (vendorId: any) => {
	var url = `${process.env.BASE_URL}/business/search/active?vendorId=` + vendorId;
	return fetch(url);
};

export const getInactiveBusinessList = async (vendorId: any) => {
	var url = `${process.env.BASE_URL}/business/search/inactive?vendorId=` + vendorId;
	return fetch(url);
};

export const getTotalBusiness = async (vendorId: any) => {
	var url = `${process.env.BASE_URL}/business/search/total?vendorId=` + vendorId;
	return fetch(url);
};

export const postUpdateBusiness = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessProfilePercent = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/business/completion-status?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getMangerByVendorId = async (vendorId: string) => {
	var url = `${process.env.BASE_URL}/vendor/manager?vendorId=` + vendorId;
	return fetch(url);
};

export const postBusinessDeactivateDelete = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/deactivate-delete`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessByBusinessInfoId = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/business/profile?id=` + businessInfoId;
	return fetch(url);
};

export const postVendorDeactivateDelete = async (data: any) => {
	var url = `${process.env.BASE_URL}/vendor/deactivate-delete`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessReview = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/reviews/findbybusinessid?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const postBusinessPublish = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/publish`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

// export const postBusinessWallPaper = async (data: any) => {
//   var url = `${process.env.BASE_URL}/business/wallpaper`;
//   return fetch(url, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "**",
//     },
//   });
// };

export const postBusinessWallPaper = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/wallpaper`;
	return fetch(url, {
		method: 'POST',
		body: data,
	});
};

export const postDeleteBusinessWallPaper = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/wallpaper/delete`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postAddWorkingHoursOfBusiness = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/hours/add`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessHourIsAvailable = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/business/hours/available?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getBusinessHour = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/business/hours/?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const postAddBusinessContactDetails = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/contact-details/add`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessContactDetails = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/business/contact-details/?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const postUpdateBusinessContactDetails = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/contact-details/update`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postRemoveBusinessContactDetails = async (data: any) => {
	var url = `${process.env.BASE_URL}/business/contact-details/remove`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

//api to Vendor Sign Up
export const vendorSignUp = async (data: any) => {
	var url = `${process.env.BASE_URL}/vendor/signup`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getBusinessHourAndCustomHOur = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/work-hour/time?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getBusinessSuggestion = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/service/suggest?service=` + businessInfoId;
	return fetch(url);
};

export const getCountBusinessByVendorId = async (vendorId: any) => {
	var url = `${process.env.BASE_URL}/service/search/count?vendorId=` + vendorId;
	return fetch(url);
};

//api of user upcoming appointment

export const getBusinessUpcomingAppointmnet = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/reservation/business/upcomingappointment?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getBusinessIsAvalable = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/restaurant-info/find/?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getRestaurantInfoByBusinessInfoId = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/restaurant-info/find/id?businessInfoId=` + businessInfoId;
	return fetch(url);
};

//api to Restaurant Info
export const postRegisterRestaurantInfo = async (data: any) => {
	var url = `${process.env.BASE_URL}/restaurant-info/register`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};



// export const getCityName = async (id:string) => {
// 	var url = `${process.env.BASE_URL}/cities/name?id=`+id;
// 	return fetch(url);
// };

export const getCityName = async (id: any) => {
	var url = `${process.env.BASE_URL}/cities/name?id=` + id;
	return fetch(url);
};

//api to Restaurant Info
export const postMenuActivateDeactivate = async (data: any) => {
	var url = `${process.env.BASE_URL}/menu/activate-deactivate`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const getTotalMenu = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/menu/total?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getTotalActivateMenu = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/menu/total/activate?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getTotalDeActivateMenu = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/menu/total/deactivate?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getActiveMenuList = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/menu/activelist?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getInActiveMenuList = async (businessInfoId: any) => {
	var url = `${process.env.BASE_URL}/menu/inactivelist?businessInfoId=` + businessInfoId;
	return fetch(url);
};


export const getAllBusiness = async () => {
	var url = `${process.env.BASE_URL}/business/all`
	return fetch(url);
};

export const getAllActiveBusiness = async () => {
	var url = `${process.env.BASE_URL}/business/all/active`
	return fetch(url);
};

export const getAllInActiveBusiness = async () => {
	var url = `${process.env.BASE_URL}/business/all/inactive`
	return fetch(url);
};

export const getAllVendor = async () => {
	var url = `${process.env.BASE_URL}/vendor/all`
	return fetch(url);
};

export const getDeletedBusinessByVendorId = async (vendorId: any) => {
	var url = `${process.env.BASE_URL}/business/delete/` + vendorId;
	return fetch(url);
};

export const getAllTotalBusiness = async () => {
	var url = `${process.env.BASE_URL}/business/search/all/total`;
	return fetch(url);
};

export const getallDeletedBusiness = async () => {
	var url = `${process.env.BASE_URL}/business/all/delete`;
	return fetch(url);
};
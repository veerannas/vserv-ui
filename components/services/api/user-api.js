//api to fetch user data
//getUserById
export const getUserData = async(id) => {
    var url = `${process.env.BASE_URL}/users/` + id;
    return fetch(url);
};

//getAllUser

export const getAllUserData = async() => {
    var url = `${process.env.BASE_URL}/users/all`;
    return fetch(url);
};

//api to update user data
export const updateUserData = async(data) => {
    var url = `${process.env.BASE_URL}/users/updateuser`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

//api to change user password
export const changeUserPassword = async(data) => {
    var url = `${process.env.BASE_URL}/users/changepassword`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

//api to get user notifications
export const getUserNotification = async(id) => {
    var url = `${process.env.BASE_URL}/notifications/findusernotification?userId=` + id;
    return fetch(url);
};

//api to update user notifications
export const updateUserNotification = async(body) => {
    var url = `${process.env.BASE_URL}/notifications/update`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

//api to get favorite business
export const getFavourite = async(id) => {
    var url = `${process.env.BASE_URL}/favourite/getall?userId=` + id;
    return fetch(url);
};

//api to unfavorite to favorite business
export const deleteFavouriteBusiness = async(body) => {
    var url = `${process.env.BASE_URL}/favourite/unfavorite`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

//api to user deactivate and deleted
export const userDeactivateDelete = async(body) => {
    var url = `${process.env.BASE_URL}/users/deactivate-delete`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

//api of user upcoming appointment

export const getUserUpcomingAppointmnet = async(userId) => {
    var url =
        `${process.env.BASE_URL}/reservation/upcomingappointment?userId=` +userId;
    return fetch(url);
};


//api to user deactivate and deleted
export const userUploadProfileImage = async(data) => {
    var url = `${process.env.BASE_URL}/users/updateprofile`;
    return fetch(url, {
        method: "POST",
        body: data,
        // headers: {
        //     "Content-Type": "multipart/form-data",
        //     // "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "**",

        // }
    });
};

//api of user review
export const getUserReviewByUserId = async(id) => {
    var url = `${process.env.BASE_URL}/reviews/find?userId=` + id;
    return fetch(url);
};

//api for price of service
export const getServicePrice = async(id) => {
    var url = `${process.env.BASE_URL}/restaurant-reservation/getservice?reservationId=` + id;
    return fetch(url);
};


//api of user upcoming appointment

export const getUserPastAppointmnet = async(id) => {
    var url = `${process.env.BASE_URL}/reservation/pastappointment?userId=` + id;
    return fetch(url);
};

//api of user upcoming appointment

export const getNumberOfPeopleOfAppointment = async(id) => {
    var url = `${process.env.BASE_URL}/restaurant-reservation/getservice?reservationId=` + id;
    return fetch(url);
};

export const getServiceOfAppointment = async(id, category) => {
    var url = "";
    if (category == "finance") {
        url = `${process.env.BASE_URL}/finance-reservation/getservice?reservationId=` + id;
    }
    if (category == "automotive") {
        url = `${process.env.BASE_URL}/automotive-reservation/getservice?reservationId=` + id;
    }
    if (category == "health") {
        url = `${process.env.BASE_URL}/health-reservation/getservice?reservationId=` + id;
    }
    return fetch(url);
};

//api to user Favorite
export const userFavorite = async(body) => {
    var url = `${process.env.BASE_URL}/favourite/add`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

export const userFavoriteByUserIdBusinessId = async(userId, businessInfoId) => {
    var url = `${process.env.BASE_URL}/favourite/getuserfavorite?userId=` + userId + `&businessInfoId=` + businessInfoId;
    return fetch(url);
};

//api to user Favorite
export const userDeleteProfle = async(data) => {
    var url = `${process.env.BASE_URL}/users/deleteprofileimg`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

//api to User Sign Up
export const userSignUp = async(data) => {
    var url = `${process.env.BASE_URL}/users/signup`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

export const userProfileResult = async(id) => {
    var url = `${process.env.BASE_URL}/profileresult/id=` + id;
    return fetch(url);
};

//api to User Sign In
export const userSignIn = async(data) => {
    var url = `${process.env.BASE_URL}/users/signin`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "**",
        }
    });
};

//get all active  user
export const getAllActiveUserData = async() => {
    var url = `${process.env.BASE_URL}/users/search/active`;
    return fetch(url);
};

//get all In-active  user
export const getAllInActiveUserData = async() => {
    var url = `${process.env.BASE_URL}/users/search/inactive`;
    return fetch(url);
};

//get all Deletd user
export const getAllDeletedUserData = async() => {
    var url = `${process.env.BASE_URL}/users/search/deleted`;
    return fetch(url);
};

export const postUserActivateDeactivate = async (data) => {
	var url = `${process.env.BASE_URL}/users/admin/activate-deactivate`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};

export const postUserDelete = async (data) => {
	var url = `${process.env.BASE_URL}/users/admin/delete`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};


export const postUserRestore = async (data) => {
	var url = `${process.env.BASE_URL}/users/admin/restore`;
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '**',
		},
	});
};
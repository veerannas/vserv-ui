export const postAddRestaurantReview = async (data: any) => {
  var url = `${process.env.BASE_URL}/restaurant-rating/addreview`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

export const postAddHealthReview = async (data: any) => {
  var url = `${process.env.BASE_URL}/health-rating/addreview`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

export const postAddFinanceReview = async (data: any) => {
  var url = `${process.env.BASE_URL}/finance-rating/addreview`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

export const postAddAotomotiveReview = async (data: any) => {
  var url = `${process.env.BASE_URL}/automotive-rating/addreview`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};


export const postReviewReply = async (data: any) => {
  var url = `${process.env.BASE_URL}/reviews/reply`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

//api of primary review
export const getPrimaryReview = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/reviews/primary?businessInfoId=` + businessInfoId;
	return fetch(url);
};

//api of sent review
export const getSentReviews = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/reviews/sent?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const postReadUnreadReview= async (data: any) => {
  var url = `${process.env.BASE_URL}/reviews/read-unread`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

export const getReadReviews = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/reviews/read?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getRestaurantRating = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/restaurant-rating/overallrating?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getAutomotiveRating = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/automotive-rating/overallrating?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getFinanceRating = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/finance-rating/overallrating?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getHealthRating = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/health-rating/overallrating?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getReviews = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/reviews/findbybusinessid?businessInfoId=` + businessInfoId;
	return fetch(url);
};

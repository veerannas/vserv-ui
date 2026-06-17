export const postEnquiryReply = async (data: any) => {
    var url = `${process.env.BASE_URL}/enquiry/reply`;
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
export const getPrimaryEnquiry = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/enquiry/primary?businessInfoId=` + businessInfoId;
	return fetch(url);
};

//api of sent review
export const getSentEnquiry = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/enquiry/sent?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const postReadUnreadEnquiry= async (data: any) => {
  var url = `${process.env.BASE_URL}/enquiry/read-unread`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

export const getReadEnquiry = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/enquiry/read?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const postEnquiryRegistration= async (data: any) => {
    var url = `${process.env.BASE_URL}/enquiry/register`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "**",
      },
    });
  };

  export const postEnquiryDelete= async (data: any) => {
    var url = `${process.env.BASE_URL}/enquiry/delete`;
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
export const getdeleteEnquiry = async (businessInfoId:string) => {
	var url = `${process.env.BASE_URL}/enquiry/delete/entry?businessInfoId=` + businessInfoId;
	return fetch(url);
};

export const getTotalEnquiry = async (businessInfoId: string) => {
	var url = `${process.env.BASE_URL}/enquiry/total?businessInfoId=` + businessInfoId;
	return fetch(url);
};
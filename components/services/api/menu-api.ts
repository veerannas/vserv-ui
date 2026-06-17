export const getMenuData = async (id: string) => {
  var url = `${process.env.BASE_URL}/menu/find?businessInfoId=` + id;
  return fetch(url);
};

//get menu list
export const getMenuList = async (businessInfoId:string) => {
  var url = `${process.env.BASE_URL}/menu/?businessInfoId=`+businessInfoId;
  return fetch(url);
};

//add menu
export const addMenu = async (data: any) => {
  var url = `${process.env.BASE_URL}/menu/add`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

//update menu
export const updateMenu = async (data: any) => {
  var url = `${process.env.BASE_URL}/menu/update`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

//get Sub-menu list
export const getSubMenuList = async (menuCategoryId:string) => {
  var url = `${process.env.BASE_URL}/sub-menu/?menuCategoryId=`+menuCategoryId;
  return fetch(url);
};

//add Sub menu
export const addSubMenu = async (data: any) => {
  var url = `${process.env.BASE_URL}/sub-menu/add`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

//update Sub menu
export const updateSubMenu = async (data: any) => {
  var url = `${process.env.BASE_URL}/sub-menu/update`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

//get Sub-menu list
export const getCountSubCategoryBymenuCategoryId = async (
  menuCategoriesId: string
) => {
  var url =
    `${process.env.BASE_URL}/menu/available?menuCategoriesId=` +
    menuCategoriesId;
  return fetch(url);
};

//delete  menu
export const deleteMenu = async (data: any) => {
  var url = `${process.env.BASE_URL}/menu/delete`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

//delete  menu
export const deactivateSubMenu = async (data: any) => {
  var url = `${process.env.BASE_URL}/sub-menu/deactivate`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "**",
    },
  });
};

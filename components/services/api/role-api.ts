export const getAllRole = async () => {
  var url = `${process.env.BASE_URL}/role/`;
  return fetch(url);
};

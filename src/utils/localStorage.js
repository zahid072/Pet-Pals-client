const getToken = () => {
  const token = localStorage.getItem("access-token");
  return token;
};

export default getToken
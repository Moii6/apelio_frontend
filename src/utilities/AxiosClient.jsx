import axios from "axios";

const getTokenFromSessionStoreage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user.token;
};
const httpConfig = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_SERVER_URL}/api`,
});
export { getTokenFromSessionStoreage, httpConfig };
export default axiosClient;

const axios = require("axios");
const axiosApiInstance = axios.create();

// Request interceptor for API calls

console.log(localStorage.token);
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      "auth-token": localStorage.getItem("token"),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;

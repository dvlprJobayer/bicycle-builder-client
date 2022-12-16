import axios from "axios";

const axiosBicycle = axios.create({
  baseURL: "https://bicycle-builder.onrender.com",
});

// Add a request interceptor
axiosBicycle.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosBicycle;

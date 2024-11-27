import axios from "axios";

const baseURL = process.env.REACT_APP_DEV;

const createAxiosInstance = (withToken = true) => {
  const instance = axios.create({
    baseURL,
    timeout: 10 * 60 * 1000,
    timeoutErrorMessage: "We are unable to connect to the server. Please try again later.",
  });

  if (withToken) {
    instance.interceptors.request.use((config) => {
      const tokenDetails = localStorage.getItem("tokenDetails");
      if (tokenDetails) {
        config.headers["Authorization"] = `Bearer ${tokenDetails}`;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 400 && error.response?.data?.message === "Token has expired") {
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

const axiosInstance = createAxiosInstance();
const axiosInstanceWithoutToken = createAxiosInstance(false);

export { axiosInstance, axiosInstanceWithoutToken };
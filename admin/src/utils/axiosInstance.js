import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1/`,
  withCredentials: false,
});

// default header
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept"] = "multi-part/formdata";

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorage.getItem("Tokens"));

    if (token) {
      config.headers.Authorization = `Bearer ${token?.accessToken}`;
    }
console.log('interceptor',config);
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('response',response);

    return response;
  },
  async (error) => {
    if (
      error?.response?.data?.code === "token_not_valid" &&
      error?.response?.status === 401
    ) {
      if (
        error?.response?.data?.messages &&
        error?.response?.data?.messages[0]?.token_type === "access"
      ) {
        const originalConfig = error.config;
        originalConfig._retry = true;
        try {
          const tokens = JSON.parse(localStorage.getItem("Tokens"));
          const response = await axiosInstance.post("users/token/refresh/", {
            refresh: tokens.refresh,
          });
          let accessToken = response?.data?.access;
          if (accessToken) {
            localStorage.setItem(
              "Tokens",
              JSON.stringify({ access: accessToken, refresh: tokens.refresh })
            );
          }

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    // else if (error?.response?.status == 502) {
    //   console.log(error?.response);
    //   console.log("Failed");
    // } else if (error?.response?.status == 403) {
    //   return Promise.reject("refresh_not_valid"); // for disabling login from multiple devices
    // }
    else {
      return Promise.reject(error);
    }
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 500) {
      const originalConfig = error.config;
      originalConfig._retry = true;
    } else {
      return Promise.reject(error);
    }
  }
);
export { axiosInstance };

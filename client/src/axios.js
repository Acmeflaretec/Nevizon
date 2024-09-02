
import axios from "axios";
// console.log(import.meta.env.VITE_API_BASE_URL)

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// default header
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept"] = "multi-part/formdata";

instance.interceptors.request.use(
  async (config) => {
   
    const token = JSON.parse(localStorage.getItem("Tokens"));

    if (token) {
      
      config.headers.Authorization = `Bearer ${token?.access}`;
    }
 
    return config;
  }
  
);

instance.interceptors.response.use(
  (response) => {
   // console.log('response1',response);
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
          
          const response = await instance.post("users/token/refresh/", {
            refresh: tokens.refresh,
          });
          let accessToken = response?.data?.access;
 

          if (accessToken) {
            localStorage.setItem(
              "Tokens",
              JSON.stringify({ access: accessToken, refresh: tokens.refresh })
            );
          }

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
  
    else {
     
      return Promise.reject(error);
    }
  }
);
instance.interceptors.response.use(
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

export default instance;

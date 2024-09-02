import { axiosInstance } from "./axiosInstance";

const request = async (endpoint, method, data) => {
    try {
        const options = {
            method,
            url: endpoint,
            data
        };
        const res = await axiosInstance.request(options);
        console.log(res);
        return res?.data
    } catch (error) {
        if (!error.response) {
            throw error;
        } else {
            throw error.response.data;
        }
    }
}

export default request
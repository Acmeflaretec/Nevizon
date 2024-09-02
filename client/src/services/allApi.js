import { ServerURL } from "./baseUrl";
import { commonApi } from "./commonapi"


export const getallproductsapi = async()=>{
    return await commonApi('GET',`${ServerURL}/api/v1/products`);
}
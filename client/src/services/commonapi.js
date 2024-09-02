import axios from "axios"


export const commonApi = async(httpRequest,url,reqBody,reqHeader)=>{
    const requestConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(requestConfig).then((result)=>{
        return result
    }).catch((error)=>{
        return error
    })
}
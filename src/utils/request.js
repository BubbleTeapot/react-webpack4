import axios from 'axios';
const request = (params) => {
    return axios({
        url: params.url,
        method: params.method,
        data: params.data,
        responseType: params.responseType
    })
}
export default request;
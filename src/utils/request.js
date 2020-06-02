import axios from 'axios';
import {isShowLoading} from './loading';

const baseURL = "http://localhost";
const instance = axios.create({
    baseURL,
    timeout: 10000
});
// 请求拦截期
instance.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        return config;
    },
    error => {
        console.warn(error);
        return Promise.reject(error); 
    }
);

// 相应拦截器
instance.interceptors.response.use(
    response => {
        isShowLoading(false);
        if(response.status === 200) {
            let data = response.data
            if(data.code === 10) {
                console.warn("未知错误!");
            }else {
                return data.data;
            }
        }
    },
    error => {
        isShowLoading(false);
        console.warn(error);
        return Promise.reject(error); 
    }
)

class request {
    static get(params, show = false) {
        isShowLoading(show);
        return instance.get(params.url, params.data)
    }
    static post(params, show = false) {
        isShowLoading(show);
        return instance.post(params.url, params.data)
    }
}
export default request;
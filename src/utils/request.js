import axios from 'axios';

const instance = axios.create({
    timeout: 3000
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
        return response;
    },
    error => {
        isShowLoading(false);
        console.warn(error);
        return Promise.reject(error); 
    }
)

// 加载动画
function isShowLoading() {

}
class request {
    static get(params,show) {
        isShowLoading(show);
        return instance.get(params.url, params.data)
    }
    static post(params,show) {
        isShowLoading(show);
        return instance.post(params.url, params.data)
    }
}
export default request;
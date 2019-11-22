import request from '@/utils/request';

export const getImgs1080 = (param) => {const params = {}; params.data = param; params.url="mock/img1080.json"; params.method = 'get'; request(params)};
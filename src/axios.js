import axs from 'axios';
import {TOKEN} from './constants';

export {CancelToken} from 'axios';

export const axios = axs.create({
    baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2/',
});

axios.defaults.headers.common['Accept-Language'] = 'ru';

axios.interceptors.request.use(function (config) {
    const user_session = localStorage.getItem(TOKEN);
    if (config.data) {
        const formData = new FormData();
        const data = config.data;
        Object.keys(data).forEach(item => formData.append(item, data[item]));
        if (user_session) {
            formData.append('token', user_session)
        }
        config.data = formData
    }

    config.params = {...config.params, developer: 'fit'};
    config.headers['Content-Type'] = 'multipart/form-data';

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    const {data} = response || {};
    if (data?.status === 'error') {
        return Promise.reject(data?.message);
    }
    return data?.message;
}, function (error) {
    return Promise.reject(error);
});

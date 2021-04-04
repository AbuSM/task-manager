import axs from 'axios';
import {getItem} from 'helpers';

export {CancelToken} from 'axios';

export const axios = axs.create({
    baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Fattoh',
});

axios.defaults.headers.common['Accept-Language'] = 'ru';

axios.interceptors.request.use(function (config) {
    const user_session = getItem(USER_SESSION);

    if (user_session) {
        config.headers['Authorization'] = `Bearer ${user_session}`;
    } else {
        config.headers['Authorization'] = '';
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../constants';
import {login} from '../api';

export const auth = (data) => async dispatch => {
    dispatch({type: LOGIN_REQUEST});
    try {
        login(data).then(res => {
            const {status, message} = res;
            if (status === 'ok' && message['token']) {
                const {token} = message;
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: token
                });
            } else {
                dispatch({type: LOGIN_FAILURE, payload: message});
            }
        }).catch(err => (
            dispatch({type: LOGIN_FAILURE, error: err})
        ));
    } catch (err) {
        console.error(err);
        const {data} = err.response || {};
        dispatch({
            type: LOGIN_FAILURE,
            error: data && data.errors
        });
    }
};

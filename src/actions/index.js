import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CHECK_TOKEN_FAILURE,
    CHECK_TOKEN_REQUEST,
    CHECK_TOKEN_SUCCESS,
    LOGOUT,
    TOKEN
} from '../constants';
import {login} from '../api';

/**
 * Authorize user
 * @param data
 * @returns {Function}
 */
export const auth = (data) => async dispatch => {
    dispatch({type: LOGIN_REQUEST});
    try {
        login(data)
            .then(res => {
                localStorage.setItem(TOKEN, res.token);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.token
                });
            })
            .catch(err => (
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: err
                })
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
/**
 * Action for checking token availability
 * @returns {Function}
 */
export const checkToken = () => async dispatch => {
    dispatch({type: CHECK_TOKEN_REQUEST});
    try {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            dispatch({type: CHECK_TOKEN_SUCCESS})
        } else {
            dispatch({type: CHECK_TOKEN_FAILURE})
        }
    } catch (err) {
        dispatch({type: CHECK_TOKEN_FAILURE})
    }
};

/**
 * Remove user token
 * @returns {Function}
 */
export const logout = () => async dispatch => {
    dispatch({type: LOGOUT});
    localStorage.removeItem(TOKEN);
};

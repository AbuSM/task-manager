import {combineReducers} from 'redux';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST
} from '../constants';
/**
 * Login reducer
 * @returns {Promise<void>}
 */

const initialState = {
    logged: false,
    error: null,
    loading: false,
};

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                logged: true,
                loading: false
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                logged: false,
                loading: false,
                error: action.payload
            };
        default:
            return state
    }
};

export default combineReducers({
    loginReducer,
});

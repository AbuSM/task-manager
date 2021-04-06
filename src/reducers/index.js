import {combineReducers} from 'redux';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    FETCH_DATA_REQUEST,
    FETCH_DATA_COMPLETE,
    ACTION_MODAL,
    ACTION_PARAMS,
    ACTION_ERRORS
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

const mainInitialState = {
    data: {},
    loading: false,
    errors: {},
    modal: {},
    params: {page: 1, sort_field: 'id', sort_direction: 'asc'}
};

const mainReducer = (state = mainInitialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DATA_COMPLETE:
            return {
                ...state,
                loading: false,
                data: action.payload,
                defaultValues: action.payload,
            };
        case ACTION_MODAL:
            return {
                ...state,
                modal: action.payload,
            };
        case ACTION_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case ACTION_PARAMS:
            return {
                ...state,
                params: action.payload
            };
        default:
            return state;
    }
};

export default combineReducers({
    loginReducer,
    mainReducer
});

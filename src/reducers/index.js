import {combineReducers} from 'redux';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    FETCH_DATA_REQUEST,
    FETCH_DATA_COMPLETE,
    ACTION_MODAL,
    ACTION_PARAMS,
    ACTION_ERRORS,
    CHECK_TOKEN_REQUEST,
    CHECK_TOKEN_SUCCESS,
    CHECK_TOKEN_FAILURE, LOGOUT
} from '../constants';

const initialState = {
    logged: false,
    error: {},
    loading: false,
};

/**
 * Reducer for login page
 * @param state
 * @param action
 * @returns {({logged, error, loading}&{logged: boolean, loading: boolean})|({logged, error, loading}&{logged: boolean, loading: boolean, token: *})|({logged, error, loading}&{logged: boolean, loading: boolean, error: *})|{logged: boolean, error: null, loading: boolean}|({logged, error, loading}&{loading: boolean})}
 */
const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case CHECK_TOKEN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
        case CHECK_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                logged: true,
                loading: false,
                error: {}
            };
        case LOGIN_FAILURE:
        case CHECK_TOKEN_FAILURE:
            return {
                ...state,
                logged: false,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                logged: false,
                error: {},
                loading: false
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

/**
 * Reducer for main page
 * @param state
 * @param action
 * @returns {{data: {}, loading: boolean, params: {sort_direction: string, sort_field: string, page: number}, errors: {}, modal: {}}|({data, loading, params, errors, modal}&{loading: boolean})|({data, loading, params, errors, modal}&{data: *, defaultValues: *, loading: boolean})|({data, loading, params, errors, modal}&{params: *})|({data, loading, params, errors, modal}&{errors: *})|({data, loading, params, errors, modal}&{modal: *})}
 */
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
                error: {}
            };
        case ACTION_MODAL:
            return {
                ...state,
                modal: action.payload,
                errors: {}
            };
        case ACTION_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case ACTION_PARAMS:
            return {
                ...state,
                params: action.payload,
                errors: {}
            };
        default:
            return state;
    }
};

export default combineReducers({
    loginReducer,
    mainReducer
});

import {
    CABANG_CREATE_FAIL,
    CABANG_CREATE_REQUEST,
    CABANG_CREATE_RESET,
    CABANG_CREATE_SUCCESS,
    CABANG_DELETE_FAIL,
    CABANG_DELETE_REQUEST,
    CABANG_DELETE_SUCCESS,
    CABANG_DETAILS_FAIL,
    CABANG_DETAILS_REQUEST,
    CABANG_DETAILS_SUCCESS,
    CABANG_LIST_FAIL,
    CABANG_LIST_REQUEST,
    CABANG_LIST_SUCCESS,
    CABANG_UPDATE_FAIL,
    CABANG_UPDATE_REQUEST,
    CABANG_UPDATE_RESET,
    CABANG_UPDATE_SUCCESS
} from "../constants/cabangConstants";


export const cabangListReducer = (state = { cabang: [] }, action) => {
    switch (action.type) {
        case CABANG_LIST_REQUEST:
            return { loading: true, cabang: [] }
        case CABANG_LIST_SUCCESS:
            return {
                loading: false,
                cabang: action.payload.cabang,
            }
        case CABANG_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cabangDetailsReducer = (state = { cabang: {} }, action) => {
    switch (action.type) {
        case CABANG_DETAILS_REQUEST:
            return { ...state, loading: true }
        case CABANG_DETAILS_SUCCESS:
            return { loading: false, cabang: action.payload }
        case CABANG_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cabangCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CABANG_CREATE_REQUEST:
            return { loading: true }
        case CABANG_CREATE_SUCCESS:
            return { loading: false, success: true, cabang: action.payload }
        case CABANG_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case CABANG_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const cabangUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CABANG_UPDATE_REQUEST:
            return { loading: true }
        case CABANG_UPDATE_SUCCESS:
            return { loading: false, success: true, cabang: action.payload }
        case CABANG_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case CABANG_UPDATE_RESET:
            return { cabang: {} }
        default:
            return state;
    }
}

export const cabangDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CABANG_DELETE_REQUEST:
            return { loading: true }
        case CABANG_DELETE_SUCCESS:
            return { loading: false, success: true }
        case CABANG_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
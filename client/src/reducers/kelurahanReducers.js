import {
    KELURAHAN_CREATE_FAIL,
    KELURAHAN_CREATE_REQUEST,
    KELURAHAN_CREATE_RESET,
    KELURAHAN_CREATE_SUCCESS,
    KELURAHAN_DELETE_FAIL,
    KELURAHAN_DELETE_REQUEST,
    KELURAHAN_DELETE_SUCCESS,
    KELURAHAN_DETAILS_FAIL,
    KELURAHAN_DETAILS_REQUEST,
    KELURAHAN_DETAILS_SUCCESS,
    KELURAHAN_LIST_FAIL,
    KELURAHAN_LIST_REQUEST,
    KELURAHAN_LIST_SUCCESS,
    KELURAHAN_UPDATE_FAIL,
    KELURAHAN_UPDATE_REQUEST,
    KELURAHAN_UPDATE_RESET,
    KELURAHAN_UPDATE_SUCCESS
} from '../constants/kelurahanConstants';

export const kelurahanListReducer = (state = { kelurahan: [] }, action) => {
    switch (action.type) {
        case KELURAHAN_LIST_REQUEST:
            return { loading: true, kelurahan: [] }
        case KELURAHAN_LIST_SUCCESS:
            return {
                loading: false,
                kelurahan: action.payload.kelurahan,
            }
        case KELURAHAN_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kelurahanDetailsReducer = (state = { kelurahan: {} }, action) => {
    switch (action.type) {
        case KELURAHAN_DETAILS_REQUEST:
            return { ...state, loading: true }
        case KELURAHAN_DETAILS_SUCCESS:
            return { loading: false, kelurahan: action.payload }
        case KELURAHAN_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kelurahanCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case KELURAHAN_CREATE_REQUEST:
            return { loading: true }
        case KELURAHAN_CREATE_SUCCESS:
            return { loading: false, success: true, kelurahan: action.payload }
        case KELURAHAN_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case KELURAHAN_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const kelurahanUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case KELURAHAN_UPDATE_REQUEST:
            return { loading: true }
        case KELURAHAN_UPDATE_SUCCESS:
            return { loading: false, success: true, kelurahan: action.payload }
        case KELURAHAN_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case KELURAHAN_UPDATE_RESET:
            return { kelurahan: {} }
        default:
            return state;
    }
}

export const kelurahanDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case KELURAHAN_DELETE_REQUEST:
            return { loading: true }
        case KELURAHAN_DELETE_SUCCESS:
            return { loading: false, success: true }
        case KELURAHAN_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
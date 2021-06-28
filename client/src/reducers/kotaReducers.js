import {
    KOTA_CREATE_FAIL,
    KOTA_CREATE_REQUEST,
    KOTA_CREATE_RESET,
    KOTA_CREATE_SUCCESS,
    KOTA_DELETE_FAIL,
    KOTA_DELETE_REQUEST,
    KOTA_DELETE_SUCCESS,
    KOTA_DETAILS_FAIL,
    KOTA_DETAILS_REQUEST,
    KOTA_DETAILS_SUCCESS,
    KOTA_LIST_FAIL,
    KOTA_LIST_REQUEST,
    KOTA_LIST_SUCCESS,
    KOTA_UPDATE_FAIL,
    KOTA_UPDATE_REQUEST,
    KOTA_UPDATE_RESET,
    KOTA_UPDATE_SUCCESS,
} from '../constants/kotaConstants';

export const kotaListReducer = (state = { kota: [] }, action) => {
    switch (action.type) {
        case KOTA_LIST_REQUEST:
            return { loading: true, kota: [] }
        case KOTA_LIST_SUCCESS:
            return {
                loading: false,
                kota: action.payload.kota,
            }
        case KOTA_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kotaDetailsReducer = (
    state = { kota: {} }, action) => {
    switch (action.type) {
        case KOTA_DETAILS_REQUEST:
            return { ...state, loading: true }
        case KOTA_DETAILS_SUCCESS:
            return { loading: false, kota: action.payload }
        case KOTA_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kotaCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case KOTA_CREATE_REQUEST:
            return { loading: true }
        case KOTA_CREATE_SUCCESS:
            return { loading: false, success: true, kota: action.payload }
        case KOTA_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case KOTA_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const kotaUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case KOTA_UPDATE_REQUEST:
            return { loading: true }
        case KOTA_UPDATE_SUCCESS:
            return { loading: false, success: true, kota: action.payload }
        case KOTA_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case KOTA_UPDATE_RESET:
            return { kota: {} }
        default:
            return state;
    }
}

export const kotaDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case KOTA_DELETE_REQUEST:
            return { loading: true }
        case KOTA_DELETE_SUCCESS:
            return { loading: false, success: true }
        case KOTA_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
import {
    WILAYAH_CREATE_FAIL,
    WILAYAH_CREATE_REQUEST,
    WILAYAH_CREATE_RESET,
    WILAYAH_CREATE_SUCCESS,
    WILAYAH_DELETE_FAIL,
    WILAYAH_DELETE_REQUEST,
    WILAYAH_DELETE_SUCCESS,
    WILAYAH_DETAILS_FAIL,
    WILAYAH_DETAILS_REQUEST,
    WILAYAH_DETAILS_SUCCESS,
    WILAYAH_LIST_FAIL,
    WILAYAH_LIST_REQUEST,
    WILAYAH_LIST_SUCCESS,
    WILAYAH_UPDATE_FAIL,
    WILAYAH_UPDATE_REQUEST,
    WILAYAH_UPDATE_RESET,
    WILAYAH_UPDATE_SUCCESS
} from "../constants/wilayahConstants";


export const wilayahListReducer = (state = { wilayah: [] }, action) => {
    switch (action.type) {
        case WILAYAH_LIST_REQUEST:
            return { loading: true, wilayah: [] }
        case WILAYAH_LIST_SUCCESS:
            return {
                loading: false,
                wilayah: action.payload.wilayah,
            }
        case WILAYAH_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const wilayahDetailsReducer = (state = { wilayah: {} }, action) => {
    switch (action.type) {
        case WILAYAH_DETAILS_REQUEST:
            return { ...state, loading: true }
        case WILAYAH_DETAILS_SUCCESS:
            return { loading: false, wilayah: action.payload }
        case WILAYAH_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const wilayahCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case WILAYAH_CREATE_REQUEST:
            return { loading: true }
        case WILAYAH_CREATE_SUCCESS:
            return { loading: false, success: true, wilayah: action.payload }
        case WILAYAH_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case WILAYAH_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const wilayahUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case WILAYAH_UPDATE_REQUEST:
            return { loading: true }
        case WILAYAH_UPDATE_SUCCESS:
            return { loading: false, success: true, wilayah: action.payload }
        case WILAYAH_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case WILAYAH_UPDATE_RESET:
            return { wilayah: {} }
        default:
            return state;
    }
}

export const wilayahDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case WILAYAH_DELETE_REQUEST:
            return { loading: true }
        case WILAYAH_DELETE_SUCCESS:
            return { loading: false, success: true }
        case WILAYAH_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
import {
    KODEPOS_CREATE_FAIL,
    KODEPOS_CREATE_REQUEST,
    KODEPOS_CREATE_RESET,
    KODEPOS_CREATE_SUCCESS,
    KODEPOS_DELETE_FAIL,
    KODEPOS_DELETE_REQUEST,
    KODEPOS_DELETE_SUCCESS,
    KODEPOS_DETAILS_FAIL,
    KODEPOS_DETAILS_REQUEST,
    KODEPOS_DETAILS_SUCCESS,
    KODEPOS_LIST_FAIL,
    KODEPOS_LIST_REQUEST,
    KODEPOS_LIST_SUCCESS,
    KODEPOS_UPDATE_FAIL,
    KODEPOS_UPDATE_REQUEST,
    KODEPOS_UPDATE_RESET,
    KODEPOS_UPDATE_SUCCESS
} from '../constants/kodeposConstants';

export const kodeposListReducer = (state = { kodepos: [] }, action) => {
    switch (action.type) {
        case KODEPOS_LIST_REQUEST:
            return { loading: true, kodepos: [] }
        case KODEPOS_LIST_SUCCESS:
            return {
                loading: false,
                kodepos: action.payload.kodepos,
            }
        case KODEPOS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kodeposDetailsReducer = (state = { kodepos: {} }, action) => {
    switch (action.type) {
        case KODEPOS_DETAILS_REQUEST:
            return { ...state, loading: true }
        case KODEPOS_DETAILS_SUCCESS:
            return { loading: false, kodepos: action.payload }
        case KODEPOS_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const kodeposCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case KODEPOS_CREATE_REQUEST:
            return { loading: true }
        case KODEPOS_CREATE_SUCCESS:
            return { loading: false, success: true, kodepos: action.payload }
        case KODEPOS_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case KODEPOS_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const kodeposUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case KODEPOS_UPDATE_REQUEST:
            return { loading: true }
        case KODEPOS_UPDATE_SUCCESS:
            return { loading: false, success: true, kodepos: action.payload }
        case KODEPOS_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case KODEPOS_UPDATE_RESET:
            return { kodepos: {} }
        default:
            return state;
    }
}

export const kodeposDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case KODEPOS_DELETE_REQUEST:
            return { loading: true }
        case KODEPOS_DELETE_SUCCESS:
            return { loading: false, success: true }
        case KODEPOS_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
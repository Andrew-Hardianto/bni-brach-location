import {
    PROVINSI_CREATE_FAIL,
    PROVINSI_CREATE_REQUEST,
    PROVINSI_CREATE_RESET,
    PROVINSI_CREATE_SUCCESS,
    PROVINSI_DELETE_FAIL,
    PROVINSI_DELETE_REQUEST,
    PROVINSI_DELETE_SUCCESS,
    PROVINSI_DETAILS_FAIL,
    PROVINSI_DETAILS_REQUEST,
    PROVINSI_DETAILS_SUCCESS,
    PROVINSI_LIST_FAIL,
    PROVINSI_LIST_REQUEST,
    PROVINSI_LIST_SUCCESS,
    PROVINSI_UPDATE_FAIL,
    PROVINSI_UPDATE_REQUEST,
    PROVINSI_UPDATE_RESET,
    PROVINSI_UPDATE_SUCCESS
} from "../constants/provinsiConstants";


export const provinsiListReducer = (state = { provinsi: [] }, action) => {
    switch (action.type) {
        case PROVINSI_LIST_REQUEST:
            return { loading: true, provinsi: [] }
        case PROVINSI_LIST_SUCCESS:
            return {
                loading: false,
                provinsi: action.payload.provinsi,
            }
        case PROVINSI_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const provinsiDetailsReducer = (
    state = { provinsi: {} }, action) => {
    switch (action.type) {
        case PROVINSI_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PROVINSI_DETAILS_SUCCESS:
            return { loading: false, provinsi: action.payload }
        case PROVINSI_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const provinsiCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROVINSI_CREATE_REQUEST:
            return { loading: true }
        case PROVINSI_CREATE_SUCCESS:
            return { loading: false, success: true, provinsi: action.payload }
        case PROVINSI_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PROVINSI_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const provinsiUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROVINSI_UPDATE_REQUEST:
            return { loading: true }
        case PROVINSI_UPDATE_SUCCESS:
            return { loading: false, success: true, provinsi: action.payload }
        case PROVINSI_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PROVINSI_UPDATE_RESET:
            return { provinsi: {} }
        default:
            return state;
    }
}

export const provinsiDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PROVINSI_DELETE_REQUEST:
            return { loading: true }
        case PROVINSI_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PROVINSI_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
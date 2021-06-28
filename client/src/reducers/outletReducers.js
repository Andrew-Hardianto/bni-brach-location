import {
    OUTLET_CREATE_FAIL,
    OUTLET_CREATE_REQUEST,
    OUTLET_CREATE_RESET,
    OUTLET_CREATE_SUCCESS,
    OUTLET_DELETE_FAIL,
    OUTLET_DELETE_REQUEST,
    OUTLET_DELETE_SUCCESS,
    OUTLET_DETAILS_FAIL,
    OUTLET_DETAILS_REQUEST,
    OUTLET_DETAILS_SUCCESS,
    OUTLET_LIST_FAIL,
    OUTLET_LIST_REQUEST,
    OUTLET_LIST_SUCCESS,
    OUTLET_UPDATE_FAIL,
    OUTLET_UPDATE_REQUEST,
    OUTLET_UPDATE_RESET,
    OUTLET_UPDATE_SUCCESS
} from "../constants/outletConstants";


export const outletListReducer = (state = { outlet: [] }, action) => {
    switch (action.type) {
        case OUTLET_LIST_REQUEST:
            return { loading: true, outlet: [] }
        case OUTLET_LIST_SUCCESS:
            return {
                loading: false,
                outlet: action.payload.outlet,
            }
        case OUTLET_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const outletDetailsReducer = (state = { outlet: {} }, action) => {
    switch (action.type) {
        case OUTLET_DETAILS_REQUEST:
            return { ...state, loading: true }
        case OUTLET_DETAILS_SUCCESS:
            return { loading: false, outlet: action.payload }
        case OUTLET_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const outletCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case OUTLET_CREATE_REQUEST:
            return { loading: true }
        case OUTLET_CREATE_SUCCESS:
            return { loading: false, success: true, outlet: action.payload }
        case OUTLET_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case OUTLET_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const outletUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case OUTLET_UPDATE_REQUEST:
            return { loading: true }
        case OUTLET_UPDATE_SUCCESS:
            return { loading: false, success: true, outlet: action.payload }
        case OUTLET_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case OUTLET_UPDATE_RESET:
            return { outlet: {} }
        default:
            return state;
    }
}

export const outletDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case OUTLET_DELETE_REQUEST:
            return { loading: true }
        case OUTLET_DELETE_SUCCESS:
            return { loading: false, success: true }
        case OUTLET_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
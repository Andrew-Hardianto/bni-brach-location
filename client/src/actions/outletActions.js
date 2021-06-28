import axios from 'axios';

import {
    OUTLET_CREATE_FAIL,
    OUTLET_CREATE_REQUEST,
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
    OUTLET_UPDATE_SUCCESS
} from "../constants/outletConstants"


export const listOutlet = () => async (dispatch) => {
    try {
        dispatch({ type: OUTLET_LIST_REQUEST })

        const { data } = await axios.get(
            `/outlet`
        )

        dispatch({
            type: OUTLET_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: OUTLET_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailOutlet = (id) => async (dispatch) => {
    try {
        dispatch({ type: OUTLET_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/outlet/${id}`
        )

        dispatch({
            type: OUTLET_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: OUTLET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createOutlet = (kode, nama, alamat, kodeCabang, kodePos, biLocationCode, latitude, longitude) => async (dispatch) => {
    try {
        dispatch({ type: OUTLET_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { postData } = await axios.post(
            '/outlet',
            { kode, nama, alamat, kodeCabang, kodePos, biLocationCode, latitude, longitude },
            config
        )

        dispatch({
            type: OUTLET_CREATE_SUCCESS,
            payload: postData,
        })
    } catch (error) {
        dispatch({
            type: OUTLET_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editOutlet = (outlet) => async (dispatch) => {
    try {
        dispatch({ type: OUTLET_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { dataPost } = await axios.put(`/outlet/${outlet.id}`, outlet, config);

        dispatch({
            type: OUTLET_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: OUTLET_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteOutlet = (id) => async (dispatch) => {
    try {
        dispatch({ type: OUTLET_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/outlet/${id}`, config);

        dispatch({
            type: OUTLET_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: OUTLET_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
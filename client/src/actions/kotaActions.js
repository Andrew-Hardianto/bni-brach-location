import axios from 'axios';

import {
    KOTA_CREATE_FAIL,
    KOTA_CREATE_REQUEST,
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
    KOTA_UPDATE_SUCCESS
} from "../constants/kotaConstants";

export const listKota = () => async (
    dispatch
) => {
    try {
        dispatch({ type: KOTA_LIST_REQUEST })

        const { data } = await axios.get(
            `/kota`
        )

        dispatch({
            type: KOTA_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KOTA_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailKota = (id) => async (dispatch) => {
    try {
        dispatch({ type: KOTA_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/kota/${id}`
        )

        dispatch({
            type: KOTA_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KOTA_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createKota = (data) => async (dispatch) => {
    try {
        dispatch({ type: KOTA_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { kota } = await axios.post(
            '/kota',
            data,
            config
        )

        dispatch({
            type: KOTA_CREATE_SUCCESS,
            payload: kota,
        })

    } catch (error) {
        dispatch({
            type: KOTA_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editKota = (kota) => async (dispatch) => {
    try {
        dispatch({ type: KOTA_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { dataPost } = await axios.put(`/kota/${kota.id}`, kota, config);

        dispatch({
            type: KOTA_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: KOTA_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteKota = (id) => async (dispatch) => {
    try {
        dispatch({ type: KOTA_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/kota/${id}`, config);

        dispatch({
            type: KOTA_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: KOTA_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
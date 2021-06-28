import axios from 'axios';

import {
    KECAMATAN_CREATE_FAIL,
    KECAMATAN_CREATE_REQUEST,
    KECAMATAN_CREATE_SUCCESS,
    KECAMATAN_DELETE_FAIL,
    KECAMATAN_DELETE_REQUEST,
    KECAMATAN_DELETE_SUCCESS,
    KECAMATAN_DETAILS_FAIL,
    KECAMATAN_DETAILS_REQUEST,
    KECAMATAN_DETAILS_SUCCESS,
    KECAMATAN_LIST_FAIL,
    KECAMATAN_LIST_REQUEST,
    KECAMATAN_LIST_SUCCESS,
    KECAMATAN_UPDATE_FAIL,
    KECAMATAN_UPDATE_REQUEST,
    KECAMATAN_UPDATE_SUCCESS
} from "../constants/kecamatanConstants";

export const listKecamatan = () => async (
    dispatch
) => {
    try {
        dispatch({ type: KECAMATAN_LIST_REQUEST })

        const { data } = await axios.get(
            `/kecamatan`
        )

        dispatch({
            type: KECAMATAN_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailKecamatan = (id) => async (dispatch) => {
    try {
        dispatch({ type: KECAMATAN_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/kecamatan/${id}`
        )

        dispatch({
            type: KECAMATAN_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createKecamatan = (data) => async (dispatch) => {
    try {
        dispatch({ type: KECAMATAN_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { kec } = await axios.post(
            '/kecamatan',
            data,
            config
        )

        dispatch({
            type: KECAMATAN_CREATE_SUCCESS,
            payload: kec,
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editKecamatan = (data) => async (dispatch) => {
    try {
        dispatch({ type: KECAMATAN_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { dataPost } = await axios.put(`/kecamatan/${data.id}`, data, config);

        dispatch({
            type: KECAMATAN_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteKecamatan = (id) => async (dispatch) => {
    try {
        dispatch({ type: KECAMATAN_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/kecamatan/${id}`, config);

        dispatch({
            type: KECAMATAN_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: KECAMATAN_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
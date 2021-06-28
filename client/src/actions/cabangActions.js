import axios from 'axios';

import {
    CABANG_CREATE_FAIL,
    CABANG_CREATE_REQUEST,
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
    CABANG_UPDATE_SUCCESS
} from "../constants/cabangConstants"


export const listCabang = () => async (dispatch) => {
    try {
        dispatch({ type: CABANG_LIST_REQUEST })

        const { data } = await axios.get(
            `/cabang`
        )

        dispatch({
            type: CABANG_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CABANG_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailCabang = (id) => async (dispatch) => {
    try {
        dispatch({ type: CABANG_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/cabang/${id}`
        )

        dispatch({
            type: CABANG_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CABANG_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createCabang = (kode, nama, alamat, kodeWilayah, kodePos, biLocationCode, latitude, longitude) => async (dispatch) => {
    try {
        dispatch({ type: CABANG_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { postData } = await axios.post(
            '/cabang',
            { kode, nama, alamat, kodeWilayah, kodePos, biLocationCode, latitude, longitude },
            config
        )

        dispatch({
            type: CABANG_CREATE_SUCCESS,
            payload: postData,
        })
    } catch (error) {
        dispatch({
            type: CABANG_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editCabang = (cabang) => async (dispatch) => {
    try {
        dispatch({ type: CABANG_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { dataPost } = await axios.put(`/cabang/${cabang.id}`, cabang, config);

        dispatch({
            type: CABANG_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: CABANG_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteCabang = (id) => async (dispatch) => {
    try {
        dispatch({ type: CABANG_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/cabang/${id}`, config);

        dispatch({
            type: CABANG_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: CABANG_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
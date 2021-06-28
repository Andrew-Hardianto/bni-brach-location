import axios from 'axios';

import {
    KELURAHAN_CREATE_FAIL,
    KELURAHAN_CREATE_REQUEST,
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
    KELURAHAN_UPDATE_SUCCESS
} from "../constants/kelurahanConstants";

export const listKelurahan = () => async (
    dispatch
) => {
    try {
        dispatch({ type: KELURAHAN_LIST_REQUEST })

        const { data } = await axios.get(
            `/kelurahan`
        )

        dispatch({
            type: KELURAHAN_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailKelurahan = (id) => async (dispatch) => {
    try {
        dispatch({ type: KELURAHAN_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/kelurahan/${id}`
        )

        dispatch({
            type: KELURAHAN_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createKelurahan = (data) => async (dispatch) => {
    try {
        dispatch({ type: KELURAHAN_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { prov } = await axios.post(
            '/kelurahan',
            data,
            config
        )

        dispatch({
            type: KELURAHAN_CREATE_SUCCESS,
            payload: prov,
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editKelurahan = (kelurahan) => async (dispatch) => {
    try {
        dispatch({ type: KELURAHAN_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { dataPost } = await axios.put(`/kelurahan/${kelurahan.id}`, kelurahan, config);

        dispatch({
            type: KELURAHAN_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteKelurahan = (id) => async (dispatch) => {
    try {
        dispatch({ type: KELURAHAN_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/kelurahan/${id}`, config);

        dispatch({
            type: KELURAHAN_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: KELURAHAN_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
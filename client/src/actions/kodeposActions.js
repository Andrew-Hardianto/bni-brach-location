import axios from 'axios';

import {
    KODEPOS_CREATE_FAIL,
    KODEPOS_CREATE_REQUEST,
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
    KODEPOS_UPDATE_SUCCESS
} from "../constants/kodeposConstants";

export const listKodepos = () => async (
    dispatch
) => {
    try {
        dispatch({ type: KODEPOS_LIST_REQUEST })

        const { data } = await axios.get(
            `/kodepos`
        )

        dispatch({
            type: KODEPOS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KODEPOS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const detailKodepos = (id) => async (dispatch) => {
    try {
        dispatch({ type: KODEPOS_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/kodepos/${id}`
        )

        dispatch({
            type: KODEPOS_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KODEPOS_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createKodepos = (data) => async (dispatch) => {
    try {
        dispatch({ type: KODEPOS_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { kodepos } = await axios.post(
            '/kodepos',
            data,
            config
        )

        dispatch({
            type: KODEPOS_CREATE_SUCCESS,
            payload: kodepos,
        })
    } catch (error) {
        dispatch({
            type: KODEPOS_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editKodepos = (data) => async (dispatch) => {
    try {
        dispatch({ type: KODEPOS_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { dataPost } = await axios.put(`/kodepos/${data.id}`, data, config);

        dispatch({
            type: KODEPOS_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: KODEPOS_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteKodepos = (id) => async (dispatch) => {
    try {
        dispatch({ type: KODEPOS_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/kodepos/${id}`, config);

        dispatch({
            type: KODEPOS_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: KODEPOS_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
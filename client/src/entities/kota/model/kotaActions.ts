import axios from 'axios';
import { getErrorMessage } from '@/shared/utils/errorHandler';

import {
    KOTA_ALL_FAIL,
    KOTA_ALL_REQUEST,
    KOTA_ALL_SUCCESS,
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
} from "@/entities/kota/model/kotaConstants";

export const listKota = (page: any = 1, limit: any = 10, keyword: any = '') => async (
    dispatch
) => {
    try {
        dispatch({ type: KOTA_LIST_REQUEST })

        const { data } = await axios.get(
            `/kota?page=${page}&limit=${limit}&keyword=${keyword}`
        )

        dispatch({
            type: KOTA_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KOTA_LIST_FAIL,
            payload:
                getErrorMessage(error),
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
                getErrorMessage(error),
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

        const { data: kota } = await axios.post(
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
                getErrorMessage(error),
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

        const { data: dataPost } = await axios.put(`/kota/${kota.id}`, kota, config);

        dispatch({
            type: KOTA_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: KOTA_UPDATE_FAIL,
            payload: getErrorMessage(error)
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
            payload: getErrorMessage(error),
        })
    }
}

export const Kota = () => async (
    dispatch
) => {
    try {
        dispatch({ type: KOTA_ALL_REQUEST })

        const { data } = await axios.get(
            `/kota/kabupaten`
        )

        dispatch({
            type: KOTA_ALL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: KOTA_ALL_FAIL,
            payload:
                getErrorMessage(error),
        })
    }
}
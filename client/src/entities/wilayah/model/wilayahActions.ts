import axios from 'axios';
import { getErrorMessage } from '@/shared/utils/errorHandler';

import {
    WILAYAH_CREATE_FAIL,
    WILAYAH_CREATE_REQUEST,
    WILAYAH_CREATE_SUCCESS,
    WILAYAH_DELETE_FAIL,
    WILAYAH_DELETE_REQUEST,
    WILAYAH_DELETE_SUCCESS,
    WILAYAH_DETAILS_FAIL,
    WILAYAH_DETAILS_REQUEST,
    WILAYAH_DETAILS_SUCCESS,
    WILAYAH_LIST_FAIL,
    WILAYAH_LIST_REQUEST,
    WILAYAH_LIST_SUCCESS,
    WILAYAH_UPDATE_FAIL,
    WILAYAH_UPDATE_REQUEST,
    WILAYAH_UPDATE_SUCCESS
} from "@/entities/wilayah/model/wilayahConstants"


export const listWilayah = (page: any = 1, limit: any = 10, keyword: any = '') => async (dispatch) => {
    try {
        dispatch({ type: WILAYAH_LIST_REQUEST })

        const { data } = await axios.get(
            `/wilayah?page=${page}&limit=${limit}&keyword=${keyword}`
        )

        dispatch({
            type: WILAYAH_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WILAYAH_LIST_FAIL,
            payload:
                getErrorMessage(error),
        })
    }
}

export const detailWilayah = (id) => async (dispatch) => {
    try {
        dispatch({ type: WILAYAH_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/wilayah/${id}`
        )

        dispatch({
            type: WILAYAH_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WILAYAH_DETAILS_FAIL,
            payload:
                getErrorMessage(error),
        })
    }
}

export const createWilayah = (data) => async (dispatch) => {
    try {
        dispatch({ type: WILAYAH_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data: postData } = await axios.post(
            '/wilayah',
            data,
            config
        )

        dispatch({
            type: WILAYAH_CREATE_SUCCESS,
            payload: postData,
        })
    } catch (error) {
        dispatch({
            type: WILAYAH_CREATE_FAIL,
            payload:
                getErrorMessage(error),
        })
    }
}

export const editWilayah = (wilayah) => async (dispatch) => {
    try {
        dispatch({ type: WILAYAH_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data: dataPost } = await axios.put(`/wilayah/${wilayah.ID_Region}`, wilayah, config);

        dispatch({
            type: WILAYAH_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: WILAYAH_UPDATE_FAIL,
            payload: getErrorMessage(error)
        })
    }
}

export const deleteWilayah = (id) => async (dispatch) => {
    try {
        dispatch({ type: WILAYAH_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/wilayah/${id}`, config);

        dispatch({
            type: WILAYAH_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: WILAYAH_DELETE_FAIL,
            payload: getErrorMessage(error),
        })
    }
}
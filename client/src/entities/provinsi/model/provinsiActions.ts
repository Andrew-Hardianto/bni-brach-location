import axios from 'axios';
import { getErrorMessage } from '@/shared/utils/errorHandler';

import {
    PROVINSI_CREATE_FAIL,
    PROVINSI_CREATE_REQUEST,
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
    PROVINSI_UPDATE_SUCCESS
} from "@/entities/provinsi/model/provinsiConstants"


export const listProvinsi = (page: any = 1, limit: any = 10, keyword: any = '') => async (
    dispatch
) => {
    try {
        dispatch({ type: PROVINSI_LIST_REQUEST })

        const { data } = await axios.get(
            `/provinsi?page=${page}&limit=${limit}&keyword=${keyword}`
        )

        dispatch({
            type: PROVINSI_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_LIST_FAIL,
            payload:
                getErrorMessage(error),
        })
    }
}

export const detailProvinsi = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROVINSI_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/provinsi/${id}`
        )

        dispatch({
            type: PROVINSI_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_DETAILS_FAIL,
            payload:
                getErrorMessage(error),
        })
    }
}

export const createProvinsi = (Provinsi_Code, Provinsi_Name, BI_Location_Code, Status) => async (dispatch) => {
    try {
        dispatch({ type: PROVINSI_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/provinsi',
            { Provinsi_Code, Provinsi_Name, BI_Location_Code, Status },
            config
        )

        dispatch({
            type: PROVINSI_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_CREATE_FAIL,
            payload:
                getErrorMessage(error),
        })
    }
}

export const editProvinsi = (provinsi) => async (dispatch) => {
    try {
        dispatch({ type: PROVINSI_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data: dataPost } = await axios.put(`/provinsi/${provinsi.ID_Provinsi}`, provinsi, config);

        dispatch({
            type: PROVINSI_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_UPDATE_FAIL,
            payload: getErrorMessage(error)
        })
    }
}

export const deleteProvinsi = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROVINSI_DELETE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.delete(`/provinsi/${id}`, config);

        dispatch({
            type: PROVINSI_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PROVINSI_DELETE_FAIL,
            payload: getErrorMessage(error),
        })
    }
}
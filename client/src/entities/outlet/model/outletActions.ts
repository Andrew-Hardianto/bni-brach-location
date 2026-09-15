import axios from 'axios';
import { getErrorMessage } from '@/shared/utils/errorHandler';

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
} from "@/entities/outlet/model/outletConstants"


export const listOutlet = (page: any = 1, limit: any = 10, keyword: any = '') => async (dispatch) => {
    try {
        dispatch({ type: OUTLET_LIST_REQUEST })

        const { data } = await axios.get(
            `/outlet?page=${page}&limit=${limit}&keyword=${keyword}`
        )

        dispatch({
            type: OUTLET_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: OUTLET_LIST_FAIL,
            payload:
                getErrorMessage(error),
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
                getErrorMessage(error),
        })
    }
}

export const createOutlet = (Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude) => async (dispatch) => {
    try {
        dispatch({ type: OUTLET_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data: postData } = await axios.post(
            '/outlet',
            { Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude },
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
                getErrorMessage(error),
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

        const { data: dataPost } = await axios.put(`/outlet/${outlet.ID_Outlet}`, outlet, config);

        dispatch({
            type: OUTLET_UPDATE_SUCCESS,
            payload: dataPost
        })
    } catch (error) {
        dispatch({
            type: OUTLET_UPDATE_FAIL,
            payload: getErrorMessage(error)
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
            payload: getErrorMessage(error),
        })
    }
}
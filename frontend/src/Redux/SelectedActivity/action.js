import axios from "axios"

import { DELETE_SELECTED_ACTIVITY, GET_SELECTED_ACTIVITY, POST_SELECTED_ACTIVITY, SELECTED_ACTIVITY_FAILURE, SELECTED_ACTIVITY_REQUEST, UPDATE_SELECTED_ACTIVITY } from "./actionType"

const token = localStorage.getItem("token")
export const postSelectedActivity = (payload) => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .post(`https://helpful-jay-neckerchief.cyclic.app/selectedactivity/add`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data, "selectedactivity");
            dispatch({ type: POST_SELECTED_ACTIVITY });

        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}

export const getSelectedActivity = () => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .get(`https://helpful-jay-neckerchief.cyclic.app/selectedactivity`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            dispatch({ type: GET_SELECTED_ACTIVITY, payload: res.data.data.selectedActivities })

        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}
export const updateSelectedActivity = (id, payload) => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .patch(`https://helpful-jay-neckerchief.cyclic.app/selectedactivity/update/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            // console.log(res.data.data, "selectedactivity");
            dispatch({ type: UPDATE_SELECTED_ACTIVITY });
        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}
export const deleteSelectedActivity = (id) => (dispatch) => {
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .delete(`https://helpful-jay-neckerchief.cyclic.app/selectedactivity/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        .then((res) => {
            console.log(res.data.data, "selectedactivity");
            dispatch({ type: DELETE_SELECTED_ACTIVITY })
        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}
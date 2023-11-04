import axios from "axios"
import { DELETE_ACTIVITY, DELETE_ACTIVITY_FAILURE, DELETE_ACTIVITY_REQUEST, GET_ACTIVITY, GET_ACTIVITY_FAILURE, GET_ACTIVITY_REQUEST, UPDATE_ACTIVITY, UPDATE_ACTIVITY_FAILURE, UPDATE_ACTIVITY_REQUEST } from "./actionType";

export const getActivity = (payload) => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: GET_ACTIVITY_REQUEST })
    return axios
        .get(`http://localhost:8080/activity`)
        .then((res) => {
            // console.log(res.data.data, "activity");
            dispatch({ type: GET_ACTIVITY, payload: res.data.data.activities })
        })
        .catch((err) => {
            dispatch({ type: GET_ACTIVITY_FAILURE, payload: err.message })
        })
}
export const updateActivity = (id) => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: UPDATE_ACTIVITY_REQUEST })
    return axios
        .patch(`http://localhost:4500/activity/update/${id}`)
        .then((res) => {
            console.log(res.data.data, "activity");
            dispatch({ type: UPDATE_ACTIVITY, payload: res.data.data.activities })
        })
        .catch((err) => {
            dispatch({ type: UPDATE_ACTIVITY_FAILURE, payload: err.message })
        })
}
export const deleteActivity = (id) => (dispatch) => {
    dispatch({ type: DELETE_ACTIVITY_REQUEST })
    return axios
        .patch(`http://localhost:4500/activity/delete/${id}`)
        .then((res) => {
            console.log(res.data.data, "activity");
            dispatch({ type: DELETE_ACTIVITY, payload: res.data.data.activities })
        })
        .catch((err) => {
            dispatch({ type: DELETE_ACTIVITY_FAILURE, payload: err.message })
        })
}
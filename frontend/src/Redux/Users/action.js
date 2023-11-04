import axios from "axios"
import { DELETE_USER, DELETE_USER_FAILURE, DELETE_USER_REQUEST, GET_USER, GET_USER_FAILURE, GET_USER_REQUEST, UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST } from "./actionType";

export const getUser =  (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    return axios
        .get(`http://localhost:4500/user`)
        .then((res) => {
            console.log(res,"user")
            dispatch({ type: GET_USER, payload: res.data.data.user })
        })
        .catch((err) => {
            dispatch({ type: GET_USER_FAILURE, payload: err.message })
        })
}
export const updateUser = (id) => (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST })
    return axios
        .patch(`http://localhost:4500/user/update/${id}`)
        .then((res) => {
            console.log(res.data.data, "USER");
            dispatch({ type: UPDATE_USER, payload: res.data.data.user })
        })
        .catch((err) => {
            dispatch({ type: UPDATE_USER_FAILURE, payload: err.message })
        })
}
export const deleteUser = (id) => (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST })
    return axios
        .patch(`http://localhost:4500/user/delete/${id}`)
        .then((res) => {
            console.log(res.data.data, "USER");
            dispatch({ type: DELETE_USER, payload: res.data.data.user })
        })
        .catch((err) => {
            dispatch({ type: DELETE_USER_FAILURE, payload: err.message })
        })
}
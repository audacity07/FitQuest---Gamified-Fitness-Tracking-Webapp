import axios from "axios"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType"

export const login = (userData) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    return axios
        .post(`http://localhost:3000/users/login`, userData)
        .then((res) => {
            console.log(res.data);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.token })
        })
        .catch((err) => {
            dispatch({ type: LOGIN_FAILURE, payload: err.message })
        })
}
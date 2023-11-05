import axios from "axios"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType"

export const login = (userData) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    return axios

        .post(`http://localhost:8080/user/login`, userData)

        .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.data })
        })
        .catch((err) => {
            dispatch({ type: LOGIN_FAILURE, payload: err.message })
        })
}

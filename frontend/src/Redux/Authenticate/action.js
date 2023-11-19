import axios from "axios";
import { REQUEST_SUCCESS, REQUEST_FAILURE, LOGIN, LOGOUT } from "./actionType";

const URL = `https://helpful-jay-neckerchief.cyclic.app/user`;

export const login = (paramsObj) => (dispatch) => {
  dispatch({ type: REQUEST_SUCCESS });
  return axios
    .post(`${URL}/login`, paramsObj)
    .then((res) => {
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("userID", res.data.data.userID);
      dispatch({ type: LOGIN, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_FAILURE, payload: err.message });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: REQUEST_SUCCESS });
  const token = localStorage.getItem("token");
  return axios
    .post(`${URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      localStorage.clear();
      dispatch({ type: LOGOUT });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_FAILURE, payload: err.message });
    });
};

import axios from "axios";
import {
  USER_FAILURE,
  USER_REQUEST,
  DELETE_USER,
  GET_USER,
  PATCH_USER,
} from "./actionType";

const URL = `https://helpful-jay-neckerchief.cyclic.app/`;

export const getUser = () => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return axios
    .get(`${URL}/user`)
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data.data.users });
    })
    .catch((err) => {
      dispatch({ type: USER_FAILURE, payload: err.message });
    });
};

export const updateUser = (id, paramsObj) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return axios
    .patch(`${URL}/user/update/${id}`, paramsObj)
    .then((res) => {
      dispatch({ type: PATCH_USER, payload: { id, data: paramsObj } });
    })
    .catch((err) => {
      dispatch({ type: USER_FAILURE, payload: err.message });
    });
};

export const postUser = (paramsObj) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return axios
    .post(`${URL}/user/register`, paramsObj)
    .then(() => {
      // console.log(res.data.data, "USER");
    })
    .catch((err) => {
      dispatch({ type: USER_FAILURE, payload: err.message });
    });
};

export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return axios
    .delete(`${URL}/user/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_USER, payload: id });
    })
    .catch((err) => {
      dispatch({ type: USER_FAILURE, payload: err.message });
    });
};

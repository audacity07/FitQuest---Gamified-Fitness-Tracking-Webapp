import axios from "axios";
import {
  ACTIVITY_FAILURE,
  ACTIVITY_REQUEST,
  DELETE_ACTIVITY,
  GET_ACTIVITY,
  PATCH_ACTIVITY,
} from "./actionType";

const URL = `https://helpful-jay-neckerchief.cyclic.app/activity`;

export const postActivity = (paramsObj) => (dispatch) => {
  // console.log(payload,"payload")
  dispatch({ type: ACTIVITY_REQUEST });
  return axios
    .post(`${URL}/add`, paramsObj)
    .then(() => {})
    .catch((err) => {
      dispatch({ type: ACTIVITY_FAILURE, payload: err.message });
    });
};

export const getActivity = () => (dispatch) => {
  // console.log(payload,"payload")
  dispatch({ type: ACTIVITY_REQUEST });
  return axios
    .get(`${URL}`)
    .then((res) => {
      dispatch({ type: GET_ACTIVITY, payload: res.data.data.activities });
    })
    .catch((err) => {
      dispatch({ type: ACTIVITY_FAILURE, payload: err.message });
    });
};

export const updateActivity = (id, paramsObj) => (dispatch) => {
  // console.log(payload,"payload")
  dispatch({ type: ACTIVITY_REQUEST });
  return axios
    .patch(`${URL}/update/${id}`, paramsObj)
    .then((res) => {
      dispatch({
        type: PATCH_ACTIVITY,
        payload: { id, data: paramsObj },
      });
    })
    .catch((err) => {
      dispatch({ type: ACTIVITY_FAILURE, payload: err.message });
    });
};

export const deleteActivity = (id) => (dispatch) => {
  dispatch({ type: ACTIVITY_REQUEST });
  return axios
    .patch(`${URL}/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_ACTIVITY, payload: id });
    })
    .catch((err) => {
      dispatch({ type: ACTIVITY_FAILURE, payload: err.message });
    });
};

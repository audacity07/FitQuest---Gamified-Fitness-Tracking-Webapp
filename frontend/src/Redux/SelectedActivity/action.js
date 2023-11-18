import axios from "axios";

import {
  DELETE_SELECTED_ACTIVITY,
  GET_SELECTED_ACTIVITY,
  SELECTED_ACTIVITY_FAILURE,
  SELECTED_ACTIVITY_REQUEST,
  UPDATE_SELECTED_ACTIVITY,
} from "./actionType";

const URL = `http://localhost:8080/selectedactivity`;

export const postSelectedActivity = (paramsObj) => (dispatch) => {
  dispatch({ type: SELECTED_ACTIVITY_REQUEST });
  const token = localStorage.getItem("token");
  return axios
    .post(`${URL}/add`, paramsObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log(res.data, "selectedactivity");
      // dispatch({ type: POST_SELECTED_ACTIVITY });
    })
    .catch((err) => {
      dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message });
    });
};

export const getSelectedActivity = () => (dispatch) => {
  dispatch({ type: SELECTED_ACTIVITY_REQUEST });
  const token = localStorage.getItem("token");
  axios
    .get(`${URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_SELECTED_ACTIVITY,
        payload: res.data.data.selectedActivities,
      });
    })
    .catch((err) => {
      dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message });
    });
};

export const updateSelectedActivity = (id, paramsObj) => (dispatch) => {
  dispatch({ type: SELECTED_ACTIVITY_REQUEST });
  const token = localStorage.getItem("token");
  return axios
    .patch(`${URL}/update/${id}`, paramsObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: UPDATE_SELECTED_ACTIVITY,
        payload: { id, data: paramsObj },
      });
    })
    .catch((err) => {
      dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message });
    });
};

export const deleteSelectedActivity = (id) => (dispatch) => {
  dispatch({ type: SELECTED_ACTIVITY_REQUEST });
  const token = localStorage.getItem("token");
  return axios
    .delete(`${URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({ type: DELETE_SELECTED_ACTIVITY, payload: id });
    })
    .catch((err) => {
      dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message });
    });
};

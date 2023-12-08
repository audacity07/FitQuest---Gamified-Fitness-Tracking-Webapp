import axios from "axios";
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  GET_NOTIFICATION,
  DELETE_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from "./actionTypes";

const URL = `${process.env.REACT_APP_API_URL}/notification`;

export function getNotification() {
  return async function (dispatch) {
    dispatch({ type: NOTIFICATION_REQUEST });
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_NOTIFICATION, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: NOTIFICATION_FAILURE });
    }
  };
}

export function updateNotification(id, paramsObj) {
  return async function (dispatch) {
    dispatch({ type: NOTIFICATION_REQUEST });
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: UPDATE_NOTIFICATION,
        payload: { id, data: paramsObj },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: NOTIFICATION_FAILURE });
    }
  };
}

export function deleteNotification(id) {
  return async function (dispatch) {
    dispatch({ type: NOTIFICATION_REQUEST });
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: DELETE_NOTIFICATION, payload: id });
    } catch (error) {
      console.log(error);
      dispatch({ type: NOTIFICATION_FAILURE });
    }
  };
}

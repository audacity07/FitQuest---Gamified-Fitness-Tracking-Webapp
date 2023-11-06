import axios from "axios";
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
} from "./actionTypes";
const token = localStorage.getItem("token")
export function getNotification() {
  return async function (dispatch) {
    dispatch({ type: NOTIFICATION_REQUEST });
    try {
      const res = await axios.get("https://helpful-jay-neckerchief.cyclic.app/notification", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res)
      dispatch({ type: GET_NOTIFICATION_SUCCESS, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: NOTIFICATION_FAILURE });
    }
  };
}

export function deleteNotification(id) {
  return async function (dispatch) {
    dispatch({ type: NOTIFICATION_REQUEST });
    try {
      await axios.delete(`https://helpful-jay-neckerchief.cyclic.app/notification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({ type: DELETE_NOTIFICATION_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: NOTIFICATION_FAILURE });
    }
  };
}

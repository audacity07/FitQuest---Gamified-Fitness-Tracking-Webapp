import axios from "axios";
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
} from "./actionTypes";

export function getNotification() {
  return async function (dispatch) {
    dispatch({ type: NOTIFICATION_REQUEST });
    try {
      const res = await axios.get("http://localhost:8080/notification", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
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
      await axios.delete(`http://localhost:8080/notification/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
        }
      });
      dispatch({ type: DELETE_NOTIFICATION_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: NOTIFICATION_FAILURE });
    }
  };
}

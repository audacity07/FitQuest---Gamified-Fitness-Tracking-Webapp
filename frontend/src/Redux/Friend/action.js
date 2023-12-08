import axios from "axios";
import {
  DELETE_FRIEND,
  FRIEND_FAILURE,
  FRIEND_REQUEST,
  GET_FRIEND,
  PATCH_FRIEND,
} from "./actionTypes";

const URL = `${process.env.REACT_APP_API_URL}/friend`;

export function postFriend(paramsObj) {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    const token = localStorage.getItem("token");
    try {
      let res = await axios.post(`${URL}/follow`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}

export function getFriend() {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${URL}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_FRIEND, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}

export function patchFriend(paramsObj) {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`${URL}/followback`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // dispatch({ type: PATCH_FRIEND });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}

export function deleteFriend(id) {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    const token = localStorage.getItem("token");
    try {
      let res = await axios.delete(`${URL}/unfollow/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      dispatch({ type: DELETE_FRIEND, payload: id });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}

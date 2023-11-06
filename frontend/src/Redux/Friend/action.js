import axios from "axios";
import { DELETE_FRIEND_SUCCESS, FRIEND_FAILURE, FRIEND_REQUEST, GET_FRIEND_SUCCESS, PATCH_FRIEND_SUCCESS, POST_FRIEND_SUCCESS } from "./actionTypes";

const token = localStorage.getItem("token")
export function getFriend() {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    try {
      const res = await axios.get("https://helpful-jay-neckerchief.cyclic.app/friend/following", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data)
      dispatch({ type: GET_FRIEND_SUCCESS, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}

export function postFriend(paramsObj) {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    try {
      let res = await axios.post(`https://helpful-jay-neckerchief.cyclic.app/friend/follow`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data)
      dispatch({ type: POST_FRIEND_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}
export function patchFriend(paramsObj) {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    try {
      let res = await axios.post(`https://helpful-jay-neckerchief.cyclic.app/friend/followback`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data)
      dispatch({ type: PATCH_FRIEND_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}
export function deleteFriend(id) {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    try {
      let res = await axios.post(`https://helpful-jay-neckerchief.cyclic.app/friend/unfollow/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data)
      dispatch({ type: DELETE_FRIEND_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: FRIEND_FAILURE });
    }
  };
}
import axios from "axios";
import { DELETE_FRIEND_SUCCESS, FRIEND_FAILURE, FRIEND_REQUEST, GET_FRIEND_SUCCESS, PATCH_FRIEND_SUCCESS, POST_FRIEND_SUCCESS } from "./actionTypes";


export function getFriend() {
  return async function (dispatch) {
    dispatch({ type: FRIEND_REQUEST });
    try {
      const res = await axios.get("http://localhost:8080/friend/following", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
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
      let res = await axios.post(`http://localhost:8080/friend/follow`, paramsObj, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
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
      let res = await axios.post(`http://localhost:8080/friend/followback`, paramsObj, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
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
      let res = await axios.post(`http://localhost:8080/friend/unfollow/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
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
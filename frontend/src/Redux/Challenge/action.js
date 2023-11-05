import axios from "axios";
import {
  CHALLENGE_FAILURE,
  CHALLENGE_REQUEST,
  GET_CHALLENGE_SUCCESS,
  POST_CHALLENGE_SUCCESS,
} from "./actionTypes";

export function getChallenge() {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    try {
      const res = await axios.get("http://localhost:8080/challenge", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
        }
      });
      console.log(res.data)
      dispatch({ type: GET_CHALLENGE_SUCCESS, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHALLENGE_FAILURE });
    }
  };
}

export function postChallenge(paramsObj) {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    try {
      let res = await axios.post(`http://localhost:8080/challenge`, paramsObj, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
        }
      });
      console.log(res.data)
      dispatch({ type: POST_CHALLENGE_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHALLENGE_FAILURE });
    }
  };
}

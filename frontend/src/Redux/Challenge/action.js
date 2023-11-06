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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhcGlzaCIsInVzZXJJRCI6IjY1NDY3MDUwNjZhMzA0NzM0NjVjY2FlOCIsImlhdCI6MTY5OTIwMTMyNSwiZXhwIjoxNjk5ODA2MTI1fQ.XIm4Q1_AOY88yLwKLmf2aY36Nf6_ExfK5SlSDjcsk7Y`
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhcGlzaCIsInVzZXJJRCI6IjY1NDY3MDUwNjZhMzA0NzM0NjVjY2FlOCIsImlhdCI6MTY5OTIwMTMyNSwiZXhwIjoxNjk5ODA2MTI1fQ.XIm4Q1_AOY88yLwKLmf2aY36Nf6_ExfK5SlSDjcsk7Y`
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

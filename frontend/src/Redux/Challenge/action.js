import axios from "axios";
import {
  CHALLENGE_FAILURE,
  CHALLENGE_REQUEST,
  GET_CHALLENGE_SUCCESS,
  POST_CHALLENGE_SUCCESS,
} from "./actionTypes";
const token = localStorage.getItem("token")
export function getChallenge() {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    try {
      const res = await axios.get("https://helpful-jay-neckerchief.cyclic.app/challenge", {
        headers: {
          Authorization: `Bearer ${token}`
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
      let res = await axios.post(`https://helpful-jay-neckerchief.cyclic.app/challenge`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`
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

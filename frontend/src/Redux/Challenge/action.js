import axios from "axios";
import {
  CHALLENGE_FAILURE,
  CHALLENGE_REQUEST,
  DELETE_CHALLENGE,
  GET_CHALLENGE,
  PATCH_CHALLENGE,
} from "./actionTypes";

const URL = `${process.env.REACT_APP_API_URL}`;

export function postChallenge(paramsObj) {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${URL}/challenge`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHALLENGE_FAILURE });
    }
  };
}

export function getChallenge() {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${URL}/challenge`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_CHALLENGE, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHALLENGE_FAILURE });
    }
  };
}

export function updateChallenge(id, paramsObj) {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`${URL}/challenge/${id}`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: PATCH_CHALLENGE, payload: { id, data: paramsObj } });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHALLENGE_FAILURE });
    }
  };
}

export function updateChallengeArray(paramsObj) {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`${URL}/user/updatechallenge`, paramsObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHALLENGE_FAILURE });
    }
  };
}

export function deleteChallenge(id) {
  return async function (dispatch) {
    dispatch({ type: CHALLENGE_REQUEST });
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${URL}/challenge/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: DELETE_CHALLENGE });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHALLENGE_FAILURE });
    }
  };
}

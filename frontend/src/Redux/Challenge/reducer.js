import {
  CHALLENGE_FAILURE,
  CHALLENGE_REQUEST,
  DELETE_CHALLENGE,
  GET_CHALLENGE,
  PATCH_CHALLENGE,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  challenges: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHALLENGE_REQUEST: {
      return { ...state, isLoading: true };
    }

    case CHALLENGE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case GET_CHALLENGE: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        challenges: payload,
      };
    }

    case PATCH_CHALLENGE: {
      const newArr = state.map((item) => {
        if (item._id === payload.id) {
          return { ...item, ...payload.data };
        }
        return item;
      });
      return {
        ...state,
        isLoading: false,
        isError: false,
        challenges: newArr,
      };
    }

    case DELETE_CHALLENGE: {
      const newArr = state.filter((item) => {
        return item._id !== payload.id;
      });
      return {
        ...state,
        isLoading: false,
        isError: false,
        challenges: newArr,
      };
    }

    default:
      return state;
  }
};

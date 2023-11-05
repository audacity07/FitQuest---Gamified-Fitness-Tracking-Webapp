import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  notification: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTIFICATION_REQUEST:
      return { ...state, isLoading: true };

    case NOTIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        notification: payload,
      };

    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        notification: payload,
      };

    default:
      return state;
  }
};

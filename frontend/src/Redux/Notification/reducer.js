import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  GET_NOTIFICATION,
  DELETE_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  notification: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTIFICATION_REQUEST: {
      return { ...state, isLoading: true };
    }

    case NOTIFICATION_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case GET_NOTIFICATION: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        notification: payload,
      };
    }

    case UPDATE_NOTIFICATION: {
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
        notification: newArr,
      };
    }

    case DELETE_NOTIFICATION: {
      const newArr = state.filter((item) => {
        return item._id !== payload.id;
      });
      return {
        ...state,
        isLoading: false,
        isError: false,
        notification: newArr,
      };
    }

    default:
      return state;
  }
};

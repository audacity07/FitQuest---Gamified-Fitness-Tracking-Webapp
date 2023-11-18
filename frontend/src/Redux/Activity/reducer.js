import {
  ACTIVITY_FAILURE,
  ACTIVITY_REQUEST,
  DELETE_ACTIVITY,
  GET_ACTIVITY,
  PATCH_ACTIVITY,
} from "./actionType";

const initialState = {
  activity: [],
  isLoading: false,
  isErr: false,
  errorMessage: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIVITY_FAILURE: {
      return { ...state, errorMessage: payload, isErr: true };
    }

    case ACTIVITY_REQUEST: {
      return { ...state, errorMessage: "", isErr: false, isLoading: true };
    }

    case GET_ACTIVITY: {
      return { ...state, activity: payload };
    }

    case PATCH_ACTIVITY: {
      const newArr = state.map((item) => {
        if (item._id === payload.id) {
          return { ...item, ...payload.data };
        }
        return item;
      });
      return { ...state, activity: newArr };
    }

    case DELETE_ACTIVITY: {
      const newArr = state.filter((item) => {
        return item._id !== payload.id;
      });
      return { ...state, activity: newArr };
    }

    default: {
      return state;
    }
  }
};

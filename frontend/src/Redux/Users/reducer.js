import {
  USER_FAILURE,
  USER_REQUEST,
  DELETE_USER,
  GET_USER,
  PATCH_USER,
} from "./actionType";

const initialState = {
  allUsers: [],
  isLoading: false,
  isErr: false,
  errorMessage: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_FAILURE: {
      return { ...state, errorMessage: payload, isErr: true };
    }

    case USER_REQUEST: {
      return { ...state, errorMessage: "", isErr: false, isLoading: true };
    }

    case GET_USER: {
      return { ...state, allUsers: payload };
    }

    case PATCH_USER: {
      const newArr = state.map((item) => {
        if (item._id === payload.id) {
          return { ...item, ...payload.data };
        }
        return item;
      });
      return { ...state, users: newArr };
    }

    case DELETE_USER: {
      const newArr = state.filter((item) => {
        return item._id !== payload.id;
      });
      return { ...state, users: newArr };
    }

    default: {
      return state;
    }
  }
};

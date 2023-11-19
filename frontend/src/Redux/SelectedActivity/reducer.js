import {
  DELETE_SELECTED_ACTIVITY,
  GET_ALL_SELECTED_ACTIVITY,
  GET_SELECTED_ACTIVITY,
  SELECTED_ACTIVITY_FAILURE,
  SELECTED_ACTIVITY_REQUEST,
  UPDATE_SELECTED_ACTIVITY,
} from "./actionType";

const initialState = {
  allSelectedActivity: [],
  selectedactivity: [],
  isLoading: false,
  isErr: false,
  errorMessage: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SELECTED_ACTIVITY_REQUEST: {
      return { ...state, isLoading: true };
    }

    case SELECTED_ACTIVITY_FAILURE: {
      return { ...state, errorMessage: payload, isErr: true };
    }

    case GET_SELECTED_ACTIVITY: {
      return {
        ...state,
        errorMessage: "",
        isErr: false,
        isLoading: false,
        selectedactivity: payload,
      };
    }

    case GET_ALL_SELECTED_ACTIVITY: {
      return {
        ...state,
        errorMessage: "",
        isErr: false,
        isLoading: false,
        allSelectedActivity: payload,
      };
    }

    case UPDATE_SELECTED_ACTIVITY: {
      const newArr = state.map((item) => {
        if (item._id === payload.id) {
          return { ...item, ...payload.data };
        }
        return item;
      });
      return { ...state, selectedactivity: newArr };
    }

    case DELETE_SELECTED_ACTIVITY: {
      const newArr = state.filter((item) => {
        return item._id !== payload.id;
      });
      return { ...state, selectedactivity: newArr };
    }

    default: {
      return state;
    }
  }
};

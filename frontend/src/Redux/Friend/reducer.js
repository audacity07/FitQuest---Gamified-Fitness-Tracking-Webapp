import {
  DELETE_FRIEND,
  FRIEND_FAILURE,
  FRIEND_REQUEST,
  GET_FRIEND,
  PATCH_FRIEND,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  friends: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FRIEND_REQUEST: {
      return { ...state, isLoading: true };
    }

    case FRIEND_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case GET_FRIEND: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        friends: payload,
      };
    }

    // case PATCH_FRIEND: {
    //   const newArr = state.map((item) => {
    //     if (item._id === payload.id) {
    //       return { ...item, ...payload.data };
    //     }
    //     return item;
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: false,
    //     friends: newArr,
    //   };
    // }

    case DELETE_FRIEND: {
      const newArr = state.filter((item) => {
        return item._id !== payload.id;
      });
      return {
        ...state,
        isLoading: false,
        isError: false,
        friends: newArr,
      };
    }

    default:
      return state;
  }
};

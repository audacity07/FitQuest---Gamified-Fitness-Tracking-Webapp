import { DELETE_FRIEND_SUCCESS, FRIEND_FAILURE, FRIEND_REQUEST, GET_FRIEND_SUCCESS, PATCH_FRIEND_SUCCESS, POST_FRIEND_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    friend: [],
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FRIEND_REQUEST:
            return { ...state, isLoading: true };

        case FRIEND_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case GET_FRIEND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                friend: payload,
            };
        case POST_FRIEND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case PATCH_FRIEND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case DELETE_FRIEND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        default:
            return state;
    }
};

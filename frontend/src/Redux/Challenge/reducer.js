import { CHALLENGE_FAILURE, CHALLENGE_REQUEST, GET_CHALLENGE_SUCCESS, POST_CHALLENGE_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    challenge: [],
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHALLENGE_REQUEST:
            return { ...state, isLoading: true };

        case CHALLENGE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case GET_CHALLENGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                challenge: payload,
            };
        case POST_CHALLENGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        default:
            return state;
    }
};

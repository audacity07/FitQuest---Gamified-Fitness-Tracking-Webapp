import { DELETE_SELECTED_ACTIVITY, GET_SELECTED_ACTIVITY, POST_SELECTED_ACTIVITY, SELECTED_ACTIVITY_FAILURE, SELECTED_ACTIVITY_REQUEST, UPDATE_SELECTED_ACTIVITY } from "./actionType"


const initialState =
{
    selectedactivity: [],
    isLoading: false,
    isErr: false,
    errorMessage: ""
}


export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case SELECTED_ACTIVITY_REQUEST: {

            return { ...state, isLoading: true }
        }
        case SELECTED_ACTIVITY_FAILURE: {
            return { ...state, errorMessage: payload, isErr: true }

        }
        case GET_SELECTED_ACTIVITY: {
            return { ...state, errorMessage: "", isErr: false, isLoading: false, selectedactivity: payload }
        }
        case POST_SELECTED_ACTIVITY: {
            return { ...state }
        }
        case UPDATE_SELECTED_ACTIVITY: {
            return { ...state }
        }
        case DELETE_SELECTED_ACTIVITY: {
            return { ...state }
        }

        default: {
            return state
        }
    }
}
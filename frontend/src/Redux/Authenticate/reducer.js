import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType"

const initialState = {
    isAUTH: false,
    isLoading: "",
    isError: false,
    errorMessage: "",
    token: ""
}
export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case LOGIN_REQUEST: {
            return { ...state, isLoading: true }
        }
        case LOGIN_SUCCESS: {
            return { ...state, isLoading: false, isAUTH: true, token: payload }
        }
        case LOGIN_FAILURE: {
            return { ...state, isLoading: false, isAUTH: false, token: "",isError:true,errorMessage:payload}
        }
        default: {
            return state
        }
    }
}
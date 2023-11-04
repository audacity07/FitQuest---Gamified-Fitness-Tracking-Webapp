import { DELETE_USER, DELETE_USER_FAILURE, DELETE_USER_REQUEST, GET_USER, GET_USER_FAILURE, GET_USER_REQUEST, POST_USER, POST_USER_FAILURE, POST_USER_REQUEST, UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST } from "./actionType"

const initialState = 
    {
      users:[],
      isLoading: false,
      isErr:false,
      errorMessage:""
      }

export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
      
        case GET_USER: {
            return { ...state, users:payload }
        }
        case GET_USER_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}
        }
        case GET_USER_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }
       
        case POST_USER: {
            return { ...state, users:payload }
        }
        case POST_USER_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}
        }
        case POST_USER_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }

        case UPDATE_USER: {
            return { ...state, users:payload }
        }
        case UPDATE_USER_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}
        }
        case UPDATE_USER_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }

        case DELETE_USER: {
            return { ...state, users:payload }
        }
        case DELETE_USER_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}
        }
        case DELETE_USER_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }

        default: {
            return state
        }
    }
}

import { DELETE_ACTIVITY, DELETE_ACTIVITY_FAILURE, DELETE_ACTIVITY_REQUEST, GET_ACTIVITY, GET_ACTIVITY_FAILURE, GET_ACTIVITY_REQUEST, POST_ACTIVITY, POST_ACTIVITY_FAILURE, POST_ACTIVITY_REQUEST, UPDATE_ACTIVITY, UPDATE_ACTIVITY_FAILURE, UPDATE_ACTIVITY_REQUEST,  } from "./actionType"

const initialState = 
    {
      activity:[],
      isLoading: false,
      isErr:false,
      errorMessage:""
      }


export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_ACTIVITY: {

            return { ...state, activity:payload }
        }
        case GET_ACTIVITY_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}

        }
        case GET_ACTIVITY_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }
       
        case POST_ACTIVITY: {
            return { ...state, activity:payload }
        }
        case POST_ACTIVITY_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}
        }
        case POST_ACTIVITY_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }

        case UPDATE_ACTIVITY: {
            return { ...state, activity:payload }
        }
        case UPDATE_ACTIVITY_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}
        }
        case UPDATE_ACTIVITY_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }

        case DELETE_ACTIVITY: {
            return { ...state, activity:payload }
        }
        case DELETE_ACTIVITY_FAILURE: {
            return {...state, errorMessage:payload,isErr:true}
        }
        case DELETE_ACTIVITY_REQUEST: {
            return {...state, errorMessage:"",isErr:false,isLoading:true}
        }

        default: {
            return state
        }
    }
}
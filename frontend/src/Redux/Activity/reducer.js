import { GET_ACTIVITY, GET_ACTIVITY_FAILURE,  } from "./actionType"

const initialState = 
    {
      activity:[],
      isLoading: false,
      }

export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
      
        case GET_ACTIVITY: {
            // console.log(payload,"payload")
            return { ...state, activity:payload }
        }
        case GET_ACTIVITY_FAILURE: {
            return { errorMessage:payload}
        }
        default: {
            return state
        }
    }
}
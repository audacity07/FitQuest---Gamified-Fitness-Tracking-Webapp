import axios from "axios"
import { GET_ACTIVITY, GET_ACTIVITY_FAILURE } from "./actionType";

export const getActivity = (payload)=>(dispatch) => {
    console.log(payload,"payload")
    return axios
        .get(`http://localhost:8080/activity`,{
            data:payload
        })
        .then((res) => {
            console.log(res.data,"activity");
            dispatch({ type: GET_ACTIVITY, payload: res.data.activityData })
        })
        .catch((err) => {
            dispatch({ type: GET_ACTIVITY_FAILURE, payload: err.message })
        })
}
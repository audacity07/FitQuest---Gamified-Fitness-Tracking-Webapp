import axios from "axios"

import { DELETE_SELECTED_ACTIVITY, GET_SELECTED_ACTIVITY, POST_SELECTED_ACTIVITY, SELECTED_ACTIVITY_FAILURE, SELECTED_ACTIVITY_REQUEST, UPDATE_SELECTED_ACTIVITY } from "./actionType"

export const postSelectedActivity = (payload) => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .post(`http://localhost:8080/selectedactivity/add`,payload , {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhcGlzaCIsInVzZXJJRCI6IjY1NDY3MDUwNjZhMzA0NzM0NjVjY2FlOCIsImlhdCI6MTY5OTIwMTMyNSwiZXhwIjoxNjk5ODA2MTI1fQ.XIm4Q1_AOY88yLwKLmf2aY36Nf6_ExfK5SlSDjcsk7Y`
            }
        })
        .then((res) => {
            console.log(res.data, "selectedactivity");
            dispatch({ type: POST_SELECTED_ACTIVITY });

        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}

export const getSelectedActivity = () => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .get(`http://localhost:8080/selectedactivity`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhcGlzaCIsInVzZXJJRCI6IjY1NDY3MDUwNjZhMzA0NzM0NjVjY2FlOCIsImlhdCI6MTY5OTIwMTMyNSwiZXhwIjoxNjk5ODA2MTI1fQ.XIm4Q1_AOY88yLwKLmf2aY36Nf6_ExfK5SlSDjcsk7Y`
            }
        })
        .then((res) => {
            dispatch({ type: GET_SELECTED_ACTIVITY, payload: res.data.data.selectedActivities })

        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}
export const updateSelectedActivity = (id, payload) => (dispatch) => {
    // console.log(payload,"payload")
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .patch(`http://localhost:8080/selectedactivity/update/${id}`,  payload , {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhcGlzaCIsInVzZXJJRCI6IjY1NDY3MDUwNjZhMzA0NzM0NjVjY2FlOCIsImlhdCI6MTY5OTIwMTMyNSwiZXhwIjoxNjk5ODA2MTI1fQ.XIm4Q1_AOY88yLwKLmf2aY36Nf6_ExfK5SlSDjcsk7Y`
            }
        })
        .then((res) => {
            // console.log(res.data.data, "selectedactivity");
            dispatch({ type: UPDATE_SELECTED_ACTIVITY});
        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}
export const deleteSelectedActivity = (id) => (dispatch) => {
    dispatch({ type: SELECTED_ACTIVITY_REQUEST })
    return axios
        .delete(`http://localhost:8080/selectedactivity/delete/${id}`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFqMSIsInVzZXJJRCI6IjY1NDZhNmZmYjE1NzU1Y2Q5ZmFkZWU1NiIsImlhdCI6MTY5OTE3ODQyNywiZXhwIjoxNjk5NzgzMjI3fQ.RLv5l63p5oULqXheqntyAck_msWWpimD8UP8JMw3iVE`
            }
        })

        .then((res) => {
            console.log(res.data.data, "selectedactivity");
            dispatch({ type: DELETE_SELECTED_ACTIVITY })
        })
        .catch((err) => {
            dispatch({ type: SELECTED_ACTIVITY_FAILURE, payload: err.message })
        })
}
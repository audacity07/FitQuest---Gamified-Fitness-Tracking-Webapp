import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as authReducer } from "./Authenticate/reducer"
import { reducer as activityReducer } from "./Activity/reducer"
import { reducer as notificationReducer } from "./Notification/reducer"
import { reducer as challengeReducer } from "./Challenge/reducer"
import { reducer as friendReducer } from "./Friend/reducer"
import { reducer as selectedactivityReducer } from "./SelectedActivity/reducer"

import { reducer as userReducer } from "./Users/reducer"

import thunk from "redux-thunk";

const rootReducer = combineReducers({
    authReducer,
    activityReducer,
    notificationReducer,
    challengeReducer,
    friendReducer,
    selectedactivityReducer,
    userReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
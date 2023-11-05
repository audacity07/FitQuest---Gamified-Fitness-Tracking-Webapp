import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as authReducer } from "./Authenticate/reducer"
import { reducer as activityReducer } from "./Activity/reducer"
import { reducer as selectedActivityReducer } from "./SelectedActivity/reducer"
import { reducer as userReducer } from "./Users/reducer"

import thunk from "redux-thunk";

const rootReducer = combineReducers({
    authReducer,
    activityReducer,
    selectedActivityReducer,
    userReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
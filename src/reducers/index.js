import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import detailReducer from "./detailReducer";
import settingReducer from "./settingReducer";
import productReducer from "./productReducer";


const rootReducer = combineReducers({
   product: productReducer,
   setting: settingReducer,
   detail: detailReducer
})
export const store = createStore(
   rootReducer, composeWithDevTools(applyMiddleware(thunk))
)
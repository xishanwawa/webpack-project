
import { indexPageReducer } from "./IndexPage"
import { combineReducers } from 'redux'
let rootReducer =  combineReducers({
	indexPageReducer
});

export {
	rootReducer,
}
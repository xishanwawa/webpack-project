import { createStore } from 'redux'
import { rootReducer }  from 'actionsReducers'
export let store = createStore(rootReducer);

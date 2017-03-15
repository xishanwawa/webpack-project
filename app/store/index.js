import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer }  from 'actionsReducers'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

// export let store = createStore(
//     rootReducer,
//     compose(
//     applyMiddleware(
//       thunkMiddleware,
//       loggerMiddleware
//     ),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )
// );

// `__INITIAL_STATE__` 来自服务器端渲染，下一部分细说
const initialState = window.__INITIAL_STATE__;

export let store = createStore( rootReducer, initialState, applyMiddleware (thunkMiddleware));


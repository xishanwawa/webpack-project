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

export let store = createStore( rootReducer, applyMiddleware (thunkMiddleware));


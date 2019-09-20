import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import asyncDispatchMiddleware from './asyncDispatchMiddleware';

export default createStore(rootReducer, applyMiddleware(asyncDispatchMiddleware, thunk));

export type AppState = ReturnType<typeof rootReducer>;

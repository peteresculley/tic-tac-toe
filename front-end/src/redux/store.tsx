import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import asyncDispatchMiddleware from './asyncDispatchMiddleware';

const store = createStore(rootReducer, applyMiddleware(thunk, asyncDispatchMiddleware));

export type AppState = ReturnType<typeof rootReducer>;

export default store;

import { MiddlewareAPI, Action } from "redux";
import { ThunkAction } from 'redux-thunk';

// Code copied from https://stackoverflow.com/a/41260990/8906017
// Type definitions added after

interface ActionOrThunkAction extends Action, ThunkAction<void, any, null, Action<any>> {}

interface AllowedAction extends ActionOrThunkAction {
    [otherProperties: string]: any
}

// TODO: make this Dispatch type work with redux-thunk
// type AllowedDispatch = Dispatch | ThunkDispatch<any, null, Action<any>>

// This middleware will just add the property "async dispatch"
// to actions with the "async" propperty set to true
const asyncDispatchMiddleware = (store: MiddlewareAPI<any, any>) => (next: any) => (action: AllowedAction) => {
    let syncActivityFinished = false;
    let actionQueue = [] as ActionOrThunkAction[];
  
    function flushQueue() {
      actionQueue.forEach(a => store.dispatch(a)); // flush queue
      actionQueue = [];
    }
  
    function asyncDispatch(asyncAction: ActionOrThunkAction) {
      actionQueue = actionQueue.concat([asyncAction]);
  
      if (syncActivityFinished) {
        flushQueue();
      }
    }
  
    const actionWithAsyncDispatch =
      Object.assign({}, action, { asyncDispatch });
  
    const res = next(actionWithAsyncDispatch);
  
    syncActivityFinished = true;
    flushQueue();
  
    return res;
};

export default asyncDispatchMiddleware;

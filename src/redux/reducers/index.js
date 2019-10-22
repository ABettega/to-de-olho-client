import thunkMiddleware from "redux-thunk";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";

import senate from "./senate";

const rootReducer = combineReducers({
  senate
});

let enhancer;
if (process.env.NODE_ENV === "production") {
  enhancer = compose(applyMiddleware(thunkMiddleware));
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(
    applyMiddleware(immutableStateInvariantMiddleware(), thunkMiddleware)
  );
}

const appStore = createStore(rootReducer, enhancer);

export default appStore;

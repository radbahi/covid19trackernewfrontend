// import {createStore, applyMiddleware} from 'redux
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(thunk))
);

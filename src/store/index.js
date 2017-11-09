/*eslint no-undef: "off"*/
import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import {
  createLogger
} from "redux-logger";
import reduxUnhandledAction from "redux-unhandled-action";
import thunk from "redux-thunk";
import reducer from "../reducers";

let middleware;
let Store;

if (process.env.NODE_ENV === "development") {
  const loggerMiddleware = createLogger();
  const callback = (action) => console.error(`The action labelled ${action.type} didn"t lead to the creation of a new state object`);
  middleware = applyMiddleware(reduxUnhandledAction(callback), loggerMiddleware, thunk);
  Store = createStore(reducer, compose(middleware, window.devToolsExtension ?
    window.devToolsExtension() :
    f => f));
}

if (process.env.NODE_ENV === "production") {
  middleware = applyMiddleware(thunk);
  Store = createStore(reducer, compose(middleware));
}

export default Store;
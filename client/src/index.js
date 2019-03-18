import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducer from "./redux/reducers";

import ScrollToTop from './hoc/ScrollToTop';

import "./assets/css/app.css";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <ScrollToTop>
        <Routes />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

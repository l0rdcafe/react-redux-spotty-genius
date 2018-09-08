import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import reducer from "./reducers";
import App from "./components/app";
import Callback from "./components/callback";

const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route path="/" exact component={App} />
        <Route path="/callback" component={Callback} />
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);

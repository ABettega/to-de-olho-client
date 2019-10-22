import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import appStore from "./redux/reducers";

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <Root store={appStore}>
    <App />
  </Root>,
  document.getElementById("root")
);
serviceWorker.unregister();

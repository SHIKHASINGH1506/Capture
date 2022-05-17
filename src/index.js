import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store";
import { PostModalPortal } from 'PostModalPortal';
import { EditProfileModalPortal } from 'EditProfileModalPortal';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <PostModalPortal />
        <EditProfileModalPortal />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

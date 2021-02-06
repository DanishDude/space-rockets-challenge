import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import App from "./components/app";
import { StateContext } from "./context/state";

ReactDOM.render(
  <React.StrictMode>
    <StateContext>
      <Router>
        <ThemeProvider>
          <CSSReset />
          <App />
        </ThemeProvider>
      </Router>
    </StateContext>
  </React.StrictMode>,
  document.getElementById("root")
);

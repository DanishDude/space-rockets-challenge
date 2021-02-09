import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./components/app";
import { StateContext } from "./context/state";

ReactDOM.render(
  <React.StrictMode>
    <StateContext>
      <Router>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </StateContext>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./components/app";
import { StateContext } from "./context/state";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <StateContext>
      <Router>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </Router>
    </StateContext>
  </React.StrictMode>,
  document.getElementById("root")
);

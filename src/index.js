import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./layout/main";
import { LoginCtxProvider } from "./state/loginManager";
import { ThemeCtxProvider } from "./state/themeManager";

function App() {
  return (
    <Router>
      <ThemeCtxProvider>
        <CssBaseline />
        <LoginCtxProvider>
          <Main />
        </LoginCtxProvider>
      </ThemeCtxProvider>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

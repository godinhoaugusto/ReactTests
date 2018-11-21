import React from "react";
import { Switch, Route } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeCtx } from "../state/themeManager";
import Header from "./header";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Settings from "../pages/settings/settings";
import { WithLogin } from "../state/loginManager";
import { ApiRoutes } from "../api/api";

const Main = props => {
  let { myTheme } = React.useContext(ThemeCtx);
  let currentTheme = createMuiTheme(myTheme);

  return (
    <MuiThemeProvider theme={currentTheme}>
      <Header title={myTheme.title} />
      <Switch>
        <Route exact path="/" component={WithLogin(Home)} />
        <Route path="/settings" component={WithLogin(Settings)} />
        <Route path="/login" component={Login} />
      </Switch>
    </MuiThemeProvider>
  );
};

export default Main;

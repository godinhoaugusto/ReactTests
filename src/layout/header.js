import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { UserSettings } from "../state/userSettings";
import { ThemeCtx } from "../state/themeManager";
import { LoginCtx } from "../state/loginManager";
import Drawer from "@material-ui/core/Drawer";

import { SideList } from "./menu";

const Header = props => {
  const userSettings = React.useContext(UserSettings);
  let { state, dispatch } = React.useContext(LoginCtx);
  let { theme, themeDispatch } = React.useContext(ThemeCtx);
  console.log("test console");
  const { title } = props;
  const [openMenu, setOpenMenu] = useState(false);

  function openDrawer() {
    setOpenMenu(true);
    // alert("abriu");
  }
  function closeDrawer() {
    setOpenMenu(false);
    // alert("abriu");
  }

  function renderLogout() {
    if (state.userId) {
      return (
        <React.Fragment>
          <Typography
            variant="h6"
            color="secondary"
            style={{ marginRight: 20 }}
          >
            {state.userName}
          </Typography>
          <Button
            onClick={() => dispatch({ type: "logout" })}
            variant="contained"
            color="secondary"
            style={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
  return (
    <React.Fragment>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            style={{
              marginLeft: -12,
              marginRight: 20
            }}
            color="inherit"
            aria-label="Menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {renderLogout()}
        </Toolbar>
      </AppBar>

      <Drawer
        open={openMenu}
        onClose={closeDrawer}
        onOpen={openDrawer}
        // style={{ position: "absolute", height: 50 }}
      >
        <SideList
          close={closeDrawer}
          userId={state.userId}
          userLogout={() => dispatch({ type: "logout" })}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default Header;

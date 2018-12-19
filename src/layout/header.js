import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { LoginCtx } from "../state/loginManager";
import Drawer from "@material-ui/core/Drawer";
import { SelectLanguage } from "../components/languageSelector";

import { SideList } from "./menu";

const Header = props => {
  let { state, dispatch } = React.useContext(LoginCtx);

  console.log("test console");
  const { title } = props;
  const [openMenu, setOpenMenu] = React.useState(false);

  function openDrawer() {
    setOpenMenu(true);
  }
  function closeDrawer() {
    setOpenMenu(false);
  }

  function renderLogout() {
    if (state.userId) {
      return (
        <React.Fragment>
          <Typography variant="h6" color="secondary" style={{ marginRight: 20 }}>
            {state.userName}
          </Typography>
          <Button onClick={() => dispatch({ type: "logout" })} variant="contained" color="secondary" style={{ textTransform: "none" }}>
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

      <Drawer open={openMenu} onClose={closeDrawer}>
        <SideList close={closeDrawer} userId={state.userId} userLogout={() => dispatch({ type: "logout" })} />
      </Drawer>
    </React.Fragment>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;

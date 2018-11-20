import React from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import LoginIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";

import { Logout } from "../state/loginManager";

const SideList = props => {
  return (
    <div style={{ width: 250 }}>
      <List>
        <ListItem button key="home" component={Link} to="/" onClick={props.close}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {props.userId ? (
          <React.Fragment>
            <ListItem button key="settings" component={Link} to="/settings" onClick={props.close}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <Divider />
            <ListItem
              button
              key="logout"
              onClick={() => {
                props.userLogout();
                props.close();
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </React.Fragment>
        ) : (
          <ListItem button key="login" component={Link} to="/login" onClick={props.close}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
        <Divider />
      </List>
    </div>
  );
};

export { SideList };

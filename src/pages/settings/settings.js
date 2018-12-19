import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ThemeCtx } from "../../state/themeManager";
import ThemeManager from "./themeManager";
import General from "./general";
import Translate from "./translate";

import store from "store";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const Settings = props => {
  let { myTheme } = React.useContext(ThemeCtx);
  const [changed, setChanged] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(5);

  React.useEffect(() => {
    console.log("mount");
    if (tabValue === 5) {
      setTabValue(0);
    }

    return () => {
      console.log("unmount");
    };
  });

  const saveChanges = () => {
    store.set("theme", myTheme);
    setChanged(false);
  };
  const changeTab = (e, value) => {
    setTabValue(value);
  };
  return (
    <Grid container style={{ flexGrow: 1, padding: 10 }}>
      <Grid item xs={12} style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Tabs value={tabValue} onChange={changeTab} style={{ flexGrow: 1 }}>
              <Tab label="General" />
              <Tab label="Theme" />
              <Tab label="Translation" />
            </Tabs>

            <div>
              {changed ? (
                <Button onClick={saveChanges} variant="contained" color="secondary" style={{ textTransform: "none" }}>
                  Save Changes
                </Button>
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
        <SwipeableViews index={tabValue} onChangeIndex={setTabValue}>
          <General setChanged={setChanged} />
          <ThemeManager setChanged={setChanged} />
          <Translate setChanged={setChanged} />
        </SwipeableViews>
        {/*{tabValue === 0 && <General setChanged={setChanged} />}
        {tabValue === 1 && <ThemeManager setChanged={setChanged} />}
        {tabValue === 2 && <TabContainer>Item Three</TabContainer>}*/}
      </Grid>
    </Grid>
  );
};

export default Settings;

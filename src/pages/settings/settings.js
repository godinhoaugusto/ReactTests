import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "rc-color-picker/assets/index.css";
import { Panel as ColorPickerPanel } from "rc-color-picker";
import ColorPicker from "rc-color-picker";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  ThemeColors,
  greyColor,
  greenColor,
  blueColor,
  brownColor,
  redColor,
  amberColor,
  blueGreyColor,
  indigoColor,
  purpleColor
} from "../../state/themeManager";

import { ThemeCtx } from "../../state/themeManager";

const Settings = props => {
  console.log(ThemeCtx);
  let { myTheme, themeDispatch } = React.useContext(ThemeCtx);
  console.log("Theme", myTheme);
  return (
    <Grid container style={{ flexGrow: 1, padding: 5 }}>
      <Grid item xs={12} style={{ flexGrow: 1 }}>
        <Paper style={{ width: "100%", padding: 15, marginTop: 10 }}>
          <Typography
            variant="subtitle1"
            color="secondary"
            style={{ flexGrow: 1 }}
          >
            General
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TextField
                id="standard-name"
                label="App Title"
                fullWidth="true"
                //  className={classes.commonStyle}
                value={""}
                //  onChange={e => setUserName(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper style={{ width: "100%", padding: 15, marginTop: 10 }}>
          <Typography
            variant="subtitle1"
            color="secondary"
            style={{ flexGrow: 1 }}
          >
            Color Theme
          </Typography>
          <Grid
            container
            spacing={8}
            alignContent="space-around"
            justify="space-around"
            style={{ flexGrow: 1, padding: 5 }}
          >
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "grey" });
                }}
                style={{ backgroundColor: greyColor }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "blueGrey" });
                }}
                style={{ backgroundColor: blueGreyColor }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "indigo" });
                }}
                style={{ backgroundColor: indigoColor }}
              />
            </Grid>

            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "blue" });
                }}
                style={{ backgroundColor: blueColor }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "green" });
                }}
                style={{ backgroundColor: greenColor }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "brown" });
                }}
                style={{ backgroundColor: brownColor }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "amber" });
                }}
                style={{ backgroundColor: amberColor }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "red" });
                }}
                style={{ backgroundColor: redColor }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="fab"
                mini="true"
                onClick={() => {
                  themeDispatch({ type: "purple" });
                }}
                style={{ backgroundColor: purpleColor }}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{ width: "100%", padding: 15, marginTop: 10 }}>
          <Typography
            variant="subtitle1"
            color="secondary"
            style={{ flexGrow: 1 }}
          >
            Current Theme
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <ColorPicker
                alpha={80}
                color={myTheme.palette.primary.main || "#232334"}
                onChange={obj => {
                  console.log(obj);
                  themeDispatch({ type: "primary", payload: obj.color });
                }}
                mode="HSB"
              >
                <Button className="react-custom-trigger">Primary Color</Button>
              </ColorPicker>
            </Grid>
            <Grid item xs={6}>
              <ColorPicker
                alpha={80}
                color={myTheme.palette.secondary.main || "#232334"}
                onChange={obj => {
                  console.log(obj);
                  themeDispatch({ type: "secondary", payload: obj.color });
                }}
                mode="HSB"
              >
                <Button className="react-custom-trigger">
                  Secondary Color
                </Button>
              </ColorPicker>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Settings;

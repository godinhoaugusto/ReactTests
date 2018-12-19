import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "rc-color-picker/assets/index.css";
import ColorPicker from "rc-color-picker";

import { ThemeColors } from "../../state/themeManager";
import { ThemeCtx } from "../../state/themeManager";

const ThemeManager = props => {
  let { myTheme, themeDispatch } = React.useContext(ThemeCtx);
  const { setChanged } = props;
  return (
    <div style={{ padding: 5 }}>
      <Paper style={{ width: "100%", padding: 15, marginTop: 10 }}>
        <Typography variant="subtitle1" color="secondary" style={{ flexGrow: 1 }}>
          Current Theme
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <ColorPicker
              alpha={80}
              color={myTheme.palette.primary.main || "#232334"}
              onChange={obj => {
                themeDispatch({ type: "primary", payload: obj.color });
                setChanged(true);
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
                setChanged(true);
              }}
              mode="HSB"
            >
              <Button className="react-custom-trigger">Secondary Color</Button>
            </ColorPicker>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ width: "100%", padding: 15, marginTop: 10 }}>
        <Typography variant="subtitle1" color="secondary" style={{ flexGrow: 1 }}>
          Color Theme
        </Typography>

        <Grid container spacing={8} alignContent="space-around" justify="space-around" style={{ flexGrow: 1, padding: 5 }}>
          {ThemeColors.map((color, idx) => (
            <Grid item key={idx}>
              <Button
                variant="fab"
                mini={true}
                onClick={() => {
                  themeDispatch({ type: color.name });
                  setChanged(true);
                }}
                style={{ backgroundColor: color.color }}
              >
                {" "}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default ThemeManager;

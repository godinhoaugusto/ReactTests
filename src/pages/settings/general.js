import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { ThemeCtx } from "../../state/themeManager";

const General = props => {
  let { myTheme, themeDispatch } = React.useContext(ThemeCtx);
  const [title, setTitle] = React.useState(myTheme.title);

  return (
    <div style={{ padding: 5 }}>
      <Paper style={{ width: "100%", padding: 15, marginTop: 10 }}>
        <Typography variant="subtitle1" color="secondary" style={{ flexGrow: 1 }}>
          General
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="App Title"
              fullWidth={true}
              value={title}
              onChange={e => {
                themeDispatch({ type: "title", payload: e.target.value });
                setTitle(e.target.value);
                props.setChanged(true);
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default General;

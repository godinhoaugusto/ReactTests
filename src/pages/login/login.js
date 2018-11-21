import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { LoginCtx } from "../../state/loginManager";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 0
  },
  paper: {
    margin: 20,
    padding: 10
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  commonStyle: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const Login = props => {
  console.log(props);
  const { classes } = props;
  let { state, dispatch } = React.useContext(LoginCtx);
  const [userName, setUserName] = useState(state.userName);
  const [errMsg, setErrMsg] = useState(state.userName === "" ? "Please enter your user name" : "");
  if (state.userId) {
    props.history.push("/");
  }

  const login = () => {
    dispatch({ type: "login", payload: userName });
    props.history.push(props.location.pathname);
  };
  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container direction="column">
            <Grid item>
              <TextField
                id="standard-name"
                label="User Name"
                className={classes.commonStyle}
                error={errMsg === "" ? false : true}
                helperText={errMsg}
                value={userName}
                onKeyPress={e => {
                  if (e.key === "Enter" && userName !== "") {
                    e.preventDefault();
                    login();
                  }
                }}
                onChange={e => {
                  const auxVal = e.target.value;
                  setUserName(auxVal);
                  setErrMsg(auxVal === "" ? "Please enter your user name" : "");
                }}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" disabled={errMsg !== ""} className={classes.commonStyle} onClick={login}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Login);

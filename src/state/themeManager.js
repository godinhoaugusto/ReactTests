import React from "react";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import indigo from "@material-ui/core/colors/indigo";
import brown from "@material-ui/core/colors/brown";
import blueGrey from "@material-ui/core/colors/blueGrey";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";

import store from "store";

const greyColor = grey[300];
const blueGreyColor = blueGrey[300];
const indigoColor = indigo[300];
const blueColor = blue[300];
const greenColor = green[300];
const brownColor = brown[300];
const amberColor = amber[300];
const redColor = red[300];
const purpleColor = purple[300];

const ThemeColors = [
  { name: "grey", color: greyColor },
  { name: "blueGrey", color: blueGreyColor },
  { name: "indigo", color: indigoColor },
  { name: "blue", color: blueColor },
  { name: "green", color: greenColor },
  { name: "brown", color: brownColor },
  { name: "amber", color: amberColor },
  { name: "red", color: redColor },
  { name: "purple", color: purpleColor }
];

const ThemeCtx = React.createContext();

let initialState = store.get("theme") || {
  palette: {
    primary: {
      main: brown[300]
    },
    secondary: {
      main: brown[700]
    }
  },
  title: "React Tests"
};

let reducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "reset":
      return initialState;
    case "primary":
      return {
        ...state,
        palette: {
          ...state.palette,
          primary: {
            main: action.payload
          }
        }
      };
    case "secondary":
      return {
        ...state,
        palette: {
          ...state.palette,
          secondary: {
            main: action.payload
          }
        }
      };
    case "title":
      return {
        ...state,
        title: action.payload
      };
    case "green":
      return {
        ...state,
        palette: {
          primary: {
            main: green[300]
          },
          secondary: {
            main: green[700]
          }
        }
      };

    case "purple":
      return {
        ...state,
        palette: {
          primary: {
            main: purple[300]
          },
          secondary: {
            main: purple[700]
          }
        }
      };
    case "red":
      return {
        ...state,
        palette: {
          primary: {
            main: red[300]
          },
          secondary: {
            main: red[700]
          }
        }
      };
    case "amber":
      return {
        ...state,
        palette: {
          primary: {
            main: amber[300]
          },
          secondary: {
            main: amber[700]
          }
        }
      };
    case "indigo":
      return {
        ...state,
        palette: {
          primary: {
            main: indigo[300]
          },
          secondary: {
            main: indigo[700]
          }
        }
      };

    case "brown":
      return {
        ...state,
        palette: {
          primary: {
            main: brown[300]
          },
          secondary: {
            main: brown[700]
          }
        }
      };
    case "blue":
      return {
        ...state,
        palette: {
          primary: {
            main: blue[300]
          },
          secondary: {
            main: blue[700]
          }
        }
      };
    case "blueGrey":
      return {
        ...state,
        palette: {
          primary: {
            main: blueGrey[300]
          },
          secondary: {
            main: blueGrey[700]
          }
        }
      };

    case "grey":
      return {
        ...state,
        palette: {
          primary: {
            main: grey[300]
          },
          secondary: {
            main: grey[700]
          }
        }
      };
    default:
      return state;
  }
};

function ThemeCtxProvider(props) {
  // [A]
  let [myTheme, themeDispatch] = React.useReducer(reducer, initialState);
  let value = { myTheme, themeDispatch };

  // [B]
  return <ThemeCtx.Provider value={value}>{props.children}</ThemeCtx.Provider>;
}

let ThemeCtxConsumer = ThemeCtx.Consumer;

// [C]
export {
  ThemeCtx,
  ThemeCtxProvider,
  ThemeCtxConsumer,
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
};

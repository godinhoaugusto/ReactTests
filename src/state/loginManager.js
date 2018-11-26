import React from "react";
import Login from "../pages/login/login";

let LoginCtx = React.createContext();

let initialState = {
  userId: "",
  userName: "",
  token: ""
};

let reducer = (state, action) => {
  switch (action.type) {
    case "logout":
      return initialState;
    case "login":
      return {
        ...state,
        userId: "21321321323",
        userName: action.payload,
        token: "t1t1t1t1t1t1t1t1t1"
      };
    default:
      return state;
  }
};

function LoginCtxProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };
  return <LoginCtx.Provider value={value}>{props.children}</LoginCtx.Provider>;
}

let LoginCtxConsumer = LoginCtx.Consumer;

function WithLogin(Component) {
  let { state } = React.useContext(LoginCtx);
  return state.userId ? Component : Login;
}

function Logout() {
  console.log(LoginCtxConsumer);
  const { dispatch } = React.useContext(LoginCtx);
  dispatch({ type: "logout" });
  return null;
}

export { LoginCtx, LoginCtxProvider, LoginCtxConsumer, WithLogin, Logout };

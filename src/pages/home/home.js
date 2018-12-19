import React from "react";

const TestInput = props => {
  const [state, changeState] = React.useState(props.text);
  return (
    <div style={{ margin: 20 }}>
      <label>{state}</label> <br />
      <input type="text" value={state} onChange={e => changeState(e.target.value)} />
    </div>
  );
};

const Home = props => {
  return (
    <React.Fragment>
      <TestInput text="Hello4322222" />
    </React.Fragment>
  );
};
export default Home;

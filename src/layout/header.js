import React from "react";

const Header = props => {
  console.log("test console");
  const { title } = props;
  return <div>{title}</div>;
};

export default Header;

import React, { useContext } from "react";
import Header from "./header";
import Login from "./login";
import Routes from "./routes";
import globalContext from "../../context/global-context";
const Nav = (props) => {
  const globalContextLocal = useContext(globalContext);

  return (
    <div className="hero is-info is-large">
      <Header />
      {!globalContextLocal.authorization.token ? <Login /> : <Routes />}
      <div className="hero-body"></div>
    </div>
  );
};

export default Nav;

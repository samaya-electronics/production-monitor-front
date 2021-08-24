import React, { useContext } from "react";
import globalContext from "../../context/global-context";
import CustomLink from "./custom-link";
const Routes = (props) => {
  const globalContextLocal = useContext(globalContext);
  return (
    <div className="hero-foot">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <ul>
            {globalContextLocal.authorization.links.map((item, index) => {
              return <CustomLink key={index} link={"/" + item} />;
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Routes;

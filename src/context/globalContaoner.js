import React, { useState } from "react";
import globaContext from "./global-context";

const GlobalContainer = (props) => {
  const [authorization, setAuthorization] = useState({
    authorization: { token: null, userName: null, links: [] },
    setAuthorization: () => {},
  });
  return (
    <globaContext.Provider
      value={{
        authorization: authorization,
        setAuthorization: setAuthorization,
      }}
    >
      {props.children}
    </globaContext.Provider>
  );
};

export default GlobalContainer;

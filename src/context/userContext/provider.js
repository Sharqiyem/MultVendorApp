import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./reducers";
import initialState from "./state";

import types from "./types";

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

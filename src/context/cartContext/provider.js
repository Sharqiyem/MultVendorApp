import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducers';
// import { useActions } from "./actions";
import initialState from './state';

const StoreContext = createContext(initialState);
export const LocalizationContext = createContext();

const StoreProvider = ({ children }) => {
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  const [state, dispatch] = useReducer(reducer, initialState);
  // Create an object of all our actions, handling special cases where a simple dispatch is too primitive
  //   const actions = useActions(state, dispatch);

  // Log new state
  useEffect(() => {
    // console.log({ newState: state });
  }, [state]);

  // Render state, dispatch and special case actions
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };

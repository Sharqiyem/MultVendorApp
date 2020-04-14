import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducers';
import initialState from './state';
import AddressHook from '../../hooks/useGetUserAddresses';

import types from './types';

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data] = AddressHook.useGetUserAddresses();

  useEffect(() => {
    dispatch({ type: types.SAVE_ADDRESSES, payload: data });
  }, [data]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

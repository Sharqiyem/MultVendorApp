import React, { createContext, useReducer, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import reducer from './reducers';
// import { useActions } from "./actions";
import initialState from './state';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.data.userToken,
            role: action.data.role || 'user',
            isLoading: false,
            storeId: action.data.storeId,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.data.email,
            role: action.data.role || 'user',
            storeId: action.data.storeId || '',
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            role: '',
            storeId: '',
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      role: '',
      storeId: '',
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        const userToken = data.email;
        const role = data.role;
        const storeId = data.storeId || '';
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('role', role);
          await AsyncStorage.setItem('storeId', storeId);
        } catch (e) {
          console.log('Set token failed');
        }

        dispatch({ type: 'SIGN_IN', data });
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up2 failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', data });
      },
    }),
    []
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, role, storeId;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        role = await AsyncStorage.getItem('role');
        storeId = await AsyncStorage.getItem('storeId');
      } catch (e) {
        console.log('Restoring token failed');
      }

      const data = {
        userToken,
        role,
        storeId,
      };
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', data });
    };

    bootstrapAsync();
  }, []);

  // Render state, dispatch and special case actions
  return (
    <AuthContext.Provider value={{ state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

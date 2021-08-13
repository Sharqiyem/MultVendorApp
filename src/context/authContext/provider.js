import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import reducer from './reducers';
// import { useActions } from "./actions";
// import initialState from './state';

const AuthContext = createContext(null);

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  userData: null,
  role: "",
  storeId: "",
  isDelivery: false,
  isVendor: false,
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userData: action.data,
        userToken: action.data?.email || "",

        role: action.data?.role || "user",
        isLoading: false,
        storeId: action.data?.storeId,
        isDelivery: action.data?.role === "delivery",
        isVendor: action.data?.role === "vendor",
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userData: action.data,
        userToken: action.data?.email,

        role: action.data?.role || "user",
        storeId: action.data?.storeId || "",
        isDelivery: action.data?.role === "delivery",
        isVendor: action.data?.role === "vendor",
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        userData: null,
        role: "",

        storeId: "",
      };
    case "UPDATE_USER":
      return {
        ...prevState,

        userData: { ...prevState.userData, ...action.data },
      };
  }
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          await AsyncStorage.setItem("user", JSON.stringify(data));
        } catch (e) {
          console.log("Set token failed");
        }

        dispatch({ type: "SIGN_IN", data });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("user");
        
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", data });
      },
      updateUser: async (data) => {
        dispatch({ type: "UPDATE_USER", data });
      },
    }),
    []
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let data;

      try {
        const userStr = await AsyncStorage.getItem("user");
        data = JSON.parse(userStr);
      } catch (e) {
        console.log("Restoring token failed");
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", data });
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

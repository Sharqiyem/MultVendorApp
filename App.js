import * as React from "react";
import { Platform, StatusBar, LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { setCustomText } from "react-native-global-props";
import {
  StoreProvider,
  LocalizationContext,
} from "./src/context/cartContext/provider";
import * as Notifications from "expo-notifications";

import RootNavigator from "./src/navigation/RootNavigator";
import firebase from "./src/config/firebase.config";
import useLinking from "./src/navigation/useLinking";
import I18n from "./src/i18n/i18n";
import AnimationScreen from "./src/screens/AnimationScreen";
import { AuthProvider } from "./src/context/authContext/provider";
import ProfileScreen from "./src/screens/ProfileScreen";
import AddressesScreen from "./src/screens/AddressesScreen";
import ManageAddressScreen from "./src/screens/ManageAddressScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import { UserProvider } from "./src/context/userContext/provider";
import ChatScreen from "./src/screens/ChatScreen";
import { navigationRef } from "./src/navigation/NavigationRef";
import Colors from "./src/constants/Colors";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
  "Setting a timer",
]);

if (__DEV__) {
  import("./ReactotronConfig");
}

export default function App(props) {
  const { skipLoadingScreen } = props;
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [isLoadedAnime, setIsLoadedAnime] = React.useState(false);

  const [isFirebaseInit, setIsFirebaseInit] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const [locale, setLocale] = React.useState(I18n.locale);
  const [isRTL, setIsRTL] = React.useState(I18n.isRTL);

  const changeLang = () => {
    try {
      I18n.changDefLanguage(locale);

      setLocale(I18n.locale);
      setIsRTL(I18n.isRTL);

      setDefaultTextStyles(I18n.isRTL);
      // console.log("I18n.isRTL", I18n.isRTL);
      AsyncStorage.setItem("lang", I18n.locale)
        .then((lang) => {
          console.log("change from", locale);
          // console.log("AsyncStorage.setItem", lang);
        })
        .catch((err) => console.log("AsyncStorage.setItem", err));
    } catch (err) {
      console.log(err);
    }
  };

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => I18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
      changeLang,
    }),
    [locale]
  );

  const setDefaultTextStyles = (isRTL) => {
    const customTextProps = {
      style: {
        fontSize: 14,
        fontFamily: isRTL ? "DroidKufi" : "DroidKufi",
        // alignSelf: I18n.isRTL() ? "flex-end" : "flex-start"
      },
    };
    setCustomText(customTextProps);
  };

  async function loadResourcesAsync() {
    await Promise.all([
      // Asset.loadAsync([
      //   require('./assets/images/hosp/1.jpeg'),
      //   require('./assets/images/hosp/2.jpeg'),
      //   require('./assets/images/hosp/3.jpeg')
      // ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        DroidKufi: require("./assets/fonts/DroidKufi-Regular.ttf"),
      }),
    ]);

    setFontLoaded(true);
  }

  function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }

  async function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);

    await SplashScreen.hideAsync();
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // First method to get init state - Load our initial navigation state
        const initState = await getInitialState();
        setInitialNavigationState(initState);
        // console.log("getInitialState", initState);

        // Second method to get init state -
        // Promise.race([
        //   getInitialState(),
        //   new Promise((resolve) =>
        //     // Timeout in 150ms if `getInitialState` doesn't resolve
        //     // Workaround for https://github.com/facebook/react-native/issues/25675
        //     setTimeout(resolve, 150)
        //   ),
        // ])
        //   .catch((e) => {
        //     console.error(e);
        //   })
        //   .then((state) => {
        //     console.log('getInitialState then');
        //     if (state !== undefined) {
        //       setInitialNavigationState(state);
        //       console.log('getInitialState', state);
        //     }
        //   });

        // Restore language from storage
        try {
          const lang = await AsyncStorage.getItem("lang");
          I18n.changLanguage(lang);

          // await I18n.LoadSavedLanguage();
          if (lang) {
            setLocale(I18n.locale);
            setIsRTL(I18n.isRTL);
          }
        } catch (e) {
          console.log("Restoring lang failed", e);
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        // setLoadingComplete(true);
        // SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const onAnimeFinished = () => {
    setDefaultTextStyles(true);
    console.log("onAnimeFinished finished");
    setIsLoadedAnime(true);
  };

  // on Auth State Changed
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('user changed..', user);
        // setIsFirebaseInit(true);
        const name = user.displayName;
        const email = user.email;
        const photoUrl = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;

        // console.log("onAuthStateChanged", {
        //   name,
        //   email,
        // });
      }
      setIsFirebaseInit(true);
    });
    // setIsFirebaseInit(true);
  });

  if (
    !isLoadingComplete &&
    !skipLoadingScreen &&
    !isFirebaseInit &&
    !fontLoaded
  ) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

  if (!isLoadedAnime) {
    return <AnimationScreen onFinished={onAnimeFinished} />;
  }
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />

      <LocalizationContext.Provider value={{ ...localizationContext, isRTL }}>
        <AuthProvider>
          <StoreProvider>
            <UserProvider>
              <SafeAreaProvider>
                <NavigationContainer
                  ref={containerRef}
                  // initialState={initialNavigationState}
                >
                  <RootNavigator />
                  {/* <AddressesScreen /> */}
                  {/* <OrdersScreen /> */}
                  {/* <ChatScreen /> */}
                  {/* <LoadingScreen /> */}
                </NavigationContainer>
              </SafeAreaProvider>
            </UserProvider>
          </StoreProvider>
        </AuthProvider>
      </LocalizationContext.Provider>
    </>
  );
}

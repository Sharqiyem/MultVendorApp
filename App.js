import * as React from 'react';
import { Platform, StatusBar, AsyncStorage, YellowBox } from 'react-native';
import { SplashScreen, AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from './src/config/firebase.config';
import { setCustomText } from 'react-native-global-props';

import { RootNavigator } from './src/navigation/BottomTabNavigator';
import {
  StoreProvider,
  LocalizationContext,
} from './src/context/cartContext/provider';

import { registerForPushNotificationsAsync } from './src/services';

import useLinking from './src/navigation/useLinking';

import I18n from './src/i18n/i18n';
import LoadingScreen from './src/screens/LoadingScreen';
import { AuthProvider } from './src/context/authContext/provider';
import ProfileScreen from './src/screens/ProfileScreen';
import AddressesScreen from './src/screens/AddressesScreen';
import ManageAddressScreen from './src/screens/ManageAddressScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import { UserProvider } from './src/context/userContext/provider';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

if (__DEV__) {
  import('./ReactotronConfig');
}

export default function App(props) {
  const { skipLoadingScreen } = props;
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [fontLoaded, setFontLoaded] = React.useState(false);

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
      console.log('I18n.isRTL', I18n.isRTL);
      AsyncStorage.setItem('lang', I18n.locale)
        .then((lang) => {
          console.log('AsyncStorage.setItem', lang);
        })
        .catch((err) => console.log('AsyncStorage.setItem', err));
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

  const setDefaultTextStyles = () => {
    const customTextProps = {
      style: {
        fontSize: 12,
        fontFamily: 'DroidKufi',
        // color: 'white'
        // alignSelf: I18n.isRTL() ? "flex-end" : "flex-start"
      },
    };
    //https://github.com/Ajackster/react-native-global-props
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
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        DroidKufi: require('./assets/fonts/DroidKufi-Regular.ttf'),
      }),
    ]);

    setFontLoaded(true);
  }

  function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }

  function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);

    SplashScreen.hide();
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // First method to get init state - Load our initial navigation state
        const initState = await getInitialState();
        setInitialNavigationState(initState);
        console.log('getInitialState', initState);

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
          const lang = await AsyncStorage.getItem('lang');
          I18n.changLanguage(lang);

          // await I18n.LoadSavedLanguage();
          if (lang) {
            setLocale(I18n.locale);
            setIsRTL(I18n.isRTL);
          }
        } catch (e) {
          console.log('Restoring lang failed', e);
        }

        // Register PushNotifications
        try {
          const token = await registerForPushNotificationsAsync();
          console.log('Push token', token);
        } catch (err) {
          console.log('registerForPushNotificationsAsync faild ');
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

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('user changed..', user);
        // setIsFirebaseInit(true);
      }
      setIsFirebaseInit(true);
    });
    // setIsFirebaseInit(true);
    setDefaultTextStyles();
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

  if (!isLoadingComplete && !skipLoadingScreen && !isFirebaseInit) {
    return <LoadingScreen />;
  }
  return (
    <>
      {Platform.OS === 'ios' && (
        <StatusBar
          translucent
          backgroundColor='#F2A458'
          barStyle='light-content'
        />
      )}
      <LocalizationContext.Provider value={{ ...localizationContext, isRTL }}>
        <AuthProvider>
          <StoreProvider>
            <UserProvider>
              <SafeAreaProvider>
                <NavigationContainer
                  ref={containerRef}
                  initialState={initialNavigationState}
                >
                  {!isFirebaseInit ? <LoadingScreen /> : <RootNavigator />}
                  {/* <AddressesScreen /> */}
                  {/* <OrdersScreen /> */}
                </NavigationContainer>
              </SafeAreaProvider>
            </UserProvider>
          </StoreProvider>
        </AuthProvider>
      </LocalizationContext.Provider>
    </>
  );
}

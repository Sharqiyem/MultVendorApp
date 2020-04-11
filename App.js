import * as React from 'react';
import { Platform, StatusBar, AsyncStorage } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from './src/config/firebase.config';

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

if (__DEV__) {
  import('./ReactotronConfig');
}

export default function App(props) {
  const { skipLoadingScreen } = props;
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
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
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'DroidKufi-Regular': require('./assets/fonts/DroidKufi-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('user changed..', user);
        setIsFirebaseInit(true);
      }
    });
    setIsFirebaseInit(true);
  });

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
            <SafeAreaProvider>
              <NavigationContainer
                ref={containerRef}
                initialState={initialNavigationState}
              >
                {/* {!isFirebaseInit ? <LoadingScreen /> : <RootNavigator />} */}
                <ManageAddressScreen />
              </NavigationContainer>
            </SafeAreaProvider>
          </StoreProvider>
        </AuthProvider>
      </LocalizationContext.Provider>
    </>
  );
}

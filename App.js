import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  StoreProvider,
  StoreContext,
  LocalizationContext,
} from './src/context/provider';

import { registerForPushNotificationsAsync } from './src/services';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import useLinking from './src/navigation/useLinking';
import Colors from './src/constants/Colors';

if (__DEV__) {
  import('./ReactotronConfig');
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

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

        // Register PushNotifications
        const token = await registerForPushNotificationsAsync();
        console.log('Push token', token);
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <>
        {Platform.OS === 'ios' && (
          <StatusBar
            translucent
            backgroundColor="#F2A458"
            barStyle="light-content"
          />
        )}
        <StoreProvider>
          <SafeAreaProvider>
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
            >
              <BottomTabNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </StoreProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2A458',
  },
});

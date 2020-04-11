import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  AppState,
  Linking,
  Button,
} from 'react-native';
import { Constants, IntentLauncherAndroid } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Modal from 'react-native-modal';

import Colors from '../constants/Colors';
import getStyle from '../constants/styles';
import Layout from '../constants/Layout';
import { LocalizationContext } from '../context/cartContext/provider';
import { saveUserToDb } from '../core/firebaseHelper';

const { Marker } = MapView;

export default function ManageAddressScreen({ navigation, route }) {
  const { t } = React.useContext(LocalizationContext);

  const initialRegion = {
    latitude: 3.169135,
    longitude: 101.710714,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const item = route?.params?.item || null;

  // const [editAddress, setEditAddress] = React.useState(_address);
  const [name, setName] = React.useState(item && item.label);
  const [tel, setTel] = React.useState(item && item.tel);
  const [address, setAddress] = React.useState(item && item.address);
  const [region, setRegion] = React.useState(initialRegion);
  const [markerCoord, setMarkerCoord] = React.useState(initialRegion);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [appState, setAppState] = React.useState(AppState.currentState);
  const [location, setLocation] = React.useState();
  const [isLocationModalVisible, setIsLocationModalVisible] = React.useState(
    false
  );
  const [openSetting, setOpenSetting] = React.useState(false);
  const [pickedLocation, setPickedLocation] = React.useState({});

  const onRegionChange = (newRegion) => {
    console.log('onRegionChange', newRegion);
    // setRegion(newRegion);
  };

  const onUserPinDragEnd = async (e) => {
    const pinLocation = e.nativeEvent.coordinate;

    console.log('onUserPinDragEnd', pinLocation);
    setMarkerCoord(pinLocation);
    setPickedLocation(pinLocation);

    const res = await Location.reverseGeocodeAsync(pinLocation);
    const address = {
      ...res[0],
      ...pinLocation,
    };
    console.log('reverseGeocodeAsync', address);
  };

  React.useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    const fetchLocation = async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMessage(
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
        );
      } else {
        getLocationAsync();
      }
    };
    fetchLocation();

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      getLocationAsync();
    }
    setAppState(nextAppState);
  };

  const getLocationAsync = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      const curLocation = await Location.getCurrentPositionAsync({});
      setLocation(curLocation);
      console.log('cur location', curLocation);
      console.log('initialRegion', initialRegion);

      const newRegion = { ...initialRegion, ...curLocation.coords };

      setRegion(newRegion);
      setMarkerCoord(newRegion);
      console.log('newRegion', newRegion);
    } catch (error) {
      console.log('getLocationAsync error', error);
      const status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        setIsLocationModalVisible(true);
      }
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    setOpenSetting(false);
  };

  let text = 'Waiting..';
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const saveAddress = () => {
    console.log({
      name,
      tel,
      address,
    });

    saveUserToDb({
      name,
      tel,
      address,
      location: pickedLocation,
    });
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? (
        <Text style={getStyle().error}>{errorMessage}</Text>
      ) : null}
      <Text>{text}</Text>
      <Modal
        onModalHide={openSetting ? openSettings : undefined}
        isVisible={isLocationModalVisible}
      >
        <View
          style={{
            height: 300,
            width: Layout.window.width,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Button
            onPress={() => {
              setIsLocationModalVisible(false);
              setOpenSetting(true);
            }}
            title='Enable Location Services'
          />
        </View>
      </Modal>

      <MapView
        style={styles.mapStyle}
        initialRegion={region}
        onRegionChange={onRegionChange}
        rotateEnabled={false}
      >
        <Marker
          title='Your address'
          draggable
          onDragEnd={onUserPinDragEnd}
          coordinate={markerCoord}
        />
      </MapView>

      <View style={styles.tabBarInfoContainer}>
        <View style={{ margin: 20 }}>
          <TextInput
            style={getStyle().textInput}
            placeholder='Your address'
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setAddress(text)}
            value={address}
            autoCorrect={false}
            // autoCapitalize='none'
          />
          <TextInput
            style={getStyle().textInput}
            placeholder='Your name'
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setName(text)}
            value={name}
            autoCorrect={false}
            // autoCapitalize='none'
          />
          <TextInput
            style={getStyle().textInput}
            placeholder='Your Tel. number'
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setTel(text)}
            value={tel}
            autoCorrect={false}
            // autoCapitalize='none'
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            // padding: 10,
            marginHorizontal: 20,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: Colors.primary,
            flex: 1,
            height: 30,
            // width: Layout.window.width * 0.8,
            justifyContent: 'center',
          }}
          onPress={saveAddress}
        >
          <Text style={{ textAlign: 'center', color: Colors.primary }}>
            {t('Save')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    // alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },

  mapStyle: {
    // borderColor: 'red',
    // borderWidth: 1,
    // flex: 1,
    width: Layout.window.width,
    height: Layout.window.height / 2 + 10,
  },
});

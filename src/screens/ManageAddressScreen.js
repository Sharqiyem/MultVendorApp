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
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { IntentLauncherAndroid } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

import MapView from 'react-native-maps';
import Modal from 'react-native-modal';

import Colors from '../constants/Colors';
import getStyle from '../constants/styles';
import Layout from '../constants/Layout';
import { LocalizationContext } from '../context/cartContext/provider';

import { GooglePlacesInput } from '../components/GooglePlacesInput';
import { MapConfig } from '../config/googlemap.config';
import { manageUserAddresses } from '../hooks/useGetUserAddresses';

const { Marker } = MapView;

export default function ManageAddressScreen({ navigation, route }) {
  const { t } = React.useContext(LocalizationContext);

  Location.setApiKey(MapConfig.key);
  const initialRegion = {
    // latitude: 3.169135,
    // longitude: 101.710714,
    // latitudeDelta: 1.1,
    // longitudeDelta: 0.0421,

    latitude: 3.169779640459751,
    longitude: 101.71059670239424,
    latitudeDelta: 0.004267829316017435,
    longitudeDelta: 0.003553391019823948,
  };

  const item = route?.params?.item || null;
  // console.log('manage address', item);

  // const [editAddress, setEditAddress] = React.useState(_address);
  const [name, setName] = React.useState(item && item.label);
  const [tel, setTel] = React.useState(item && item.tel);
  const [address, setAddress] = React.useState(item && item.address);
  const [, setSelectedAddress] = React.useState('');

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
  const [, setKeyboardVisible] = React.useState(false);

  const mapRef = React.useRef(null);
  const onRegionChange = (newRegion) => {
    // console.log('onRegionChange', newRegion);
    // setRegion(newRegion);
  };

  const onUserPinDragEnd = async (e) => {
    const pinLocation = e.nativeEvent.coordinate;
    // console.log('onUserPinDragEnd pinLocation', pinLocation);
    const newRegion = { ...initialRegion, ...pinLocation };
    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 500);

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${pinLocation.latitude},${pickedLocation.longitude}&key=${MapConfig.key}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('fetch res', JSON.stringify(responseJson));
        if (
          responseJson &&
          responseJson.results &&
          responseJson.results.length > 0
        ) {
          setAddress(responseJson.results[0].formatted_address);
          setSelectedAddress(responseJson.results[0].name);
          // console.log(
          //   `ADDRESS GEOCODE is BACK!! => ${JSON.stringify(
          //     responseJson.results[0],
          //     null,
          //     2
          //   )}`
          // );
        }
      });

    // console.log('onUserPinDragEnd', pinLocation);
    setMarkerCoord(pinLocation);
    setPickedLocation(pinLocation);

    const res = await Location.reverseGeocodeAsync(pinLocation);
    const address = {
      ...res[0],
      ...pinLocation,
    };
    // console.log('reverseGeocodeAsync', address);
  };

  const onSelectLocation = async (data) => {
    // console.log('onSelectLocation data', data);
    const { location } = data.geometry;
    const pinLocation = { latitude: location.lat, longitude: location.lng };

    setAddress(data.formatted_address);
    setSelectedAddress(data.name);
    const newRegion = { ...initialRegion, ...pinLocation };
    setRegion(newRegion);

    // Animated to region
    mapRef.current.animateCamera(pinLocation, 500);

    // console.log('onUserPinDragEnd', pinLocation);
    setMarkerCoord(pinLocation);
    setPickedLocation(pinLocation);

    const res = await Location.reverseGeocodeAsync(pinLocation);
    const address = {
      ...res[0],
      ...pinLocation,
    };
    // console.log('reverseGeocodeAsync', address);
  };

  React.useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    const fetchLocation = async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMessage(
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
        );
      } else if (!item) {
        getLocationAsync();
      }
    };
    fetchLocation();

    if (item) {
      const newRegion = { ...initialRegion, ...item.location };
      setRegion(newRegion);
      // console.log('item mange', newRegion);
      setMarkerCoord(newRegion);
      mapRef.current.animateToRegion(newRegion, 500);
    }

    // Keyboard
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);

      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // console.log('App has come to the foreground!');
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
      // console.log('cur location', curLocation);
      // console.log('initialRegion', initialRegion);

      const newRegion = { ...initialRegion, ...curLocation.coords };

      setRegion(newRegion);
      setMarkerCoord(newRegion);
      // console.log('newRegion', newRegion);
    } catch (error) {
      // console.log('getLocationAsync error', error);
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

  const saveAddress = async () => {
    console.log('saveAddress');
    const newAddress = {
      name,
      tel,
      address,
      location: pickedLocation,
    };
    // if edit
    if (item) {
      newAddress.id = item.id;
      await manageUserAddresses(newAddress, true);
    } else {
      await manageUserAddresses(newAddress);
    }
    // dispatch({ type: types.ADD_ADDRESS, payload: newAddress });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? (
        <Text style={getStyle().error}>{errorMessage}</Text>
      ) : null}
      {/* <Text>{text}</Text> */}
      <View
        style={[
          // styles.textAddress,
          {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            // height: 100,
            zindex: 100,
          },
        ]}
      >
        <GooglePlacesInput onSelectLocation={onSelectLocation} />
      </View>

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
        onPress={(e) => {
          // setMarkerCoord(e.nativeEvent.coordinate);
          onUserPinDragEnd(e);
          // console.log('clicked', e.nativeEvent.coordinate);
        }}
        ref={mapRef}
        style={styles.mapStyle}
        region={region}
        onRegionChange={onRegionChange}
        rotateEnabled={false}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker
          onPress={() => {
            // console.log('marker press');
          }}
          pinColor={Colors.primary}
          // title={selectedAddress || 'your address'}
          // hideCallout={false}
          draggable
          onDragEnd={onUserPinDragEnd}
          coordinate={markerCoord}
        />
      </MapView>

      {/* {!isKeyboardVisible ? ( */}
      <View style={styles.tabBarInfoContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <TextInput
            style={getStyle().textInput}
            placeholder='Your address'
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setAddress(text)}
            value={address}
            // multiline
            numberOfLines={1}
            autoCorrect={false}
          />
          <TextInput
            style={getStyle().textInput}
            placeholder='Your name'
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setName(text)}
            value={name}
            autoCorrect={false}
          />
          <TextInput
            style={getStyle().textInput}
            placeholder='Your Tel. number'
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setTel(text)}
            value={tel}
            autoCorrect={false}
          />
          <TouchableOpacity
            style={[
              getStyle().textInput,
              { justifyContent: 'center', backgroundColor: Colors.primary },
            ]}
            onPress={saveAddress}
          >
            <Text style={{ textAlign: 'center', color: Colors.white }}>
              {t('Save')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    height: Layout.window.height * 0.33 - 50,
  },

  textAddress: {
    position: 'absolute',
    top: 0,
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
    // ...StyleSheet.absoluteFillObject,
    // borderWidth: 1,
    // flex: 1,
    zIndex: -1,
    width: Layout.window.width,
    height: Layout.window.height * 0.75 + 50,
  },
});

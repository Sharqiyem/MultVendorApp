import React from "react";
import { Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { LocalizationContext } from "../context/cartContext/provider";
import { MapConfig } from "../config/googlemap.config";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const currentLocation = {
  description: "Current Location",
  geometry: { location: { lat: 3.169135, lng: 101.710714 } },
};

export const GooglePlacesInput = ({ onSelectLocation }) => {
  const { t, locale } = React.useContext(LocalizationContext);
  const googlePlacesAutocomplete = React.useRef(null);
  return (
    <GooglePlacesAutocomplete
      ref={googlePlacesAutocomplete}
      placeholder={t("Enter address")}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="false" // true/false/undefined
      fetchDetails
      renderDescription={(row) => row.description} // custom description render
      onSubmitEditing={() => {
        console.log("ggggg");
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log('GooglePlacesAutocomplete data', data);
        // console.log('GooglePlacesAutocomplete details', details);
        onSelectLocation(details);
      }}
      getDefaultValue={() => ""}
      query={{
        // Request URL: https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictions?1sThe%20Orion%20Condominiu&4sen&6m6&1m2&1d3.1689671619916857&2d101.7056398581665&2m2&1d3.173519934757046&2d101.7148237418335&15e3&20sA6D014B5-5EF1-491A-B0CE-017AF44B8B57mxok9xhm4re&21m1&2e1&callback=_xdc_._viuen&key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM&token=53132

        // available options: https://developers.google.com/places/web-service/autocomplete
        key: MapConfig.key,
        language: locale, // language of the results
        types: ["geocode", "address"], // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: "100%",
        },
        description: {
          fontWeight: "bold",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
        listView: {
          position: "absolute",
          top: 45,
          //   left: 0,
          //   right: 0,
          backgroundColor: "#fff",
          zindex: 1000,
        },
      }}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        type: "cafe",
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: ["formatted_address", "geometry"],
      }}
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3",
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      // predefinedPlaces={[currentLocation, homePlace]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      //   renderLeftButton={() => (
      //     <Ionicons
      //       name='logo-facebook'
      //       size={30}
      //       style={{ marginHorizontal: 10 }}
      //       color={Colors.primary}
      //       onPress={() => {
      //         googlePlacesAutocomplete._handleChangeText('');
      //       }}
      //     />
      //   )}
      //   renderRightButton={() => <Text>Custom </Text>}
    />
  );
};

import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  // Image
} from "react-native";
import Constants from "expo-constants";

import { Image } from "react-native-expo-image-cache";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { LocalizationContext } from "../context/cartContext/provider";

export const StoreDetailHeader = ({ store }) => {
  const { locale } = React.useContext(LocalizationContext);
  const storeName = store?.names[locale] || store?.name;

  return (
    <View
      style={styles.itemTwoContainer}
      // onPress={() => console.log({ item })}
    >
      <View style={styles.itemTwoContent}>
        <Image style={styles.itemTwoImage} {...{ uri: store?.image }} />
        <View style={styles.itemTwoOverlay} />
        <Text style={styles.itemTwoTitle}>{storeName}</Text>
        <View
          style={{
            flexDirection: "row",
            // justifyContent: 'space-arround',
            alignItems: "center",
            alignSelf: "center",
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: Colors.white }}>Social Media : </Text>
          <Ionicons
            name="logo-facebook"
            size={25}
            style={{ marginHorizontal: 10 }}
            color={Colors.white}
          />
          <Ionicons
            name="logo-youtube"
            size={25}
            style={{ marginHorizontal: 10 }}
            color={Colors.white}
          />
          <Ionicons
            name="logo-instagram"
            size={25}
            style={{ marginHorizontal: 10 }}
            color={Colors.white}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 5,
            marginVertical: 10,
          }}
        >
          <Text style={styles.metaText}>Products {store?.products}</Text>
          <Text style={styles.metaText}>Reviews {store?.reviews}</Text>
          <Text style={styles.metaText}>Orders {store?.orders}</Text>
        </View>
        <Text style={styles.addressTitle}>Address: 12 Tah str.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemTwoContainer: {
    backgroundColor: "white",
    marginBottom: 2,
  },
  itemTwoContent: {
    padding: 20,
    paddingHorizontal: 30,
    position: "relative",
    marginHorizontal: Platform.OS === "ios" ? -15 : 0,
    // height: 150,
  },
  itemTwoTitle: {
    color: Colors.white,

    fontSize: 20,
    textAlign: "center",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
  },
  itemTwoSubTitle: {
    color: Colors.white,
    // fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: "center",
  },
  addressTitle: {
    color: Colors.white,
    // fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,

    textAlign: "center",
  },
  itemTwoPrice: {
    color: Colors.white,

    fontSize: 20,
  },
  itemTwoImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.6,
  },
  metaText: {
    color: Colors.white,
    fontSize: 14,
    marginHorizontal: 10,
  },
});

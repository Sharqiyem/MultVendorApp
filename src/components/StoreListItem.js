import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";

const widowWidth = Dimensions.get("window").width;

export const StoreListItem = ({ item, navigation }) => {
  const { name, image, description, status, city, openTime, closeTime } = item;
  const { t, locale } = React.useContext(LocalizationContext);
  const { text, row, textHeader } = getStyle(locale === "ar");

  return (
    <TouchableOpacity
      style={[styles.container, row]}
      onPress={() => {
        navigation.navigate("Store", { item });
      }}
    >
      <View style={styles.imageContiner}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: image }}
        />
      </View>
      <View style={styles.textContiner}>
        <View
          style={[
            {
              justifyContent: "space-between",
            },
            row,
          ]}
        >
          <View styles={{}}>
            <Text style={[textHeader, { color: Colors.primary }]}>
              {name}
            </Text>
          </View>

          <Rating />
        </View>

        <Text style={[text, styles.shopSubTitle]}>
          {description}
        </Text>
        <Text style={[text, styles.timeText]}>
          {openTime} : {closeTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Rating = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Ionicons
        name="ios-star"
        size={20}
        style={{}}
        color={Colors.primaryLight}
      />
      <Ionicons
        name="ios-star"
        size={20}
        style={{}}
        color={Colors.primaryLight}
      />
      <Ionicons
        name="ios-star"
        size={20}
        style={{}}
        color={Colors.primaryLight}
      />
      <Ionicons
        name="ios-star-half"
        size={20}
        style={{}}
        color={Colors.primaryLight}
      />
    </View>
  );
};

const width = widowWidth / 3 - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    margin: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
  },
  imageContiner: {
    // flex: 1,
    height: width,
    width: width,
    overflow: "hidden",
    alignItems: "stretch",

    // backgroundColor: 'red'
  },
  textContiner: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    height: "100%",
    width: "100%",

    borderRadius: width / 2,
  },

  shopSubTitle: {
    margin: 5,
  },
  timeText: {
    padding: 6,
  },
});

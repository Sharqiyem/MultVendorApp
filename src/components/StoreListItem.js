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
import { FontAwesome as Icon } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";
import { useNavigation } from "@react-navigation/native";

const widowWidth = Dimensions.get("window").width;

export const StoreListItem = ({ item }) => {
  const navigation = useNavigation();
  const { image, openTime, closeTime } = item;
  const { t, locale } = React.useContext(LocalizationContext);
  const { text, row, textHeader } = getStyle(locale === "ar");

  const storeName = item?.names[locale] || item.name;
  const storeDescription = item?.descriptions[locale] || item.description;

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
              alignItems: "center",
              // backgroundColor:'grey'
            },
            row,
          ]}
        >
          <Text
            numberOfLines={1}
            style={[textHeader, { color: Colors.primary }]}
          >
            {storeName}
          </Text>

          <Rater value={3.9} />
        </View>

        <Text numberOfLines={2} style={[text, styles.shopSubTitle]}>
          {storeDescription}
        </Text>
        {/* <Text style={[text, styles.timeText]}>
          {openTime} : {closeTime}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

const Rater = ({ value = 0, onPress }) => {
  const rating = value;
  value = Math.round(value);
  const starFull = "star";
  const starHalf = "star-half-empty";
  const starEmpty = "star-o";

  let stars = [];
  for (var i = 1; i <= 5; i++) {
    let path = starFull;
    let index = i;
    if (i > value) {
      path = starEmpty;
    }

    stars.push(
      <TouchableOpacity
        activeOpacity={!onPress ? 0.7 : 1}
        key={`rater-${i}`}
        onPress={() => {
          if (onPress) {
            onPress(index);
          }
        }}
      >
        <Icon
          name={path}
          size={18}
          style={{ marginHorizontal: 0.5 }}
          color={Colors.orange}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {stars}
    </View>
  );
};

const Rating = ({ value }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Icon name="star" size={20} style={{}} color={Colors.orange} />
      <Icon name="star" size={20} style={{}} color={Colors.orange} />
      <Icon name="star" size={20} style={{}} color={Colors.orange} />
      <Icon name="staro" size={20} style={{}} color={Colors.orange} />
    </View>
  );
};

const width = widowWidth / 3 - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    // backgroundColor:'red'
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

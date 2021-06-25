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
import InvertibleScrollView from "react-native-invertible-scroll-view";

import Colors from "../constants/Colors";
import { LocalizationContext } from "../context/cartContext/provider";

const image1 = require("../../assets/images/Stores/1.jpeg");
const image2 = require("../../assets/images/Stores/2.jpg");
const image3 = require("../../assets/images/Stores/3.jpeg");

const images = [image1, image2, image3];
const { width } = Dimensions.get("window");

export const BannerScrollView = () => {
  const { isRTL } = React.useContext(LocalizationContext);
  // const [images, setImages] = React.useState([image1, image2, image3]);

  return (
    <View style={{ backgroundColor: "#fff", minHeight:180 }}>
      <InvertibleScrollView
        key={isRTL}
        inverted={!isRTL}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => {
          return (
            <View style={styles.imageContiner} key={`img-${index}`}>
              <Image style={styles.image} resizeMode="cover" source={image} />
              <View style={styles.itemTwoOverlay} />
            </View>
          );
        })}
      </InvertibleScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContiner: {
    flex: 1,
    height: 180,
    width: width - 50,
    overflow: "hidden",
    alignItems: "stretch",
    margin: 3,
    // backgroundColor: 'red'
  },
  image: {
    height: "100%",
    width: "100%",
    // backgroundColor: 'red',

    // width: null,
    // height: null,
  },
  itemTwoOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.2,
  },
});

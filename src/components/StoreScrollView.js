import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  // Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import * as Icon from "@expo/vector-icons";
import Colors from "../constants/Colors";
import getStyle from "../constants/styles";
import Layout from "../constants/Layout";
import { useGetDataByCollection } from "../hooks";
import { LocalizationContext } from "../context/cartContext/provider";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const StoreScrollView = ({data, isLoading}) => {
  const navigation = useNavigation();
  const { t, locale, isRTL } = React.useContext(LocalizationContext);

  const { row, flexDir, text } = getStyle(locale === "ar");

  return (
    <InvertibleScrollView
      key={isRTL}
      inverted={!isRTL}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {isLoading ? (
        <ActivityIndicator
          style={{
            alignSelf: "center",
            width: Layout.window.width,
          }}
          size={"large"}
          color={Colors.primary}
        />
      ) : (
        data.map((item) => {
          const { id, name, names, image, description } = item;

          const storeName = names[locale] || name;
          return (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primaryLighter,
                margin: 2,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                overflow: "hidden",
                height:200,
              }}
              key={id}
              onPress={() =>
                navigation.navigate("Store", {
                  item,
                })
              }
            >
              <View style={styles.imageContiner}>
                {image ? (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    {...{ uri: image }}
                  />
                ) : (
                  <View
                    style={{
                      ...styles.image,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon.Feather
                      name="image"
                      size={60}
                      color={Colors.white}
                      style={{ marginHorizontal: 5, opacity: 0.5 }}
                    />
                  </View>
                )}
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 45,
                  // backgroundColor: "red",
                }}
              >
                <Text numberOfLines={1} style={[text, styles.shopTitle]}>
                  {storeName}
                </Text>
              </View>
             </TouchableOpacity>
          );
        })
      )}
    </InvertibleScrollView>
  );
};

export default StoreScrollView;
const styles = StyleSheet.create({
  scrollView: {
    marginRight: 10,
    // backgroundColor: 'red',

    // transform: [{ scaleX: -1 }],
  },

  imageContiner: {
    height: 150,
    width: width / 2 - 50,
    // overflow: "hidden",
    // alignItems: "stretch",
    // margin: 3,

    backgroundColor: "red",
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.primaryLighter,
  },
  shopTitle: {
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 3,
    width: width / 2 - 50,
  },
 
});

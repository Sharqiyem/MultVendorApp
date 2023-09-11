import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Icon from "@expo/vector-icons";

import getStyle from "../constants/styles";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { LocalizationContext } from "../context/cartContext/provider";
import { useGetDataByCollection, useGetProductsByCatId } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";

const widowWidth = Dimensions.get("window").width;

export const CategoryList = ({ data, isLoading }) => {
  if (isLoading) return <Loading />;

  return (
    <FlatList
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => <CategoryListItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export const CategoryListItem = ({ item }) => {
  const [data] = useGetProductsByCatId(item.id, (key = "type"));
  const navigation = useNavigation();
  const { t, locale } = React.useContext(LocalizationContext);

  const { angleIcon, row, textHeader, text } = getStyle(locale === "ar");

  return (
    <TouchableOpacity
      style={[styles.container, row]}
      onPress={() => {
        navigation.navigate("Category", { item });
      }}
    >
      <View style={styles.imageContiner}>
        {item.image ? (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: item.image }}
          />
        ) : (
          <View
            style={{
              ...styles.image,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e6ebfd",
            }}
          >
            <Icon.Feather
              name="image"
              size={25}
              color={Colors.primaryLight}
              style={{ marginHorizontal: 5 }}
            />
          </View>
        )}
      </View>
      <View style={styles.textContiner}>
        <View styles={{}}>
          <Text style={[textHeader, { color: Colors.primary }]}>
            {item.names[locale]}
          </Text>
        </View>

        <View style={[row, { alignItems: "center" }]}>
          <Text style={[text, styles.shopSubTitle]}>({data?.length})</Text>
          <Text style={[text, styles.shopSubTitle]}>{t("Product")}</Text>
        </View>
      </View>
      <FontAwesome
        name={angleIcon}
        size={25}
        style={{ alignSelf: "center" }}
        color={Colors.grey}
      />
    </TouchableOpacity>
  );
};

const width = widowWidth / 3 - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  imageContiner: {
    // flex: 1,
    height: width,
    width: width,
    overflow: "hidden",
    alignItems: "stretch",
    borderRadius: 10,

    // backgroundColor: 'red'
  },
  textContiner: {
    flex: 1,
    marginHorizontal: 20,
  },
  image: {
    height: "100%",
    width: "100%",

    // borderRadius: width / 2,
  },

  shopSubTitle: {
    margin: 5,
  },
  timeText: {
    padding: 6,
  },
});

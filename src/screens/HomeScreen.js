import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LocalizationContext } from "../context/cartContext/provider";
import {
  ExProductCycleList,
  BannerScrollView,
  StoreScrollView,
  ExCategoryCycleItem,
} from "../components/index";
import getStyle from "../constants/styles.js";
import { useGetDataByCollection } from "../hooks";
import Link from "../components/Link";

export default function HomeScreen({ navigation, route }) {
  const [data, isLoading] = useGetDataByCollection("products");
  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const { row, text, textHeader } = getStyle(locale === "ar");

  const renderShopByStores = () => {
    return (
      <View style={{ margin: 10 }}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              marginVertical: 15,
            },
          ]}
        >
          <View styles={{}}>
            <Text style={[textHeader, { marginHorizontal: 5 }]}>
              {t("Shop by Stores")}
            </Text>
          </View>
          <Link
            onPress={() => {
              navigation.navigate("Stores");
            }}
          />
        </View>
        <StoreScrollView />
      </View>
    );
  };

  const renderShopByCategories = () => {
    return (
      <View style={{ margin: 10 }}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              marginVertical: 15,
            },
          ]}
        >
          <View styles={{}}>
            <Text style={[textHeader, { marginHorizontal: 5 }]}>
              {t("Shop by Categories")}
            </Text>
          </View>
          <Link
            onPress={() => {
              navigation.navigate("Categories");
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ExCategoryCycleItem navigation={navigation} />
        </View>
      </View>
    );
  };

  const renderMyLastOrders = () => {
    return (
      <View style={{ margin: 10 }}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              marginVertical: 15,
            },
          ]}
        >
          <View styles={{}}>
            <Text style={[textHeader, { marginHorizontal: 5 }]}>
              {t("Past orders")}
            </Text>
          </View>
          <Link
            onPress={() => {
              navigation.navigate("Orders");
            }}
          />
        </View>

        <ExProductCycleList limit={6} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner */}
      <View style={{ marginVertical: 0 }}>
        <BannerScrollView />
      </View>

      {/* Shop By Stores */}
      {renderShopByStores()}

      {/* Shop By categories */}
      {renderShopByCategories()}

      {renderMyLastOrders()}
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: "TITLE",
  headerTitleStyle: { textAlign: "center", alignSelf: "center" },
  headerStyle: {
    // backgroundColor: 'red',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    backgroundColor: "#FFF",
  },

  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
});

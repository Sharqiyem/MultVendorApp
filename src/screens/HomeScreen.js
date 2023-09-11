import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LocalizationContext } from "../context/cartContext/provider";
import {
  ExProductCycleList,
  BannerScrollView,
  StoreScrollView,
  ExCategoryCycleItem,
  ListCycleItems,
} from "../components/index";
import getStyle from "../constants/styles.js";
import { useGetDataByCollection } from "../hooks";
import Link from "../components/Link";
import { RoundedProducsList } from "../components/RoundedProducsList";

export default function HomeScreen({ navigation, route }) {
  const [data, isLoading] = useGetDataByCollection("products");
  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const { row, text, textHeader } = getStyle(locale === "ar");

  const [categories, isLoadingCategories] = useGetDataByCollection("cuisines");

  const [stores, isLoadingStores] = useGetDataByCollection("stores");

  const [products, isLoadingProducts] = useGetDataByCollection("products");

  const popularProducts =  products?.slice(2, 6);

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
        <StoreScrollView data={stores} isLoading={isLoadingStores} />
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

        <ListCycleItems
          data={categories}
          isLoading={isLoadingCategories}
        />
      </View>
    );
  };

  const renderPopularProducts = () => {
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
              {t("Popular products")}
            </Text>
          </View>
          <Link
            onPress={() => {
              navigation.navigate("Orders");
            }}
          />
        </View>

        <RoundedProducsList key="propular" data={popularProducts} isLoading={isLoadingProducts} limit={3} />
      </View>
    );
  };
  const renderLastAddedProducts = () => {
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
              {t("Last added")}
            </Text>
          </View>
          <Link
            onPress={() => {
              navigation.navigate("Orders");
            }}
          />
        </View>

        <ExProductCycleList data={products} isLoading={isLoadingProducts} limit={3} />
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

        <ExProductCycleList data={products} isLoading={isLoadingProducts} limit={6} />
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

      {renderPopularProducts()}

      {renderLastAddedProducts()}

      {renderMyLastOrders()}
    </ScrollView>
  );
}

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

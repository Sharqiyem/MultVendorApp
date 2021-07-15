import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { FlatGrid } from "react-native-super-grid";

import { ProductCycleItem } from "../../components";
import Loading from "../../components/Loading";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import getStyle from "../../constants/styles";
import { AuthContext } from "../../context/authContext/provider";
import { LocalizationContext } from "../../context/cartContext/provider";
import { useGetDataByCollection, useGetProductsByStoreId } from "../../hooks";
import { ProductsContext } from "../../context/productsContext/provider";

const itemsPerRow = 3;
const margenHorizontal = 5;
const width =
  (Layout.window.width - 20) / itemsPerRow - itemsPerRow * margenHorizontal;
const raduisWidth = width / 2;

const ProductsScreen = ({ navigation }) => {
  const { state, dispatch } = React.useContext(AuthContext);

  const { t, locale } = React.useContext(LocalizationContext);
  const {
    buttonPrimary,
    row,
    categoryContainer,
    boldText,
    primaryText,
    shadow,
    text,
  } = getStyle(locale === "ar");

  const [storeProducts, isLoadingStores] = useGetProductsByStoreId(
    state.userData?.storeId
  );

  const { refreshProducts } = useContext(ProductsContext);

  console.log("storeProducts length", storeProducts?.length);
  const [categories, isLoadingCats] = useGetDataByCollection("categories");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoadingCats && !isLoadingStores) {
      //get categories with products for each
      const result = [];
      categories?.map((item) => {
        const category = { ...item };
        category.data = storeProducts?.filter(
          (productItem) => productItem.catId === category.id
        );

        result.push(category);
      });
      setProducts(result);
      setIsLoading(false);
      // console.log("result", result);
    }
  }, [isLoadingStores, isLoadingCats, refreshProducts]);

  const renderNewProductButton = () => {
    return (
      <View style={[styles.newProductContainer, shadow]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewProduct");
          }}
          style={[buttonPrimary, row, { width: "100%" }]}
        >
          <Icon.Feather
            name="plus"
            size={20}
            color={Colors.white}
            style={{ marginHorizontal: 5 }}
          />
          <Text style={{ ...text, color: Colors.white }}>
            {t("Add new product")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index, categoryItem }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NewProduct", { item, category: categoryItem });
        }}
        style={[styles.itemContainer, { backgroundColor: "red" }]}
        key={item.id}
      >
        <View style={styles.itemTwoContainer}>
          {item.images?.length > 0 ? (
            <Image
              style={styles.itemTwoImage}
              source={{ uri: item.images[0] }}
            />
          ) : (
            <View
              style={{
                ...styles.itemTwoImage,
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
        <Text style={styles.itemTwoTitle}>{item.name}</Text>
        <Text style={{ color: Colors.gray }}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  const renderNewList = () => {
    if (isLoading) {
      return <Loading />;
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 70,
        }}
      >
        {products.map((categoryItem) => {
          const name = categoryItem?.names[locale] || categoryItem.name;
          return (
            <View
              style={{
                borderWidth: 1,
                margin: 10,
                borderRadius: 10,
                borderColor: "rgba(0,0,0,0.05)",
              }}
              key={categoryItem.id}
            >
              <View
                key={categoryItem.id}
                style={[
                  row,
                  categoryContainer,
                  {
                    justifyContent: "space-between",
                  },
                ]}
              >
                <Text style={[boldText]}>{name}</Text>
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10 }}
                  onPress={() => {
                    navigation.navigate("NewProduct", {
                      category: categoryItem,
                    });
                  }}
                >
                  <Icon.Feather
                    name="plus"
                    size={25}
                    color={Colors.primary}
                    style={{ marginHorizontal: 5 }}
                  />
                </TouchableOpacity>
              </View>
              {categoryItem.data.length > 0 ? (
                // <FlatList
                //   // contentContainerStyle={row}
                //   key={products.length}
                //   numColumns={3}
                //   data={categoryItem.data}
                //   renderItem={({ item }) => renderItem({ item, categoryItem })}
                //   keyExtractor={(item) => item.id}
                // />
                <FlatGrid
                  itemDimension={100}
                  data={categoryItem.data}
                  style={{ marginTop: 10, flex: 1 }}
                  // staticDimension={300}
                  // fixed
                  spacing={10}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("NewProduct", {
                          item,
                          category: categoryItem,
                        });
                      }}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.itemTwoContainer}>
                        {item.images?.length > 0 ? (
                          <Image
                            style={styles.itemTwoImage}
                            source={{ uri: item.images[0] }}
                          />
                        ) : (
                          <View
                            style={{
                              ...styles.itemTwoImage,
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
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        <Text style={styles.itemTwoTitle}>{item.name}</Text>
                        <Text style={{ color: Colors.gray, lineHeight: 20 }}>
                          {item.price}$
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                  <Text style={text}>{t("No products")}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, shadow]}>
      {renderNewList()}

      {renderNewProductButton()}
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  newProductContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  sectionHeader: {
    fontSize: 20,
    color: Colors.primary,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: margenHorizontal,
    marginVertical: 10,
  },
  itemTwoImage: {
    width: "100%",
    height: width,
    borderRadius: raduisWidth,
  },
  itemTwoContainer: {
    width: width,
    borderRadius: raduisWidth,
  },

  itemTwoTitle: {
    color: Colors.primary,
  },
});

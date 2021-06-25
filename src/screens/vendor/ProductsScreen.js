import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import getStyle, { globalStyles } from "../../constants/styles";
import { AuthContext } from "../../context/authContext/provider";
import { LocalizationContext } from "../../context/cartContext/provider";
import { useGetDataByCollection, useGetProductsByStoreId } from "../../hooks";

const ProductsScreen = ({ navigation }) => {
  const { state, dispatch } = React.useContext(AuthContext);

  const { t } = React.useContext(LocalizationContext);
  const [stores, isLoadingStores] = useGetProductsByStoreId(
    state.userData?.storeId
  );
  const [categories, isLoadingCats] = useGetDataByCollection("categories");
  const getStyles = getStyle();

  useEffect(() => {
    if (!isLoadingCats && !isLoadingStores) {
      console.log("stores state", stores);
      console.log("categories state", categories);
    }
  }, [isLoadingStores, isLoadingCats]);

  const renderNewProductButton = () => {
    return (
      <View style={[styles.newProductContainer, getStyles.shadow]}>
        <TouchableOpacity style={[getStyles.buttonPrimary, { width: "100%" }]}>
          <Text style={{ color: Colors.white }}>{t("New product")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={[styles.container, getStyles.shadow]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70, paddingTop: 15 }}
      ></ScrollView>
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
    // backgroundColor:'gray',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

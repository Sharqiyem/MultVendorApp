import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import * as Icon from "@expo/vector-icons";

import Dialog from "react-native-dialog";
import Colors from "../../constants/Colors";

import firebase from "../../config/firebase.config";

import getStyle from "../../constants/styles";
import { AuthContext } from "../../context/authContext/provider";
import { LocalizationContext } from "../../context/cartContext/provider";
import { useGetCategoriesByStoreId } from "../../hooks";
import { ProductsContext } from "../../context/productsContext/provider";

const CategorySelectorScreen = ({ navigation, route }) => {
  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const { row, buttonPrimary, text, bottomContainer, shadow, textInput } =
    getStyle(locale === "ar");

  const { state: authState } = React.useContext(AuthContext);

  const { refreshProducts, setRefreshProducts } =
    React.useContext(ProductsContext);

  const [data, isLoadingCategories] = useGetCategoriesByStoreId(
    authState.userData.storeId
  );

  // console.log("data", data);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [categoryArName, setCategoryArName] = useState("");
  const [categoryEnName, setCategoryEnName] = useState("");

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCategorySubmit = () => {
    console.log({
      categoryArName,
      categoryEnName,
    });
    if (categoryArName === "" && categoryEnName === "") {
      alert("Please enter name at least in one language");
      return;
    }
    submitCategory();
  };

  const handleDeleteCategory = async (catId) => {
    try {
      setIsLoading(true);
      const db = firebase.firestore();
      await db.collection("categories").doc(catId).delete();
      setRefreshProducts(!refreshProducts);
    } catch (err) {
      console.log("messages err", err);
    } finally {
      setIsLoading(false);
      setVisible(false);
    }
  };

  const submitCategory = async (data) => {
    const categoryObject = {
      name: categoryEnName,
      names: {
        ar: categoryArName,
        en: categoryEnName,
      },
      storeId: authState.userData.storeId,
    };
    console.log("categoryObject", categoryObject);

    try {
      setIsLoading(true);
      const db = firebase.firestore();
      await db.collection("categories").add(categoryObject);
      setRefreshProducts(!refreshProducts);
    } catch (err) {
      console.log("messages err", err);
    } finally {
      setIsLoading(false);
      setVisible(false);
    }
  };

  const renderDialog = () => {
    return (
      <Dialog.Container contentStyle={{ width: "100%" }} visible={visible}>
        <Dialog.Title>
          {t("New category") + "                                           "}
        </Dialog.Title>

        <Dialog.Input
          placeholder={t("Category name in Arabic")}
          underlineColorAndroid={"rgba(0,0,0,0)"}
          style={textInput}
          onChangeText={(text) => setCategoryArName(text)}
        ></Dialog.Input>
        <Dialog.Input
          placeholder={t("Category name in English")}
          underlineColorAndroid={"rgba(0,0,0,0)"}
          style={[textInput, { marginVertical: 0 }]}
          onChangeText={(text) => setCategoryEnName(text)}
        ></Dialog.Input>
        <Dialog.Button
          color={Colors.primary}
          label={t("Cancel")}
          onPress={handleCancel}
        />
        <Dialog.Button
          color={Colors.primary}
          label={t("Ok")}
          onPress={handleCategorySubmit}
        />
      </Dialog.Container>
    );
  };

  const renderItem = ({ item }) => {
    const name = item?.names[!isRTL ? "ar" : "en"] || item?.name;
    return (
      <TouchableOpacity
        onPress={() => {
          if (route?.params?.onBack) {
            const field = route?.params?.field;
            route?.params?.onBack(item, field);
          }
          navigation.goBack();
        }}
        style={{
          ...styles.listItemContainer,
          ...row,
          justifyContent: "space-between",
        }}
      >
        <Text style={text}>{name}</Text>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10 }}
          onPress={() => handleDeleteCategory(item.id)}
        >
          <Icon.Feather
            name="trash"
            size={25}
            color={Colors.errorBackground}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const renderList = () => {
    if (isLoadingCategories) return null;
    return (
      <View style={{ margin: 15 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
        />
      </View>
    );
  };

  const renderNewcategoryButton = () => {
    return (
      <View style={[bottomContainer, shadow]}>
        <TouchableOpacity
          onPress={showDialog}
          style={[buttonPrimary, { width: "100%" }]}
        >
          <Text style={{ color: Colors.white }}>{t("New category")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderList()}
      {renderNewcategoryButton()}
      {renderDialog()}
    </View>
  );
};

export default CategorySelectorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listItemContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    marginVertical: 0,
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Toast from "react-native-root-toast";

import { useForm, Controller, useController } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Icon from "@expo/vector-icons";

import firebase from "../../config/firebase.config";

import Images from "../../components/Images";
import { LocalizationContext } from "../../context/cartContext/provider";
import getStyle from "../../constants/styles";
import { AuthContext } from "../../context/authContext/provider";
import Colors from "../../constants/Colors";
import { ProductsContext } from "../../context/productsContext/provider";

const image1 =
  "https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?b=1&k=6&m=1220017909&s=170667a&w=0&h=yqVHUpGRq-vldcbdMjSbaDV9j52Vq8AaGUNpYBGklXs=";

const NewProductScreen = ({ navigation, route }) => {
  const product = route?.params?.item;
  const productCategory = route?.params?.category;

  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const {
    buttonPrimary,
    text,
    fieldContainer,
    row,
    error: errorStyle,
    textInput,
  } = getStyle(locale === "ar");

  const { state: authState } = React.useContext(AuthContext);
  const { refreshProducts, setRefreshProducts } =
    React.useContext(ProductsContext);

  //useForm
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState(product ? product.images : []);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(productCategory || null);
  const [isActive, setIsActive] = useState(product ? product.isActive : true);

  const onChange = (items) => {
    if (items) {
      setImages([...items]);
    }
  };

  const handleSend = async (data) => {
    // console.log("data", data);
    const userId = firebase.auth().currentUser.uid;
    const productObject = {
      catId: category?.id,
      name: data.nameAr,
      names: {
        ar: data.nameAr,
        en: data.nameEn,
      },
      price: data.price,
      status: true,
      images,
      storeId: authState.userData?.storeId,
      isActive,
    };
    console.log("productObject", productObject);

    try {
      setIsLoading(true);
      const db = firebase.firestore();
      if (product) {
        await db.collection("products").doc(product?.id).update(productObject);
      } else {
        await db.collection("products").add(productObject);
      }
      // alert("Your product sent successfully.");
      Toast.show(`Your product ${product ? "updated" : "sent"} successfully.`, {
        position: -20,
        backgroundColor: Colors.primary,
        opacity: 0.8
      });

      reset();
      setImages([]);
      setRefreshProducts(!refreshProducts);
      navigation.goBack();
    } catch (err) {
      console.log("messages err", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (data) => {
    try {
      setIsLoading(true);
      const db = firebase.firestore();
      await db.collection("products").doc(product?.id).delete();
      alert("Your product deleted successfully.");
      Toast.show("Your product deleted successfully.");

      setRefreshProducts(!refreshProducts);
      navigation.goBack();
    } catch (err) {
      console.log("messages err", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onBack = (item, field) => {
    console.log("item back", item);
    if (item && item.name) {
      const name = item?.names[!isRTL ? "ar" : "en"] || item?.name;

      field.onChange(name);
      setCategory(item);
    }
  };

  const renerImagesInput = () => {
    return (
      <View style={fieldContainer}>
        <Images items={images} onChange={onChange} />
      </View>
    );
  };

  const renderSelectorCategory = () => {
    const name = category?.names[!isRTL ? "ar" : "en"] || category?.name || "";

    const { field } = useController({
      control,
      defaultValue: name,
      name: "category",
      rules: {
        required: true,
      },
    });
    return (
      <View style={fieldContainer}>
        <Text style={text}>{t("Product category")}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CategorySelector", { field, onBack });
          }}
        >
          <TextInput
            style={[textInput, { marginHorizontal: 0 }]}
            placeholder={t("Select product category")}
            placeholderStyle={{ textAlign: "center" }}
            autoCorrect={false}
            autoCapitalize="none" 
            onChangeText={field.onChange}
            value={field.value}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        {errors.category && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
      </View>
    );
  };

  const renderInputName = () => {
    return (
      <View style={fieldContainer}>
        <Text style={text}>{t("Product name")}</Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[textInput, { marginHorizontal: 0 }]}
              placeholder={t("Input product name in Arabic")}
              placeholderStyle={{ textAlign: "center" }}
              autoCorrect={false}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="nameAr"
          rules={{ required: true }}
          defaultValue={product?.names?.ar || ""}
        />
        {errors.nameAr && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}

        <Controller
          control={control}
          rules={
            {
              // required: true,
            }
          }
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[textInput, { marginHorizontal: 0 }]}
              placeholder={t("Input product name in English")}
              placeholderStyle={{ textAlign: "center" }}
              autoCorrect={false}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="nameEn"
          // rules={{ required: true }}
          defaultValue={product?.names?.en || ""}
        />
        {errors.nameEn && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
      </View>
    );
  };

  const renderInputPrice = () => {
    return (
      <View style={fieldContainer}>
        <Text style={text}>{t("Product price")}</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[textInput, { marginHorizontal: 0 }]}
              placeholder={t("Input product price")}
              placeholderStyle={{ textAlign: "center" }}
              autoCorrect={false}
              keyboardType="number-pad"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="price"
          rules={{ required: true }}
          defaultValue={product?.price || ""}
        />
        {errors.price && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
      </View>
    );
  };

  const renderActiveBox = () => {
    return (
      <View style={[fieldContainer, row, { justifyContent: "space-between" }]}>
        <Text style={text}>{t("Product active")}</Text>
        <TouchableOpacity
          onPress={() => {
            setIsActive(!isActive);
          }}
          style={{
            borderColor: Colors.primary,
            borderWidth: 1,
            borderRadius: 15,
            height: 30,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isActive ? Colors.primary : Colors.white,
          }}
        >
          <Icon.Feather
            name="check"
            size={20}
            color={isActive ? Colors.white : Colors.primary}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSubmitButton = () => {
    return (
      <TouchableOpacity
        onPress={handleSubmit(handleSend)}
        style={[buttonPrimary, { width: "100%" }]}
      >
        <Text style={{ color: Colors.white }}>
          {product ? t("SAVE") : t("SEND")}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity
        onPress={handleDelete}
        style={[
          buttonPrimary,
          { width: "100%", backgroundColor: Colors.errorBackground },
        ]}
      >
        <Text style={{ color: Colors.white }}>{t("DELETE")}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={40}
      extraScrollHeight={130}
      contentContainerStyle={{ backgroundColor: "#fff" }}
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled
    >
      <View style={styles.formContainer}>
        {/* {<RenerImagesInput items={items} onChange={onChange} />} */}
        {renerImagesInput()}

        {renderInputName()}
        {renderSelectorCategory()}
        {renderInputPrice()}
        {renderActiveBox()}
        {renderSubmitButton()}
        {product && renderDeleteButton()}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default NewProductScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  formContainer: {
    padding: 8,
    flex: 1,
  },
});

import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { CategoryList } from "../components/index";
import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";
import { useGetDataByCollection } from "../hooks";
export default function CategoriesScreen({ navigation }) {
  const { t, locale } = React.useContext(LocalizationContext);
  const { textInputLight } = getStyle(locale === "ar");
  const [data, isLoading] = useGetDataByCollection("categories");

  return (
    <View style={styles.container}>
      <CategoryList data={data} isLoading={isLoading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { CategoryList } from "../components/index";
import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";
export default function CategoriesScreen({ navigation }) {
  const { t, locale } = React.useContext(LocalizationContext);
  const { textInputLight } = getStyle(locale === "ar");

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={textInputLight}>
          <Text style={{ color: Colors.white }}>Search your category</Text>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <CategoryList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

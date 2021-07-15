import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { StoreListItem } from "../components/index";
import { LocalizationContext } from "../context/cartContext/provider";
import getStyle from "../constants/styles";
import { useGetDataByCollection } from "../hooks";

export default function StoresScreen({ navigation }) {
  const [data, isLoading] = useGetDataByCollection("stores");
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
          <Text style={{ color: Colors.white }}>Search your store</Text>
        </View>
      </View>
      {isLoading ? (
        <Text> Loading </Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <StoreListItem navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

StoresScreen.navigationOptions = {
  // header: null,
  // headerShown: false,
  title: "sda",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

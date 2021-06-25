import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  ExStoreDetailHeader,
  ExProductCycleList,
  ProductCycleItem,
} from "../components";
import Colors from "../constants/Colors";
import { useGetProductsByCatId } from "../hooks";

export default function CategoryScreen({ navigation, route }) {
  const { item } = route.params;

  const [data, isLoading] = useGetProductsByCatId(item.id);

  if (isLoading) return <Text> Loading </Text>;

  if (isLoading) return <Text> Loading </Text>;

  return (
    <View style={styles.container}>
      {/* <ExProductCycleList /> */}

      <FlatList
        numColumns={3}
        data={data}
        renderItem={({ item }) => <ProductCycleItem item={item} />}
        keyExtractor={(item) => item.id}
        // ListHeaderComponent={getHeader}
        // ListFooterComponent={getFooter}
      />
    </View>
  );
}

CategoryScreen.navigationOptions = {
  // header: null,
  title: "s",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
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
  btnText: {
    fontSize: 17,
    color: "#fff",
    textAlign: "center",
  },
});

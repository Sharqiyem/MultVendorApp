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
import Loading from "../components/Loading";
import Colors from "../constants/Colors";
import { useGetProductsByCatId } from "../hooks";

export default function ProductsByTypesScreen({ navigation, route }) {
  const { item } = route.params;
  console.log('ProductsByTypesScreen item', item)

  const [data, isLoading] = useGetProductsByCatId(item.id, key="type");

  console.log('dddd')
  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
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

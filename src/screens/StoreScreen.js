import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ExStoreDetailHeader,
  ExProductCycleList,
  StoreProducts,
} from "../components";
import Colors from "../constants/Colors";

export default function StoreScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = React.useState("products");
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <ExStoreDetailHeader item={item} />

      {/* BUTTONS */}
      <View
        style={{
          marginTop: -12,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            // width: '100%',
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#fff",
            borderBottomWidth: activeTab === "products" ? 1 : 0,
          }}
          onPress={() => {
            setActiveTab("products");
          }}
        >
          <Text style={styles.btnText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#fff",
            borderBottomWidth: activeTab === "reviews" ? 1 : 0,
          }}
          onPress={() => {
            setActiveTab("reviews");
          }}
        >
          <Text style={styles.btnText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#fff",
            borderBottomWidth: activeTab === "about" ? 1 : 0,
          }}
          onPress={() => {
            setActiveTab("about");
          }}
        >
          <Text style={styles.btnText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* TABS */}
      {activeTab === "products" && (
        <View style={{ margin: 5, marginVertical: 15 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <StoreProducts storeId={item.id} />
          </View>
        </View>
      )}
      {activeTab === "reviews" && (
        <View style={{ margin: 5, marginVertical: 15 }}>
          <Text>Reviews</Text>
        </View>
      )}
      {activeTab === "about" && (
        <View style={{ margin: 10, marginVertical: 15 }}>
          <Text>{item.description}</Text>
        </View>
      )}
    </View>
  );
}

// StoreScreen.navigationOptions = {
//   // header: null,
//   title: 's',
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

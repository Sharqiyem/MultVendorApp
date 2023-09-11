import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Icon from "@expo/vector-icons";

import {
  ExStoreDetailHeader,
  ExProductCycleList,
  StoreProducts,
} from "../components";
import Colors from "../constants/Colors";
import CartButton from "../components/CartButton";
import { StoreDetailHeader } from "../components/StoreDetailHeader";
import { useGetProductsByStoreId, useGetStoreByStoreId } from "../hooks";
import { LocalizationContext } from "../context/cartContext/provider";
import Loading from "../components/Loading";

function RenderImage({ image }) {
  return (
    <View
      style={{
        height: 250,
        backgroundColor: Colors.primaryLightest,
      }}
    >
      <Image
        style={{
          height: "100%",
          width: "100%",
        }}
        source={{
          uri: image,
        }}
      />
    </View>
  );
}

function RenderHeaderIcons(props) {
  return (
    <View
      style={{
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        padding: 5,
        zIndex: 999,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", // backgroundColor:'grey'
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          // padding: 5,
          height: 24 * 2,
          width: 24 * 2,
          borderRadius: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => props.goBack()}
      >
        <Icon.Feather name="arrow-left" size={24} color="grey" />
      </TouchableOpacity>
      <CartButton />
    </View>
  );
}

export default function StoreScreen({ navigation, route }) {
  const { item } = route.params;
  const { locale } = React.useContext(LocalizationContext);
  const [store, isLoading] = useGetStoreByStoreId(item?.id);
  const [storeProducts, isLoadingStoreProducts] = useGetProductsByStoreId(
    item.id
  );

  const [activeTab, setActiveTab] = React.useState("products");

  if (isLoading) return <Loading />;

  const storeDescription = store?.descriptions[locale] || store?.description;

  const renderProducts = () => {
    return (
      <View style={{ margin: 5, marginVertical: 15, flex: 1 }}>
        <StoreProducts
          data={storeProducts}
          isLoading={isLoadingStoreProducts}
          storeId={item.id}
        />
      </View>
    );
  };

  const renderAbout = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 20,
        }}
        style={{
          backgroundColor: Colors.primaryLightest,
          flex: 1,
        }}
      >
        <StoreDetailHeader store={store} />
        <Text style={{ textAlign: "center", paddingHorizontal: 20 }}>
          {storeDescription}
        </Text>
      </ScrollView>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* header image */}
      <RenderImage image={store?.image} />
      {/* Header buttons icons */}
      <RenderHeaderIcons goBack={navigation.goBack} />
      {/* BUTTONS */}

      {/* TABS */}
      {activeTab === "products" && renderProducts()}

      {activeTab === "reviews" && (
        <View style={{ margin: 5, marginVertical: 15 }}>
          <Text>Reviews</Text>
        </View>
      )}

      {activeTab === "about" && renderAbout()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
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

  function({ store, image }) {
    return (
      <View
        style={{
          height: 250,
          backgroundColor: Colors.primaryLightest,
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
          }}
          source={{
            uri: store?.image,
          }}
        />
      </View>
    );
  },
});

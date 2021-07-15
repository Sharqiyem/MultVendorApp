import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LocalizationContext } from "../context/cartContext/provider";
import {
  ExProductCycleList,
  BannerScrollView,
  StoreScrollView,
  ExCategoryCycleItem,
} from "../components/index";
import Colors from "../constants/Colors";
import getStyle from "../constants/styles.js";
import { useGetDataByCollection } from "../hooks";

export default function HomeScreen({ navigation, route }) {
  //Test firebase

  const [data, isLoading] = useGetDataByCollection("products");
  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const { row, text, textHeader } = getStyle(locale === "ar");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <TouchableOpacity
        style={{ height: 30 }}
        onPress={() => {
          changeLang();
        }}
      >
        <Text
          style={{
            fontFamily: 'DroidKufi',
            color: 'red',
            fontSize: 16, marginHorizontal: 5,
            textAlign: 'center',
          }}
        >
          اللغه
        </Text>
      </TouchableOpacity> */}

      {/* Banner */}
      <View style={{ marginVertical: 5 }}>
        <BannerScrollView />
      </View>

      {/* Shop By Stores */}
      <View style={{ margin: 5 }}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              marginVertical: 15,
            },
          ]}
        >
          <View styles={{}}>
            <Text style={[textHeader, { marginHorizontal: 5 }]}>
              {t("Shop by Stores")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Stores");
            }}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 15,
              height: 30,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                // padding: 5,
                paddingHorizontal: 10,
                color: Colors.white,
              }}
            >
              {t("See All")}
            </Text>
          </TouchableOpacity>
        </View>
        <StoreScrollView navigation={navigation} />
      </View>

      {/* Shop By categories */}
      <View style={{ margin: 5, marginVertical: 15 }}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              marginVertical: 15,
            },
          ]}
        >
          <View styles={{}}>
            <Text style={[textHeader, { marginHorizontal: 5 }]}>
              {t("Shop by Categories")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Categories");
            }}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 15,
              height: 30,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                // padding: 5,
                paddingHorizontal: 10,
                color: Colors.white,
              }}
            >
              {t("See All")}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ExCategoryCycleItem navigation={navigation} />
        </View>
      </View>

      <View style={{ margin: 5, marginVertical: 15 }}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              marginVertical: 15,
            },
          ]}
        >
          <View styles={{}}>
            <Text style={[textHeader, { marginHorizontal: 5 }]}>
              {t("Past orders")}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 30,
              backgroundColor: Colors.primary,
              borderRadius: 15,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                // padding: 5,
                paddingHorizontal: 10,
                color: Colors.white,
              }}
            >
              {t("See All")}
            </Text>
          </TouchableOpacity>
        </View>

        <ExProductCycleList />
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: "TITLE",
  headerTitleStyle: { textAlign: "center", alignSelf: "center" },
  headerStyle: {
    // backgroundColor: 'red',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
});

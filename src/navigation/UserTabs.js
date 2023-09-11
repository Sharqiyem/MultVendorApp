import * as React from "react";
import { Platform } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Custome
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";

import {
  StoreContext,
  LocalizationContext,
} from "../context/cartContext/provider";

//Screens
import HomeStack from "./HomeStack";
import CategoriesStack from "./CategoriesStack";
import StoresStack from "./StoresStack";
import ProfileStack from "./ProfileStack";
import Fonts from "../constants/Fonts";
import ProductTypesStack from "./ProductTypesStack";
import { tabBarOptions } from "./tabBarOptions";
const BottomTab = createMaterialTopTabNavigator();

function UserTabs() {
  const { t, isRTL } = React.useContext(LocalizationContext);
  const { state, dispatch } = React.useContext(StoreContext);

  let tabs = [
    {
      name: "Home",
      component: HomeStack,
      title: t("Home"),
      tabBarIconName: "md-home",
    },

    {
      name: "Stores",
      component: StoresStack,
      title: t("Stores"),
      tabBarIconName: "md-apps",
    },
    {
      name: "Categories",
      component: ProductTypesStack,
      title: t("Categories"),
      tabBarIconName: "md-book",
    },
    {
      name: "Profile",
      component: ProfileStack,
      title: t("Account"),
      tabBarIconName: "md-person",
    },
  ];

  if (!isRTL) {
    tabs = tabs.reverse();
  }
  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Home"
      tabBarOptions={tabBarOptions}
    >
      {tabs.map((tabItem) => {
        return (
          <BottomTab.Screen
            key={`tab-${tabItem.name}`}
            name={tabItem.name}
            component={tabItem.component}
            options={{
              title: tabItem.title,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} name={tabItem.tabBarIconName} />
              ),
            }}
          />
        );
      })}
      {/* <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: t("Home"),

          tabBarIcon: ({ focused }) => {
            return <TabBarIcon focused={focused} name="md-home" />;
          },
        }}
      />
      <BottomTab.Screen
        name="Stores"
        component={StoresStack}
        options={{
          title: t("Stores"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-apps" />
          ),
          headerStyle: {
            backgroundColor: Colors.headerBG,
          },
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          title: t("Categories"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: t("Account"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

export default UserTabs;

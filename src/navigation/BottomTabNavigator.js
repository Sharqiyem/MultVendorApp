import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import DetailsScreen from '../screens/DetailsScreen';
import Colors from '../constants/Colors';
const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Home';

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        safeAreaInset: { bottom: 'always' },
        indicatorStyle: { display: 'none' },
        labelStyle: { fontSize: 12 },
        style: {
          // backgroundColor: '#e91e',
          paddingBottom: 10,
        },
        activeTintColor: Colors.tintColor,
        inactiveTintColor: Colors.tabIconDefault,
        showIcon: true,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="md-code-working"
              color="#e91e63"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" color="#e91e63" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

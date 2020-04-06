import * as React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//Custome
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import CartButton from '../components/CartButton';
//Screens
import HomeScreen from '../screens/HomeScreen';

import CartScreen from '../screens/CartScreen';
import StoresScreen from '../screens/StoresScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { StoreContext, LocalizationContext } from '../context/provider';
import CategoriesScreen from '../screens/CategoriesScreen';
import StoreScreen from '../screens/StoreScreen';
import CategoryScreen from '../screens/CategoryScreen';

const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Home';

function HomeStack({ navigation }) {
  const { t, locale, setLocale } = React.useContext(LocalizationContext);

  const { state, dispatch } = React.useContext(StoreContext);
  // console.log('STATE', { screenProps });
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: 'transparent',
          elevation: 0,
        },
        //Header text color
        headerTintColor: '#fff',
        headerRight: (props) => (
          <CartButton
            navigation={navigation}
            state={state}
            sourceScreen="CartHome"
          />
        ),
      }}
    >
      <Stack.Screen
        options={{ title: t('Home') }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="CartHome"
        options={{ title: 'Details', headerRight: null }}
        component={CartScreen}
      />
      <Stack.Screen
        name="Store"
        options={({ route }) => ({ title: route.params.name })}
        component={StoreScreen}
      />
    </Stack.Navigator>
  );
}

function CategoriesStack({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: 'transparent',
          elevation: 0,
        },
        //Header text color
        headerTintColor: '#fff',
        headerRight: (props) => (
          <CartButton
            navigation={navigation}
            state={state}
            sourceScreen="CartCat"
          />
        ),
      }}
    >
      <Stack.Screen
        name="Categories"
        options={{ title: 'Categories' }}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name="Category"
        options={({ route }) => ({ title: route.params.name })}
        component={CategoryScreen}
      />
      <Stack.Screen
        name="CartCat"
        options={{ title: 'Details', headerRight: null }}
        component={CartScreen}
      />
    </Stack.Navigator>
  );
}
function StoresStack({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: 'transparent',
          borderBottomWidth: 0,
          elevation: 0,
        },
        //Header text color
        headerTintColor: '#fff',
        headerRight: (props) => (
          <CartButton
            navigation={navigation}
            state={state}
            sourceScreen="CartStores"
          />
        ),
      }}
    >
      <Stack.Screen
        name="Stores"
        options={{ title: 'Stores' }}
        component={StoresScreen}
      />
      <Stack.Screen
        name="Store"
        options={({ route }) => ({ title: route.params.name })}
        component={StoreScreen}
      />
      <Stack.Screen
        name="CartStores"
        options={{ title: 'Details', headerRight: null }}
        component={CartScreen}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  console.log('os', Platform.OS);

  const { state, dispatch } = React.useContext(StoreContext);
  // console.log({ state });
  // const { lang, isRTL } = state;
  // const [locale, setLocale] = React.useState(lang);

  // const t = (scope, options) => {
  //   return getString(scope, options);
  // };

  // const screenProps = {
  //   t,
  //   isRTL,
  //   locale: lang,
  // };

  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        safeAreaInset: { bottom: 'always' },
        indicatorStyle: {
          display: 'none',
          color: '#fff',
          borderColor: 'transparent',
          borderBottomWidth: 0,
        },
        labelStyle: { fontSize: 10 },
        style: {
          backgroundColor: Colors.tabBarBG,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          // paddingBottom: 20,
        },
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.primaryLight,
        showIcon: true,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stores"
        component={StoresStack}
        options={{
          title: 'Stores',
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
          title: 'Categories',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

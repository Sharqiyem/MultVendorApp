import * as React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
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
import {
  StoreContext,
  LocalizationContext,
} from '../context/cartContext/provider';
import CategoriesScreen from '../screens/CategoriesScreen';
import StoreScreen from '../screens/StoreScreen';
import CategoryScreen from '../screens/CategoryScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { AuthContext } from '../context/authContext/provider';
import LoadingScreen from '../screens/LoadingScreen';
import AddressesScreen from '../screens/AddressesScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Home';

function HomeStack({ navigation, route }) {
  const { t } = React.useContext(LocalizationContext);

  const { state } = React.useContext(StoreContext);

  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });

  // console.log('STATE', { screenProps });
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
          width: '100%',
          // backgroundColor: 'red',
        },
        //Header text color
        headerTintColor: '#fff',
        // headerLeft: (props) => <View />,

        headerRight: () => (
          <CartButton
            navigation={navigation}
            state={state}
            sourceScreen='CartHome'
          />
        ),
      }}
    >
      <Stack.Screen
        options={{
          title: t('Home'),
        }}
        name='Home'
        component={HomeScreen}
      />
      <Stack.Screen
        name='CartHome'
        options={{ title: 'Your cart', headerRight: null }}
        component={CartScreen}
      />
      <Stack.Screen
        name='Store'
        options={({ route }) => ({ title: route.params.name })}
        component={StoreScreen}
      />
    </Stack.Navigator>
  );
}

function CategoriesStack({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const { t } = React.useContext(LocalizationContext);

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
            sourceScreen='CartCat'
          />
        ),
      }}
    >
      <Stack.Screen
        name='Categories'
        options={{ title: 'Categories' }}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name='Category'
        options={({ route }) => ({ title: route.params.name })}
        component={CategoryScreen}
      />
      <Stack.Screen
        name='CartCat'
        options={{ title: 'Your cart', headerRight: null }}
        component={CartScreen}
      />
    </Stack.Navigator>
  );
}

function CheckOutStack({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const { t } = React.useContext(LocalizationContext);

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
            sourceScreen='CartStores'
          />
        ),
        tabBarVisible: false,
      }}
    >
      <Stack.Screen
        name='Address'
        options={{ title: 'Select address', headerRight: null }}
        component={AddressesScreen}
      />
      <Stack.Screen
        name='Payment'
        options={{ title: 'Payment', headerRight: null }}
        component={PaymentScreen}
      />
      <Stack.Screen
        name='OrderDetails'
        options={{ title: 'Order details', headerRight: null }}
        component={OrderDetailsScreen}
      />
    </Stack.Navigator>
  );
}

function StoresStack({ navigation, route }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const { t } = React.useContext(LocalizationContext);

  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });

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
            sourceScreen='CartStores'
          />
        ),
      }}
    >
      <Stack.Screen
        name='Stores'
        options={{ title: t('Stores') }}
        component={StoresScreen}
      />
      <Stack.Screen
        name='Store'
        options={({ route }) => ({ title: route.params.name })}
        component={StoreScreen}
      />
      <Stack.Screen
        name='CartStores'
        options={{
          title: 'Your cart',
          headerRight: null,
        }}
        component={CartScreen}
      />
      <Stack.Screen
        name='CheckOutStack'
        options={{ title: 'Your cart', headerRight: null, headerShown: false }}
        component={CheckOutStack}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ navigation }) {
  const { state } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      // initialRouteName='Register'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: 'transparent',
          elevation: 0,
        },
        // Header text color
        headerTintColor: '#fff',
        // headerRight: (props) => (
        //   <CartButton
        //     navigation={navigation}
        //     state={state}
        //     sourceScreen='CartCat'
        //   />
        // ),
      }}
    >
      <Stack.Screen
        name='Profile'
        options={{ title: 'Profile' }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export function AuthStack({ navigation }) {
  const { state } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      // initialRouteName='Register'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: 'transparent',
          elevation: 0,
        },
        // Header text color
        headerTintColor: '#fff',
        // headerRight: (props) => (
        //   <CartButton
        //     navigation={navigation}
        //     state={state}
        //     sourceScreen='CartCat'
        //   />
        // ),
      }}
    >
      <Stack.Screen
        name='Login'
        options={{ title: 'Login', headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name='Register'
        options={{ title: 'Register' }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name='ForgotPassword'
        options={{ title: 'Forgot password' }}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <BottomTab.Navigator
      tabBarPosition='bottom'
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
        name='Home'
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarVisible: true,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-home' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Stores'
        component={StoresStack}
        options={{
          title: 'Stores',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-apps' />
          ),
          headerStyle: {
            backgroundColor: Colors.headerBG,
          },
        }}
      />
      <BottomTab.Screen
        name='Categories'
        component={CategoriesStack}
        options={{
          title: 'Categories',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-book' />
          ),
        }}
      />

      <BottomTab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-person' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export const RootNavigator = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.isLoading ? (
        <Stack.Screen name='Loading' component={LoadingScreen} />
      ) : state.userToken ? (
        <Stack.Screen name='Home' component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name='Auth' component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

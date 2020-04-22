import * as React from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

//Custome
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import CartButton from '../components/CartButton';

import {
  StoreContext,
  LocalizationContext,
} from '../context/cartContext/provider';

//Screens
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import StoresScreen from '../screens/StoresScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
import ManageAddressScreen from '../screens/ManageAddressScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeliveryOrdersScreen from '../screens/delivery/DeliveryOrdersScreen';
import DeliveryTabs from './DeliveryNavigator';
import ChatScreen from '../screens/ChatScreen';

const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Home';

function HomeStack({ navigation, route }) {
  const { t } = React.useContext(LocalizationContext);

  const { state } = React.useContext(StoreContext);

  // console.log('route.state', route.state);
  let routeName = route.state?.routeNames[route.state.index] || '';
  // console.log('routeName', routeName);

  navigation.setOptions({});

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
        name='Store'
        options={({ route }) => ({
          title: route.params.item.name,
          headerShown: false,
          header: null,
        })}
        component={StoreScreen}
      />
    </Stack.Navigator>
  );
}

function CategoriesStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
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
            sourceScreen='CartCat'
          />
        ),
      }}
    >
      <Stack.Screen
        name='Categories'
        options={{ title: t('Categories') }}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name='Category'
        options={({ route }) => ({ title: route.params.item.name })}
        component={CategoryScreen}
      />
      {/* <Stack.Screen
        name='CartCat'
        options={{ title: 'Your cart', headerRight: null }}
        component={CartScreen}
      /> */}
    </Stack.Navigator>
  );
}

function StoresStack({ navigation, route }) {
  const { t } = React.useContext(LocalizationContext);
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
        options={({ route }) => ({
          title: route.params.item.name,
          headerShown: false,
          header: null,
        })}
        component={StoreScreen}
      />
      {/* <Stack.Screen
        name='CartStores'
        options={{
          title: 'Your cart',
          headerRight: null,
        }}
        component={CartScreen}
      /> */}
    </Stack.Navigator>
  );
}

function ProfileStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
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
        options={{ title: t('Account') }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name='EditProfile'
        options={{ title: 'Edit Profile' }}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name='ChangePassword'
        options={{ title: 'Change Password' }}
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name='Orders'
        options={{ title: 'Orders' }}
        component={OrdersScreen}
      />
      <Stack.Screen
        name='OrderDetails'
        options={{ title: 'Order details' }}
        component={OrderDetailsScreen}
      />

      <Stack.Screen
        name='Address'
        options={{
          title: 'Addresses',
        }}
        component={AddressesScreen}
      />
      <Stack.Screen
        name='ManageAddress'
        options={{ title: 'Manage address' }}
        component={ManageAddressScreen}
      />

      <Stack.Screen
        name='ContactUs'
        options={{ title: 'ContactUs' }}
        component={ContactUsScreen}
      />
      <Stack.Screen
        name='AboutUs'
        options={{ title: 'About Us' }}
        component={AboutUsScreen}
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
        options={{ title: 'Register', headerShown: false }}
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

function CartStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: 'transparent',
          borderBottomWidth: 0,
          elevation: 0,
        },
        //Header text color
        headerTintColor: '#fff',
        headerRight: (props) => (
          <Ionicons
            name='md-close'
            size={26}
            color='#fff'
            style={{ marginHorizontal: 15 }}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name='Cart'
        options={{
          title: 'Your cart',
          // headerRight: null,
        }}
        component={CartScreen}
      />

      <Stack.Screen
        name='Address'
        options={{
          title: 'Select address',
        }}
        component={AddressesScreen}
      />
      <Stack.Screen
        name='ManageAddress'
        options={{ title: 'Manage address' }}
        component={ManageAddressScreen}
      />
      <Stack.Screen
        name='Payment'
        options={{ title: 'Payment' }}
        component={PaymentScreen}
      />
      <Stack.Screen
        name='OrderDetails'
        options={{ title: 'Order details' }}
        component={OrderDetailsScreen}
      />
    </Stack.Navigator>
  );
}

function UserTabs() {
  const { t } = React.useContext(LocalizationContext);
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
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeStack}
        options={{
          title: t('Home'),

          tabBarIcon: ({ focused }) => {
            const icon = focused
              ? require('../../assets/images/appIcon.png')
              : require('../../assets/images/appIcon2.png');
            return (
              <Image
                style={{ height: 22, width: 22, marginBottom: -3 }}
                resizeMode='contain'
                source={icon}
              />
            );
            // <TabBarIcon focused={focused} name='md-home' />
          },
        }}
      />
      <BottomTab.Screen
        name='Stores'
        component={StoresStack}
        options={{
          title: t('Stores'),
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
          title: t('Categories'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-book' />
          ),
        }}
      />

      {/* <BottomTab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          title: t('Chat'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-person' />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          title: t('Account'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-person' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default RootNavigator = () => {
  const {
    state: { isLoading, userToken, isDelivery },
  } = React.useContext(AuthContext);
  console.log({ isLoading, userToken, isDelivery });
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoading ? (
        <Stack.Screen name='Loading' component={LoadingScreen} />
      ) : userToken && !isDelivery ? (
        <Stack.Screen name='Home' component={UserTabs} />
      ) : userToken && isDelivery ? (
        <Stack.Screen name='Home' component={DeliveryTabs} />
      ) : (
        <Stack.Screen name='Auth' component={AuthStack} />
      )}
      <Stack.Screen
        name='Cart'
        options={{ headerRight: null }}
        component={CartStack}
      />
      <Stack.Screen
        name='Chat'
        options={{ title: 'Chat' }}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

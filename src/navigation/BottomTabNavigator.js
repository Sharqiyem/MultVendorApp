import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//Custome
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import CartButton from '../components/CartButton';
//Screens
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import DetailsScreen from '../screens/DetailsScreen';
import StoresScreen from '../screens/StoresScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { StoreContext } from '../context/provider';

const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Home';

// const CartBtn = ({ navigation, state }) => (
//   <TouchableOpacity
//     style={{
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginHorizontal: 10,
//     }}
//     onPress={() => navigation.navigate('Details')}
//   >
//     <Text>Cart {state.cartCount}</Text>
//   </TouchableOpacity>
// );

function HomeStack({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
        },
        //Header text color
        headerTintColor: '#fff',
        headerRight: (props) => (
          <CartButton navigation={navigation} state={state} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        options={{ title: 'Details', headerRight: null }}
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
}

function CategoriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
        },
        //Header text color
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Links"
        options={{ title: 'Categories' }}
        component={LinksScreen}
      />
      {/* <Stack.Screen
        name="Details"
        options={{ title: 'Details' }}
        component={DetailsScreen}
      /> */}
    </Stack.Navigator>
  );
}
function StoresStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
        },
        //Header text color
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Links"
        options={{ title: 'Stores' }}
        component={LinksScreen}
      />
      {/* <Stack.Screen
        name="Details"
        options={{ title: 'Details' }}
        component={DetailsScreen}
      /> */}
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
          backgroundColor: Colors.tabBarBG,
          paddingBottom: 20,
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
        name="Links"
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

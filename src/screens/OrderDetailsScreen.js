import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { RadioButtons, ExProductCycleList } from '../components/index';
import getStyle from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function OrderDetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[getStyle().textHeader, { margin: 20 }]}>Order details</Text>

      <View style={{}}>
        <ExProductCycleList />
      </View>
      <View style={{ flex: 1, margin: 20 }}>
        <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
          <Text>Order ID</Text>
          <Text>#65656</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={getStyle().textHeader}>Delivery</Text>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Address name:</Text>
            <Text>Home</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Address:</Text>
            <Text>23, jalan Tun Razak</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={getStyle().textHeader}>Details</Text>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Store name:</Text>
            <Text>Green Market</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Order date</Text>
            <Text>20-03-2020 19:00</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Total amount</Text>
            <Text>290$</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Status</Text>
            <Text>Completed</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={getStyle().textHeader}>Customer</Text>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Customer name:</Text>
            <Text>Home</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Tel:</Text>
            <Text>23123123132</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Payment method:</Text>
            <Text>Cash on delivery</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },
  orderDetailContainer: {
    marginVertical: 10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});

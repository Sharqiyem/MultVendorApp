import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Layout from '../constants/Layout';

export const ExCategoryCycleItem = () => {
  const item = {
    id: 1,
    brand: 'Citizen',
    title: 'Vegtables',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  };

  return <CategoryCycleItem item={item} />;
};
export const CategoryCycleItem = ({ item }) => (
  <View style={styles.container} key={item.id}>
    <View style={styles.itemTwoContainer}>
      <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
    </View>
    <Text style={styles.itemTwoTitle}>{item.title}</Text>
  </View>
);

const itemsPerRow = 3;
const margenHorizontal = 15;
const width =
  Layout.window.width / itemsPerRow - itemsPerRow * margenHorizontal;
const raduisWidth = width / 2;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: margenHorizontal,
    marginVertical: 5,
  },

  itemTwoContainer: {
    // paddingBottom: 10,
    backgroundColor: 'red',
    marginBottom: 2,
    width: width,
    // height: width,
    borderRadius: raduisWidth,
  },

  itemTwoTitle: {
    color: Colors.black,
    fontSize: 15,
    width: width,
    textAlign: 'center',
  },

  itemTwoImage: {
    width: '100%',
    height: width,
    borderRadius: raduisWidth,
  },
});

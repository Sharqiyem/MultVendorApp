import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Layout from '../constants/Layout';

export const ExProductCycleItem = () => {
  const item = {
    id: 1,
    brand: 'Citizen',
    title: 'CITIZEN',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  };

  return <ProductCycleItem item={item} />;
};
export const ProductCycleItem = ({ item }) => (
  <View style={styles.container} key={item.id}>
    <View style={styles.itemTwoContainer}>
      <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
    </View>
    <Text style={styles.itemTwoTitle}>{item.title}</Text>

    <TouchableOpacity
      style={styles.button}
      key={item.id}
      onPress={() => console.log({ item })}
    >
      <Text style={styles.btnText}>+</Text>
    </TouchableOpacity>
  </View>
);

const itemsPerRow = 3;
const margenHorizontal = 5;
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
  button: {
    position: 'absolute',
    top: -5,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderRightColor: 'red',
    borderRightWidth: 2,
    backgroundColor: Colors.primary,
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
    color: Colors.primary,
    fontFamily: Fonts.primaryBold,
    fontSize: 15,
  },
  btnText: {
    color: Colors.white,
    fontFamily: Fonts.primaryBold,
    fontSize: 28,
    alignSelf: 'center',
  },
  itemTwoSubTitle: {
    color: Colors.primary,
    fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: Colors.white,
    fontFamily: Fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    width: '100%',
    height: width,
    borderRadius: raduisWidth,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
});

import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export const ExListCardItem = () => {
  const item = {
    id: 1,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  };

  return <ListCardItem item={item} />;
};
export const ListCardItem = ({ item }) => (
  <TouchableOpacity
    key={item.id}
    style={styles.itemTwoContainer}
    onPress={() => console.log({ item })}
  >
    <View style={styles.itemTwoContent}>
      <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
      <View style={styles.itemTwoOverlay} />
      <Text style={styles.itemTwoTitle}>{item.title}</Text>
      <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
      <Text style={styles.itemTwoPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginBottom: 2,
    // marginTop: -2,
  },
  itemTwoContent: {
    padding: 20,
    paddingHorizontal: 30,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: Colors.white,
    fontFamily: Fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: Colors.white,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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

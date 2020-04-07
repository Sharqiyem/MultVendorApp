import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';

export const ExStoreDetailHeader = () => {
  const item = {
    id: 1,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    products: '12',
    reviews: '12',
    orders: '12',

    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  };

  return <StoreDetailHeader item={item} />;
};
export const StoreDetailHeader = ({ item }) => (
  <View
    key={item.id}
    style={styles.itemTwoContainer}
    // onPress={() => console.log({ item })}
  >
    <View style={styles.itemTwoContent}>
      <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
      <View style={styles.itemTwoOverlay} />
      <Text style={styles.itemTwoTitle}>{item.title}</Text>
      <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
      {/* <Text style={styles.itemTwoPrice}>{item.price}</Text> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-arround',
          alignItems: 'center',
          alignSelf: 'center',
          marginHorizontal: 5,
        }}
      >
        <Text style={{ color: Colors.white }}>Social Media : </Text>
        <Ionicons
          name='logo-facebook'
          size={25}
          style={{ marginHorizontal: 10 }}
          color={Colors.white}
        />
        <Ionicons
          name='logo-youtube'
          size={25}
          style={{ marginHorizontal: 10 }}
          color={Colors.white}
        />
        <Ionicons
          name='logo-instagram'
          size={25}
          style={{ marginHorizontal: 10 }}
          color={Colors.white}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 5,
          marginVertical: 10,
        }}
      >
        <Text style={styles.metaText}>Products {item.products}</Text>
        <Text style={styles.metaText}>Reviews {item.reviews}</Text>
        <Text style={styles.metaText}>Orders {item.orders}</Text>
      </View>
      <Text style={styles.addressTitle}>Address: 12 Tah str.</Text>
    </View>
  </View>
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
    // height: 150,
  },
  itemTwoTitle: {
    color: Colors.white,

    fontSize: 20,
    textAlign: 'center',
  },
  itemTwoSubTitle: {
    color: Colors.white,
    fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  addressTitle: {
    color: Colors.white,
    fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,

    textAlign: 'center',
  },
  itemTwoPrice: {
    color: Colors.white,

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
    opacity: 0.5,
  },
  metaText: {
    color: Colors.white,

    fontSize: 14,
    marginHorizontal: 10,
  },
});

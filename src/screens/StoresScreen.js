import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { StoreListItem } from '../components/index';
import productHooks from '../hooks/useGetDataByCollection';
import { LocalizationContext } from '../context/cartContext/provider';

export default function StoresScreen({ navigation }) {
  const [data, isLoading] = productHooks.useGetDataByCollection('stores');
  const { t, setLocale2 } = React.useContext(LocalizationContext);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 60,
          backgroundColor: Colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: Colors.white }}>Search your store</Text>
        </View>
      </View>
      {isLoading ? (
        <Text> Loading </Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <StoreListItem navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

StoresScreen.navigationOptions = {
  // header: null,
  // headerShown: false,
  title: 'sda',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import { StoreListItem, CategoryListItem } from '../components/index';
export default function CategoriesScreen({ navigation }) {
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
            width: 400,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: Colors.white }}>Search your category</Text>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <CategoryListItem navigation={navigation} />
        <CategoryListItem navigation={navigation} />
        <CategoryListItem navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

CategoriesScreen.navigationOptions = {
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

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { Logo } from "../components";

import getStyle from "../constants/styles";

import Layout from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../config/firebase.config";
import { AuthContext } from "../context/authContext/provider";
import FirebaseAuth from "../services/firebaseAuth";

export default function EditProfileScreen({ navigation }) {
  const { state, updateUser } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState(state.userData.email);
  const [name, setName] = React.useState(state?.userData?.name);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleEditProfile = () => {
    setIsLoading(true);
    setError("");

    FirebaseAuth.editProfile(name)
      .then(() => {
        alert("Profile was changed successfully");
        setIsLoading(false);
        updateUser({ name });
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, margin: 20 }}>
        <TextInput
          style={getStyle().textInput}
          placeholder="Name"
          placeholderStyle={{ textAlign: "center" }}
          onChangeText={(text) => setName(text)}
          value={name}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {/* <TextInput
          style={getStyle().textInput}
          placeholder='Email'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCorrect={false}
          autoCapitalize='none'
        /> */}

        <TouchableOpacity
          onPress={handleEditProfile}
          style={getStyle().buttonPrimary}
        >
          <Text style={{ textAlign: "center", color: Colors.white }}>SAVE</Text>
        </TouchableOpacity>
        {isLoading && (
          <ActivityIndicator
            style={{
              alignSelf: "center",
              width: Layout.window.width,
            }}
            size={"large"}
            color={Colors.primary}
          />
        )}
        {error ? <Text style={getStyle().error}>{error}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },

  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    // backgroundColor: '#fbfbfb',
    paddingVertical: 30,
  },
});

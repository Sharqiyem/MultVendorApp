import * as React from "react";
import { View, Image } from "react-native";
import ResponsiveImage from "react-native-responsive-image";

const logo = require("../../assets/images/logo.png");

const Logo = ({ style }) => {
  return (
    <View style={[{ alignItems: "center" }, style]}>
      <View
        style={{
          height: 120,
          width: 120,
          // backgroundColor: '',
        }}
      >
        <Image
          style={{
            alignContent: "center",
            height: "100%",
            width: "100%",

            // borderColor: 'red',
            // borderWidth: 1,
            // marginVertical: 10,
          }}
          initWidth="100"
          initHeight="100"
          resizeMode="contain"
          source={logo}
        />
      </View>
    </View>
  );
};

export default Logo;

import React, { useRef, useEffect } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import LottieView from "lottie-react-native";

import Colors from "../../constants/Colors";

const animPath = require("../../../assets/anime/logo-data.json");

const AnimationScreen = ({ onFinished }) => {
  const ref = useRef(null);

  useEffect(() => {
    // ref.current.reset();
    ref.current.play();
  }, []);

  const resetAnimation = () => {
    ref.current.reset();
    ref.current.play(120);
  };
  console.log("Animation Screen");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
      }}
    >
      <LottieView
        loop={false}
        onAnimationFinish={onFinished}
        ref={ref}
        // ref={animation => {
        //   this.animation = animation;
        // }}
        style={{
          // width: 400,
          // height: 400,
          // backgroundColor: '#04D4C4'
          backgroundColor: Colors.primary,
        }}
        source={animPath}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
      {/* <Button title='Restart Animation' onPress={resetAnimation} /> */}

      {/* <ActivityIndicator size='large' color={Colors.white} /> */}
      {/* <Text>Loading</Text> */}
    </View>
  );
};

export default AnimationScreen;

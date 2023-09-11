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
        style={{
          backgroundColor: Colors.primary,
        }}
        source={animPath}
      />
    </View>
  );
};

export default AnimationScreen;

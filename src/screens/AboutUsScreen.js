import React from "react";
import { View, Text } from "react-native";
import { LocalizationContext } from "../context/cartContext/provider";
import { Logo } from "../components";
import getStyle from "../constants/styles";

const AboutUsScreen = () => {
  const { t } = React.useContext(LocalizationContext);

  return (
    <View>
      <Logo style={{ marginTop: 100, marginBottom: 20 }} />
      <Text
        style={[
          getStyle().text,
          {
            marginVertical: 10,
            marginHorizontal: 20,
            // textAlign: "justify",
            lineHeight: 25,
          },
        ]}
      >
        {t("about text")}
      </Text>
    </View>
  );
};

export default AboutUsScreen;

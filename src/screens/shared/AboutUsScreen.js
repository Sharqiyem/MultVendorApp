import React from "react";
import { View, Text } from "react-native";
import { LocalizationContext } from "../../context/cartContext/provider";
import { Logo } from "../../components";
import getStyle from "../../constants/styles";

const AboutUsScreen = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { text } = getStyle(locale === "ar");

  return (
    <View>
      <Logo style={{ marginVertical: 20 }} />
      <Text
        style={[
          text,
          {
            marginVertical: 10,
            marginHorizontal: 15,
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

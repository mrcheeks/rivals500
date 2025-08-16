import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface SpacerProps {
    size?: number;
}

const Logo = ({ size = 120 }: SpacerProps) => {
  return (
    <View>
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: size, height: size }}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});

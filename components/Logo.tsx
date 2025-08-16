import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View>
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 250, height: 182}}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});

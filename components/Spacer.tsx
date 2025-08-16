import { View } from "react-native";
import React from "react";

interface SpacerProps {
    height?: number;
}

const Spacer: React.FC<SpacerProps> = ({ height = 10 }) => {
  return (
    <View style={{ width: '100%', height: height}}></View>
  );
};

export default Spacer;


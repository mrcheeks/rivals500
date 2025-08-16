import { COLOURS } from "@/theme/colours";
import React from "react";
import { StyleSheet, Text, View, Pressable, PressableProps } from "react-native";
import Svg, { Circle, Rect, Path } from 'react-native-svg';

interface ButtonProps extends PressableProps {
    disabled: boolean;
}

const GoogleBtn: React.FC<ButtonProps> = ({onPress, disabled = false, }) => {
  return (
    <View style={styles.buttonContainer}>
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? COLOURS.white2nd : COLOURS.white },
            ]}
            onPress={onPress}
            >
            
            <Svg width="24" height="25" viewBox="0 0 24 25">
              <Rect width="24" height="24" transform="translate(0 0.537109)" fill="white"/>
              <Path fill-rule="evenodd" clip-rule="evenodd" d="M23.04 12.7985C23.04 11.983 22.9668 11.1989 22.8309 10.4462H12V14.8946H18.1891C17.9225 16.3321 17.1123 17.5501 15.8943 18.3655V21.251H19.6109C21.7855 19.2489 23.04 16.3007 23.04 12.7985Z" fill="#4285F4"/>
              <Path fill-rule="evenodd" clip-rule="evenodd" d="M12 24.0369C15.105 24.0369 17.7081 23.0072 19.6109 21.2508L15.8943 18.3654C14.8645 19.0554 13.5472 19.4631 12 19.4631C9.00474 19.4631 6.46951 17.4401 5.56519 14.7219H1.72314V17.7015C3.61542 21.4599 7.50451 24.0369 12 24.0369Z" fill="#34A853"/>
              <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.56523 14.7222C5.33523 14.0322 5.20455 13.2951 5.20455 12.5372C5.20455 11.7792 5.33523 11.0422 5.56523 10.3522V7.37263H1.72318C0.944318 8.92513 0.5 10.6815 0.5 12.5372C0.5 14.3929 0.944318 16.1492 1.72318 17.7017L5.56523 14.7222Z" fill="#FBBC05"/>
              <Path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.61097C13.6884 5.61097 15.2043 6.1912 16.3961 7.33075L19.6945 4.03234C17.7029 2.17665 15.0997 1.03711 12 1.03711C7.50451 1.03711 3.61542 3.61415 1.72314 7.37256L5.56519 10.3521C6.46951 7.63393 9.00474 5.61097 12 5.61097Z" fill="#EA4335"/>
            </Svg>
            
            <Text style={styles.text}>Continue with Google</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
  },
  button: {
    columnGap: 15,
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: COLOURS.mediumGrey
  },
});

export default GoogleBtn;

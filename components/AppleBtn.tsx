import { COLOURS } from "@/theme/colours";
import React from "react";
import { StyleSheet, Text, View, Pressable, PressableProps } from "react-native";
import Svg, { Circle, Rect, Path, G, ClipPath, Defs } from 'react-native-svg';

interface ButtonProps extends PressableProps {
    disabled: boolean;
}

const AppleBtn: React.FC<ButtonProps> = ({onPress, disabled = false, }) => {
  return (
    <View style={styles.buttonContainer}>
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? COLOURS.darkGrey : COLOURS.black },
            ]}
            onPress={onPress}
            >

            <Svg width="24" height="25" viewBox="0 0 24 25">
                <G clip-path="url(#clip0_198_1987)">
                <Rect width="24" height="24" transform="translate(0 0.537109)" fill="black"/>
                <Path d="M21.2806 18.9611C20.9327 19.7646 20.521 20.5043 20.044 21.1844C19.3938 22.1114 18.8614 22.7531 18.4511 23.1095C17.815 23.6944 17.1336 23.994 16.4039 24.011C15.88 24.011 15.2482 23.8619 14.5128 23.5595C13.775 23.2585 13.0969 23.1095 12.4769 23.1095C11.8267 23.1095 11.1293 23.2585 10.3834 23.5595C9.63638 23.8619 9.03456 24.0195 8.57444 24.0351C7.87466 24.0649 7.17716 23.7569 6.48093 23.1095C6.03656 22.7219 5.48075 22.0575 4.8149 21.1162C4.10051 20.1111 3.51317 18.9455 3.05304 17.6166C2.56026 16.1813 2.31323 14.7914 2.31323 13.4458C2.31323 11.9044 2.6463 10.575 3.31342 9.46096C3.83772 8.56612 4.53522 7.86024 5.4082 7.34205C6.28118 6.82385 7.22443 6.55979 8.24024 6.54289C8.79605 6.54289 9.52493 6.71482 10.4307 7.05271C11.3339 7.39174 11.9139 7.56366 12.1681 7.56366C12.3582 7.56366 13.0025 7.36263 14.0947 6.96185C15.1275 6.59017 15.9992 6.43627 16.7133 6.49689C18.6484 6.65306 20.1022 7.41587 21.069 8.79015C19.3384 9.83875 18.4823 11.3074 18.4993 13.1915C18.515 14.6591 19.0474 15.8803 20.0937 16.85C20.5679 17.3 21.0974 17.6479 21.6866 17.8949C21.5588 18.2654 21.4239 18.6204 21.2806 18.9611ZM16.8425 1.49725C16.8425 2.64751 16.4223 3.72151 15.5847 4.71559C14.5738 5.89735 13.3512 6.58023 12.0253 6.47248C12.0084 6.33448 11.9986 6.18924 11.9986 6.03663C11.9986 4.93238 12.4793 3.75061 13.333 2.78436C13.7592 2.29512 14.3013 1.88833 14.9586 1.56383C15.6145 1.24417 16.2349 1.06739 16.8184 1.03712C16.8354 1.19089 16.8425 1.34467 16.8425 1.49723V1.49725Z" fill="white"/>
                </G>
                <Defs>
                <ClipPath id="clip0_198_1987">
                <Rect width="24" height="24" fill="white" transform="translate(0 0.537109)"/>
                </ClipPath>
                </Defs>
            </Svg>
            
            <Text style={styles.text}>Continue with Apple</Text>
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
    color: COLOURS.white
  },
});

export default AppleBtn;

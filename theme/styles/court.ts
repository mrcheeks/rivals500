import { ScaledSheet } from "react-native-size-matters";
import { COLOURS } from "../colours";
import { Platform } from "react-native";

const court = ScaledSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: COLOURS.appBkgColour,
    },
});

export default court;

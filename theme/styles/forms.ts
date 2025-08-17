import { Platform } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const forms = ScaledSheet.create({
  formHeader: {
      marginBottom: 32,
      alignItems: "center",
    },
    formTitle: {
      fontSize: 24,
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: 8,
    },
    titleUnderline: {
      width: 100,
      height: 3,
      backgroundColor: "#ff0000",
      borderRadius: 2,
    },
    inputContainer: {
      marginBottom: 24,
    },
    inputWrapper: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: "#efefef",
      marginBottom: 8,
      marginLeft: 4,
    },
    input: {
      borderWidth: 2,
      borderColor: "#3d3d3d",
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      backgroundColor: "#000000",
      color: "#ffffff",
    },
    inputFocused: {
      borderColor: "#7c7c7cff",
      backgroundColor: "#000000",
      ...Platform.select({
        web: {
          boxShadow: "0px 0px 0px 2px rgba(234, 102, 102, 0.5)",
        },
        default: {
          shadowColor: "#ff0000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
      }),
    },
});

export default forms;

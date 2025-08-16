import { ScaledSheet } from "react-native-size-matters";
import { COLOURS } from "../colours";

const modal = ScaledSheet.create({
  modalContainer: {
    justifyContent: "center",
    backgroundColor: COLOURS.black,
    width: "100%",
    height: "100%",
    paddingVertical: "16@s",
    paddingHorizontal: "16@s",
  },
  modalContainerLand: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: COLOURS.black,
    width: "100%",
    height: "100%",

  },
  modalInner: {
    alignSelf: "center",
    maxWidth: "90%",
    minWidth: "80%",
    paddingVertical: "16@s",
    paddingHorizontal: "32@s",
    backgroundColor: COLOURS.appBkgColour,
    borderWidth: 1,
    borderColor: COLOURS.inputBorder,
    borderRadius: 6,
  },
  modalInnerLand: {
    alignSelf: "center",
    maxWidth: "90%",
    minWidth: "80%",
    paddingVertical: "16@s",
    paddingHorizontal: "32@s",
    backgroundColor: COLOURS.appBkgColour,
    borderWidth: 1,
    borderColor: COLOURS.inputBorder,
    borderRadius: 6,
  },
});

export default modal;

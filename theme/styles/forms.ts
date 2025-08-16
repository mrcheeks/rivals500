import { ScaledSheet } from "react-native-size-matters";
import { COLOURS } from "../colours";

const forms = ScaledSheet.create({
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOURS.lightGrey,
    padding: 10,
    color: COLOURS.white2nd,
    backgroundColor: COLOURS.inputBkg,
  },
  error: {
    color: COLOURS.lightGrey,
    fontSize: 12,
    marginBottom: 12,
  },
  errorInput: {
    borderColor: "red",
  },
  checkbox: {
    margin: 8,
    width: 30,
    height: 30,
  },
  datePicker: {
    height: 120,
    margin: -10,
  },
  dropdownButtonStyle: {
    height: "50@s",
    backgroundColor: COLOURS.inputBkg,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOURS.lightGrey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginVertical: 4
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    color: COLOURS.white2nd,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: COLOURS.white2nd,
  },
  dropdownMenuStyle: {
    backgroundColor: COLOURS.inputBkg,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: COLOURS.white2nd,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: COLOURS.white2nd,
  },
});

export default forms;

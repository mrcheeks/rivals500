import { ScaledSheet } from "react-native-size-matters";
import { COLOURS } from "../colours";

const main = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLOURS.appBkgColour,
  },
  containerPadding: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  containerScroll: {
    paddingTop: 28,
    paddingBottom: 60,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLOURS.appBkgColour,
  },
  mainInfoContainer: {
    backgroundColor: COLOURS.black,
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  spinner: {
    marginTop: 10,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "500",
    color: COLOURS.white,
    paddingBottom: 6,
  },
  title: {
    marginTop: "10@s",
    marginBottom: "20@s",
    color: COLOURS.white,
    textAlign: "center",
    fontSize: "18@s",
    fontWeight: "bold",
  },
  pTextLeft: {
    color: COLOURS.white,
    textAlign: "left",
    fontSize: "14@ms",
    paddingBottom: "5@ms",
  },
  textLeft:{
    textAlign: "left",
  },
  pTextCenter: {
    color: COLOURS.white,
    textAlign: "center",
    fontSize: "14@ms",
    paddingBottom: "12@ms",
  },
  textLabel: {
    color: COLOURS.lightGrey,
    marginLeft: 8,
    marginTop: 10,
    textAlign: "left",
    fontSize: "14@ms",
    paddingBottom: "5@ms",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOURS.inputBorder,
    padding: 10,
    color: COLOURS.white2nd,
    backgroundColor: COLOURS.inputBkg,
  },
  rowStart: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignContent: "space-between",
  },
  rowSpacedCentred: {
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "space-around",
  },
  spacer: {
    paddingHorizontal: 8,
  },
  column: {
    justifyContent: "flex-start",
    flexDirection: "column",
    alignContent: "space-between",
  },
  blackPtext: {
    color: COLOURS.black,
    textAlign: "left",
    fontSize: "14@ms",
  },
  buttonRow: {
    paddingVertical: "10@s",
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "space-between",
  },
  error: {
    color: COLOURS.lightGrey,
    fontSize: 12,
    marginBottom: 12,
  },
  errorInput: {
    borderColor: "red",
  },
  cameraButton: {
    width: "80@s",
    margin: "auto",
    backgroundColor: COLOURS.red,
    borderRadius: 30,
    paddingVertical: 8,
    marginVertical: 16,
    textAlign: "center",
  },
  flexColumn: {
    flexDirection: "column",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  textSmall: {
    fontSize: "10@ms",
  },
  textMedium: {
    fontSize: "12@ms",
  },
  logo: {
    width: "50@s",
    height: "50@s",
    marginBottom: "10@s",
  }
});

export default main;

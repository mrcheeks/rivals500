import { Platform } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLOURS } from "../colours";

const main = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  containerCentred: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.appBkgColour,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  welcomeSection: {
    marginBottom: 40,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 22,
  },
  cardContainer: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    marginHorizontal: 4,
    ...Platform.select({
      web: {
        boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
      },
    }),
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#ff0000",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 8px rgba(234, 102, 102, 0.5)",
      },
      default: {
        shadowColor: "#ff0000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  secondaryButtonText: {
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "600",
  },
  pTextCenter: {
    color: COLOURS.white,
    textAlign: "center",
    fontSize: "14@ms",
    paddingBottom: "12@ms",
  },
  introText: {
    fontSize: 18,
    color: "#efefef",
    textAlign: "center",
    marginBottom: 16,
  },
  switchMode: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 8,
  },
  switchModeText: {
    fontSize: 14,
    color: "#efefef",
  },
  switchModeLink: {
    color: "#ff0000",
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  orText: {
    fontSize: 12,
    color: "#efefef",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 18,
  },
  userInfo: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#ff0000",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
    marginTop: 16,
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 8px rgba(234, 102, 102, 0.3)",
      },
      default: {
        shadowColor: "#ff0000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      },
    }),
    color: "#FFFFFF",
    fontSize: 16,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default main;

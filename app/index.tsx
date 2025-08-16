import { useSession } from '@/providers/SessionProvider';
import { COLOURS } from '@/theme/colours';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Logo from '@/components/Logo';
import Spacer from '@/components/Spacer';
import main from '@/theme/styles/main';
import React, { useState } from 'react';

export default function Home() {
  const { User,  mode, checkingUser, setMode, handleAuth, handleLogout } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  if (checkingUser) {
    return null;
  }

  if(mode === 'pending') {
    return (
      <SafeAreaView style={styles.containerCentred}>
        <Logo size={200} />
        <Spacer height={60} />
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.introText}>
              {"Welcome to Rivals 500, the 500 score tracker. Never lose track of your Rivals."}
          </Text>
          <Spacer height={20} />
          <TouchableOpacity
            style={[
              styles.primaryButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={() => setMode("signup")}
          >
            <Text style={styles.primaryButtonText}>
              {"Create Account"}
            </Text>
          </TouchableOpacity>
          <Spacer height={20} />
          <TouchableOpacity
            style={[
              styles.secondaryButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={() => setMode("login")}
          >
            <Text style={styles.secondaryButtonText}>
              {"Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if(mode === 'login' || mode === 'signup') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.containerCentred}>
        <Logo />
        <Spacer height={40} />
        <View>
          {/* Form Header */}
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>
              {mode === "login" ? "Sign In" : "Create Account"}
            </Text>
            <View style={styles.titleUnderline} />
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "email" && styles.inputFocused,
                ]}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "password" && styles.inputFocused,
                ]}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={() => handleAuth(email, password, name)}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Mode Switch */}
          <TouchableOpacity
            style={styles.switchMode}
            onPress={() => setMode(mode === "login" ? "signup" : "login")}
          >
            <Text style={styles.switchModeText}>
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Text style={styles.switchModeLink}>
                {mode === "login" ? "Sign Up" : "Sign In"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
  
  return (
    <>
      <SafeAreaView style={styles.containerCentred}>
        <Logo />
        <Spacer height={60} />
        <Text style={main.pTextCenter}>Hello, {User?.name || User?.email || "User"}!</Text>
        <Text style={styles.switchModeLink} onPress={handleLogout}>
                Log Out
            </Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
    maxWidth: 400,
  },
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
    width: 40,
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
    color: "#3d3d3d",
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

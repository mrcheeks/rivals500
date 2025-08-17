import { useSession } from '@/providers/SessionProvider';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Logo from '@/components/Logo';
import Spacer from '@/components/Spacer';
import forms from '@/theme/styles/forms';
import main from '@/theme/styles/main';
import { router } from 'expo-router';
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
      <SafeAreaView style={main.containerCentred}>
        <Logo size={200} />
        <Spacer height={60} />
        <View style={{paddingHorizontal: 20}}>
          <Text style={main.introText}>
              {"Welcome to Rivals 500"}
          </Text>
          <Text style={main.introText}>
              {"The 500 score tracker.\nNever lose track of your Rivals."}
          </Text>
          <Spacer height={20} />
          <TouchableOpacity
            style={[
              main.primaryButton,
              loading && main.buttonDisabled,
            ]}
            onPress={() => setMode("signup")}
          >
            <Text style={main.primaryButtonText}>
              {"Create Account"}
            </Text>
          </TouchableOpacity>
          <Spacer height={20} />
          <TouchableOpacity
            style={[
              main.secondaryButton,
              loading && main.buttonDisabled,
            ]}
            onPress={() => setMode("login")}
          >
            <Text style={main.secondaryButtonText}>
              {"Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if(mode === 'login' || mode === 'signup') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={main.containerCentred}>
        <Logo />
        <Spacer height={40} />
        <View>
          {/* Form Header */}
          <View style={forms.formHeader}>
            <Text style={forms.formTitle}>
              {mode === "login" ? "Sign In" : "Create Account"}
            </Text>
            <View style={forms.titleUnderline} />
          </View>

          {/* Input Fields */}
          <View style={forms.inputContainer}>
            {mode === 'signup' && (
              <View style={forms.inputWrapper}>
                <Text style={forms.inputLabel}>Name</Text>
                <TextInput
                  style={[
                    forms.input,
                    focusedInput === "name" && forms.inputFocused,
                ]}
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="default"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            )}
            <View style={forms.inputWrapper}>
              <Text style={forms.inputLabel}>Email Address</Text>
              <TextInput
                style={[
                  forms.input,
                  focusedInput === "email" && forms.inputFocused,
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

            <View style={forms.inputWrapper}>
              <Text style={forms.inputLabel}>Password</Text>
              <TextInput
                style={[
                  forms.input,
                  focusedInput === "password" && forms.inputFocused,
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
              main.primaryButton,
              loading && main.buttonDisabled,
            ]}
            onPress={() => handleAuth(email, password, name)}
            disabled={loading}
          >
            <Text style={main.primaryButtonText}>
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Mode Switch */}
          <TouchableOpacity
            style={main.switchMode}
            onPress={() => setMode(mode === "login" ? "signup" : "login")}
          >
            <Text style={main.switchModeText}>
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Text style={main.switchModeLink}>
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
      <SafeAreaView style={main.containerCentred}>
        <Logo />
        <Spacer height={20} />
        {User?.name ? (
          <Text style={main.introText}>Hello, {User?.name}!</Text>
        ) : (
          <Text style={main.introText}>Welcome!</Text>
        )}

        <View style={{paddingHorizontal: 20}}>
          <Spacer height={30} />
          <TouchableOpacity
            style={[
              main.primaryButton,
              loading && main.buttonDisabled,
            ]}
            onPress={() => {
              router.push({ pathname: "/GameList" });
            }}
          >
            <Text style={main.primaryButtonText}>
              {"View Current Games"}
            </Text>
          </TouchableOpacity>
          <Spacer height={10} />
          <TouchableOpacity
            style={[
              main.secondaryButton,
              loading && main.buttonDisabled,
            ]}
            onPress={() => {
              router.push({ pathname: "/TeamList" });
            }}
          >
            <Text style={main.secondaryButtonText}>
              {"View Current Teams"}
            </Text>
          </TouchableOpacity>
          
        </View>
        <Spacer height={30} />
        <Text style={main.switchModeLink} onPress={handleLogout}>
                Log Out
            </Text>
      </SafeAreaView>
    </>
  );
}

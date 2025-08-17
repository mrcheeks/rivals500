import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import forms from "@/theme/styles/forms";
import main from "@/theme/styles/main";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [teamMate, setTeamMate] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createTeam = async (name: string, mate: string) => {
    console.log("Creating team with name:", name, "and mate:", mate);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={main.containerCentred}>
        <Logo />
        <Spacer height={40} />
        <View>
          {/* Form Header */}
          <View style={forms.formHeader}>
            <Text style={forms.formTitle}>
              {"Create a Team"}
            </Text>
            <View style={forms.titleUnderline} />
          </View>

          {/* Input Fields */}
          <View style={forms.inputContainer}>
            
              <View style={forms.inputWrapper}>
                <Text style={forms.inputLabel}>Team Name</Text>
                <TextInput
                  style={[
                    forms.input,
                    focusedInput === "teamName" && forms.inputFocused,
                ]}
                placeholder="Enter your teamName"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="default"
                value={teamName}
                onChangeText={setTeamName}
                onFocus={() => setFocusedInput("teamName")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            
            <View style={forms.inputWrapper}>
              <Text style={forms.inputLabel}>Team Mate</Text>
              <TextInput
                style={[
                  forms.input,
                  focusedInput === "teamMate" && forms.inputFocused,
                ]}
                placeholder="Enter your team mate's name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="default"
                value={teamMate}
                onChangeText={setTeamMate}
                onFocus={() => setFocusedInput("teamMate")}
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
            onPress={() => createTeam(teamName, teamMate)}
            disabled={loading}
          >
            <Text style={main.primaryButtonText}>
              {loading
                ? "Please wait..."
                : "Create your Team"}
            </Text>
          </TouchableOpacity>

          
        </View>
      </KeyboardAvoidingView>
  );
}
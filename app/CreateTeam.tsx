import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { createTeam } from "@/providers/database/teams";
import { useSession } from "@/providers/SessionProvider";
import forms from "@/theme/styles/forms";
import main from "@/theme/styles/main";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateTeam() {
  const { User, reloadPlayer } = useSession();
  const [teamName, setTeamName] = useState("");
  const [teamMate, setTeamMate] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTeam = async (name: string, mate: string) => {
    if(!User){
      alert("You must be logged in to create a team.");
      return;
    }
    if (!name || !mate) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      const response = await createTeam(name, User.id, mate);
      console.log("Team created:", response);
      alert(`Team ${name} with mate ${mate} created successfully!`);
      // Reset form
      setTeamName("");
      setTeamMate("");
      reloadPlayer();
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Failed to create team. Please try again.");
    } finally {
      setLoading(false);
    }
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
            onPress={() => handleTeam(teamName, teamMate)}
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
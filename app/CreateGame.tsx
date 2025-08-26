import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { createGame } from "@/providers/database/games";
import { useSession } from "@/providers/SessionProvider";
import forms from "@/theme/styles/forms";
import main from "@/theme/styles/main";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function CreateGame() {
  const { User, reloadPlayer} = useSession();
  const [gameName, setGameName] = useState("");
  const [myteam, setMyTeam] = useState("");
  const [opponent, setOpponent] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [teamValue, setTeamValue] = useState(null);
  const [teams, setTeams] = useState<{ label: string; value: string }[]>([]);

  const handleGame = async (name: string, myteam: string, opponent: string) => {
      if(!User){
        alert("You must be logged in to create a game.");
        return;
      }
      if (!gameName || !teamValue || !opponent) {
        alert("Please fill in all fields.");
        return;
      }
  
      setLoading(true);
      try {
        // Simulate API call
        const response = await createGame(gameName, User.id, teamValue, opponent, true);
        console.log("Game created:", response);
        alert(`Game: ${gameName} with opponent ${opponent} created successfully!`);
        // Reset form
        setGameName("");
        setOpponent("");
        reloadPlayer();
      } catch (error) {
        console.error("Error creating game:", error);
        alert("Failed to create game. Please try again.");
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    if (User && User.teams) {
      const teamOptions = User.teams.map((team: any) => ({
        label: team.name,
        value: team.$id,
      }));
      setTeams(teamOptions);
    }
  }, [User])
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[main.containerCentred,{paddingHorizontal: 16}]}>
        <Logo />
        <Spacer height={40} />
        <View>
          {/* Form Header */}
          <View style={forms.formHeader}>
            <Text style={forms.formTitle}>
              {"Create a Game"}
            </Text>
            <View style={forms.titleUnderline} />
          </View>

          {/* Input Fields */}
          <View style={forms.inputContainer}>
            
              <View style={forms.inputWrapper}>
                <Text style={forms.inputLabel}>Game Name</Text>
                <TextInput
                  style={[
                    forms.input,
                    focusedInput === "gameName" && forms.inputFocused,
                ]}
                placeholder="Enter your game name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="default"
                value={gameName}
                onChangeText={setGameName}
                onFocus={() => setFocusedInput("gameName")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={forms.inputWrapper}>
              <Text style={forms.inputLabel}>My Team</Text>
              <DropDownPicker
                open={open}
                value={teamValue}
                items={teams}
                setOpen={setOpen}
                setValue={setTeamValue}
                setItems={setTeams}
                placeholder="Select a team"
                placeholderStyle={forms.dropdownPlaceholder}
                listMode="SCROLLVIEW"
                style={forms.dropdown}
                textStyle={forms.dropdownText}
                labelStyle={forms.dropdownLabel}
              />
            </View>
            
            <View style={forms.inputWrapper}>
              <Text style={forms.inputLabel}>Opponent</Text>
              <TextInput
                style={[
                  forms.input,
                  focusedInput === "opponent" && forms.inputFocused,
                ]}
                placeholder="Enter your opponent's name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="default"
                value={opponent}
                onChangeText={setOpponent}
                onFocus={() => setFocusedInput("opponent")}
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
            onPress={() => handleGame(gameName, myteam,opponent)}
            disabled={loading}
          >
            <Text style={main.primaryButtonText}>
              {loading
                ? "Please wait..."
                : "Create your Game"}
            </Text>
          </TouchableOpacity>

          
        </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: '#000',
      borderWidth: 2,
      borderColor: "#3d3d3d",
      borderRadius: 12,
    },
  });
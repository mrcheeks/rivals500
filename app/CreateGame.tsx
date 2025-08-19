import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { createGame } from "@/providers/database/games";
import { useSession } from "@/providers/SessionProvider";
import forms from "@/theme/styles/forms";
import main from "@/theme/styles/main";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateGame() {
  const { User, reloadPlayer} = useSession();
  const [gameName, setGameName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGame = async (name: string, opponent: string) => {
      if(!User){
        alert("You must be logged in to create a game.");
        return;
      }
      if (!gameName || !opponent) {
        alert("Please fill in all fields.");
        return;
      }
  
      setLoading(true);
      try {
        // Simulate API call
        const response = await createGame(gameName, User.id, opponent);
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
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={main.containerCentred}>
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
            onPress={() => handleGame(gameName, opponent)}
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

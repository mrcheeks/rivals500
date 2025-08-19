import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { useSession } from "@/providers/SessionProvider";
import main from "@/theme/styles/main";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function GameList() {
  const { User } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openGame = (gameId: string) => {
    console.log("Opening game with ID:", gameId);
    router.push({ pathname: "/GameDetails", params: { gameId } });
  };

  if (!User) {
    return (
      <SafeAreaView style={main.containerCentred}>
        <Text style={main.pTextCenter}>Please log in to view your games.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={main.containerCentred}>
        <Logo />
        <Spacer height={60} />
        {User?.games.length === 0 ? (
        <Text style={main.pTextCenter}>No games found</Text>
        ) : (
        <FlatList
            data={User?.games}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => openGame(item.$id)}>
                <Text style={{ padding: 10, fontSize: 18, color: "#ffffff" }}>{item.title}</Text>
            </TouchableOpacity>
            )}
        />
        )}
        <Spacer height={20} />
        <TouchableOpacity
            style={[
              main.primaryButton,
              loading && main.buttonDisabled,
            ]}
            onPress={() => {
                router.push({ pathname: "/CreateGame" });
            }}
          >
            <Text style={main.primaryButtonText}>
              {"Create Game"}
            </Text>
        </TouchableOpacity>
        
    </SafeAreaView>
  );
}
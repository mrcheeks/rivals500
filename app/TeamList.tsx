import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { fetchMyTeams } from "@/providers/database/teams";
import { useSession } from "@/providers/SessionProvider";
import main from "@/theme/styles/main";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function TeamList() {
  const { User } = useSession();
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleFetchTeams() {
    if(!User){
      alert("You must be logged in to create a team.");
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      const response = await fetchMyTeams(User.id);
      console.log("Fetched teams:", response);
      setGames(response.documents);
    } catch (error) {
      console.error("Error fetching teams:", error);
      alert("Failed to fetch teams. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function openGame(gameId: string) {
    
  }

  useEffect(() => {
    handleFetchTeams();
  }, []);

  return (
    <SafeAreaView style={main.containerCentred}>
        <Logo />
        <Spacer height={60} />
        {games.length === 0 ? (
        <Text style={main.pTextCenter}>No teams found</Text>
        ) : (
        <FlatList
            data={games}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openGame(`/${item.$id}`)}>
                <Text style={{ padding: 10, fontSize: 18, color: "#ffffff" }}>{item.name}</Text>
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
                router.push({ pathname: "/CreateTeam" });
            }}
          >
            <Text style={main.primaryButtonText}>
              {"Create Team"}
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
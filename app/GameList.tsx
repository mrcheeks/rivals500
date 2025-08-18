import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { fetchMyGames } from "@/providers/database/games";
import { useSession } from "@/providers/SessionProvider";
import main from "@/theme/styles/main";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";

const DB_ID = "YOUR_DB_ID";
const GAME_COLLECTION = "Game500";

export default function GameList() {
  const { User } = useSession();
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleFetchGames() {
    if (!User) {
      alert("You must be logged in to fetch games.");
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      const response = await fetchMyGames(User.id);
      console.log("Fetched games:", response);
      setGames(response.documents);
    } catch (error) {
      console.error("Error fetching games:", error);
      alert("Failed to fetch games. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function openGame(gameId: string) {
    
  }

  useEffect(() => {
    handleFetchGames();
  }, []);

  return (
    <SafeAreaView style={main.containerCentred}>
        <Logo />
        <Spacer height={60} />
        {games.length === 0 ? (
        <Text style={main.pTextCenter}>No games found</Text>
        ) : (
        <FlatList
            data={games}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openGame(`/${item.$id}`)}>
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
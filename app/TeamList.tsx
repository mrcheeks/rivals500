import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { databases } from "@/providers/AppwriteProvider";
import main from "@/theme/styles/main";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { ID } from "react-native-appwrite";

const DB_ID = "YOUR_DB_ID";
const GAME_COLLECTION = "Game500";

export default function TeamList() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function fetchGames() {
    const res = await databases.listDocuments(DB_ID, GAME_COLLECTION);
    setGames(res.documents);
  }

  async function addGame() {
    await databases.createDocument(DB_ID, GAME_COLLECTION, ID.unique(), {
      title: "New Game",
      status: "in_progress",
    });
    fetchGames();
  }

  function openGame(gameId: string) {
    
  }

  useEffect(() => {
    fetchGames();
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
                <Text style={{ padding: 10, fontSize: 18 }}>{item.title}</Text>
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
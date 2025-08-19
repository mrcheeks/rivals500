import { useSession } from "@/providers/SessionProvider";
import { Game, Team } from "@/providers/types";
import main from "@/theme/styles/main";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

interface GameDetailsProps {
  params: { gameId: string };
}

export default function GameDetails({ params }: GameDetailsProps) {
  const { gameId } = useLocalSearchParams();
  const { User, reloadPlayer } = useSession();
  const [gameData, setGameData] = useState<Game | null>(null);
  const [team1Data, setTeam1Data] = useState<Team | null>(null);
  const [team2Data, setTeam2Data] = useState<String>('');
  const suits = ['spades','clubs','diamonds','hearts','no-trumps'] as const;
  const tricks = ['6', '7', '8', '9', '10'] as const;

  type Suit = typeof suits[number];
  type Trick = typeof tricks[number];

  const [selected, setSelected] = useState<{ suit: Suit; trick: Trick } | null>(null);

  useEffect(() => {
    const currentGame = User?.games.find(game => game.$id === gameId) || null;
    if (!currentGame) {
      alert("Game not found.");
      return;
    } else {
      setGameData(currentGame);
      const currentTeam1 = User?.teams.find(team => team.$id === currentGame.team_1_id) || null;
      const currentTeam2 = currentGame.team_2_id;
      if (!currentTeam1?.name || !currentTeam2) {
        alert("Not all Teams found.");
      } else {
        setTeam1Data(currentTeam1);
        setTeam2Data(currentTeam2);
      }
    }
  }, [gameId])

  return (
    <SafeAreaView style={main.containerCentred}>
      {gameData && (
        <>
          <Text style={main.welcomeTitle}>{gameData.title}</Text>
          <Text style={main.pTextCenter}>{team1Data?.name}</Text>
          <Text style={main.pTextCenter}>{gameData.team_1_doors}</Text>
          <Text style={main.pTextCenter}>{team2Data}</Text>
          <Text style={main.pTextCenter}>{gameData.team_2_doors}</Text>
          {/* Suits row */}
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24, marginBottom: 12 }}>
            {suits.map((suit) => (
              <View
                key={suit}
                style={{
                  flex: 1,
                  alignItems: "center",
                  maxWidth: 60,
                  minWidth: 0,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginHorizontal: 2,
                  paddingVertical: 4,
                }}
              >
                {suit === "no-trumps" ? (
                  <Text style={{ fontSize: 24, color: "#FFD700", textAlign: "center" }}>★</Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 24,
                      color:
                        suit === "hearts" || suit === "diamonds"
                          ? "#D32F2F"
                          : "#222",
                      textAlign: "center",
                    }}
                  >
                    {suit === "hearts" && "♥"}
                    {suit === "diamonds" && "♦"}
                    {suit === "spades" && "♠"}
                    {suit === "clubs" && "♣"}
                  </Text>
                )}
              </View>
            ))}
          </View>
          {/* Trick buttons grid */}
          <View>
            {tricks.map((trick) => (
              <View key={trick} style={{ flexDirection: "row", justifyContent: "center", marginBottom: 8 }}>
                {suits.map((suit) => {
                  const isSelected = selected?.suit === suit && selected?.trick === trick;
                  return (
                    <TouchableOpacity
                      key={suit}
                      style={{
                        flex: 1,
                        maxWidth: 60,
                        minWidth: 60,
                        backgroundColor: isSelected ? "#1976d2" : "#fff",
                        borderColor: "#1976d2",
                        borderWidth: 1,
                        borderRadius: 8,
                        marginHorizontal: 2,
                        paddingVertical: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: isSelected ? 2 : 0,
                      }}
                      onPress={() => setSelected({ suit, trick })}
                      accessibilityLabel={`${trick} of ${suit}`}
                      accessibilityState={{ selected: isSelected }}
                    >
                      <Text style={{ color: isSelected ? "#fff" : "#1976d2", fontWeight: "bold", fontSize: 16 }}>
                        {trick}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

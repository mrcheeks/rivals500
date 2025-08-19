import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import { useSession } from "@/providers/SessionProvider";
import main from "@/theme/styles/main";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function TeamList() {
  const { User } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function openGame(gameId: string) {
    
  }

  return (
    <SafeAreaView style={main.containerCentred}>
        <Logo />
        <Spacer height={60} />
        {User?.teams.length === 0 ? (
        <Text style={main.pTextCenter}>No teams found</Text>
        ) : (
        <FlatList
            data={User?.teams}
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
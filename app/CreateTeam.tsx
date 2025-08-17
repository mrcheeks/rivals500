import Logo from "@/components/Logo";
import Spacer from "@/components/Spacer";
import main from "@/theme/styles/main";
import { SafeAreaView, Text } from "react-native";

export default function CreateTeam() {
  return (
    <SafeAreaView style={main.containerCentred}>
        <Logo />
        <Spacer height={60} />
        <Text style={main.pTextCenter}>Create a New Team</Text>
    </SafeAreaView>
  );
}
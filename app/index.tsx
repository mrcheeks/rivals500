import AppleBtn from '@/components/AppleBtn';
import GoogleBtn from '@/components/GoogleBtn';
import { useSession } from '@/providers/SessionProvider';
import { COLOURS } from '@/theme/colours';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { OAuthProvider } from 'react-native-appwrite';

import Logo from '@/components/Logo';
import Spacer from '@/components/Spacer';
import main from '@/theme/styles/main';
import React from 'react';

export default function Home() {
  const { User, loginWithOAuth, authState, signOut } = useSession();
  const loginWithGoogle = async () => loginWithOAuth(OAuthProvider.Google);
  const loginWithApple = async () => loginWithOAuth(OAuthProvider.Apple);

  if(authState === 'pending') {
    return (
      <SafeAreaView style={styles.containerCentred}>
        <Logo />
        <Spacer height={100} />
        <ActivityIndicator
            size="large"
            color={COLOURS.blueLogoLight}
            style={main.spinner}
        />
      </SafeAreaView>
    )
  }

  if(authState === 'unauthenticated') {
    return (
      <SafeAreaView style={styles.containerCentred}>
        <Logo />
        <Spacer height={100} />
        <View>
          <GoogleBtn onPress={loginWithGoogle} disabled={false} />
          <Spacer height={10} />
          <Text style={main.pTextCenter}>or</Text>
          
          <AppleBtn onPress={loginWithApple} disabled={false} />
          <Spacer height={40} />
          <Text style={main.pTextCenter}>Or use the Free Play scoreboard.</Text>
        </View>
      </SafeAreaView>
    )
  }
  
  return (
    <>
      <SafeAreaView style={styles.containerCentred}>
        <Logo />
        <Spacer height={60} />
        <Text style={main.pTextCenter}>G'Day {User?.name}!</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerCentred: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.appBkgColour,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  homeButtonRow: {
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "space-around",
    marginHorizontal:15,
    marginBottom: 4,
  },
  homeButtons: {
    marginTop: 16,
  },
});

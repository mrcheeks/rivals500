// SessionProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { Account, AppwriteException, Client, ID } from 'react-native-appwrite';
import { createPlayer, fetchPlayer } from './database/player';
import { User } from './types';

// Define the session context
interface SessionContextType {
    User: User | null;
    loading: boolean;
    mode: 'authenticated' | 'login' | 'signup' | 'pending';
    checkingUser: boolean;
    setMode: React.Dispatch<React.SetStateAction<'authenticated' | 'login' | 'signup' | 'pending'>>;
    handleAuth: (email: string, password: string, name: string) => Promise<void>;
    // Add other methods as needed, e.g., signOut
    handleLogout: () => void;
    reloadPlayer: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://syd.cloud.appwrite.io/v1')
    .setProject('689eee51001660b19baa')
    .setPlatform('Rivals500');

const account = new Account(client);

// Create the SessionProvider component
const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [mode, setMode] = useState<"authenticated" |"login" | "signup" | "pending">("pending");
    const [User, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkingUser, setCheckingUser] = useState(true);

  // Check for existing session
    const handleAuth = async (email: string, password: string, name: string) => {
    setLoading(true);
    if (mode === "signup") {
            if(name === "" || email === "" || password === "") {
                Alert.alert("Please fill in all fields");
                setLoading(false);
            return;
        }
    } else {
        if(email === "" || password === "") {
            Alert.alert("Please fill in all fields");
            setLoading(false);
            return;
        }
    }
    try {
      if (mode === "signup") {
        const user = await account.create(ID.unique(), email, password, name);
        if (user) {
          await account.createEmailPasswordSession(email, password);
          console.log("Auth created:", user);
          try {
            const response = await createPlayer(user.$id, name);
            console.log("Player created:", response);
            setMode("authenticated");
          } catch (error) {
            console.error("Error creating player:", error);
            Alert.alert("Failed to create player");
          }
        } else {
          Alert.alert("Signup failed");
        }
      } else {
        await account.createEmailPasswordSession(email, password);
        
        Alert.alert("Login successful!");
        const user = await account.get();
        if (user) {
          console.log("Auth data:", user);
          try {
            const player = await fetchPlayer(user.$id);
            console.log("Player fetched:", player);
            setUser({
                id: player.$id,
                name: user.name,
                email: user.email,
                teams: player.teams || [],
                games: player.games || [],
            });
            setMode("authenticated");
          } catch (error) {
            console.error("Error fetching player:", error);
          }
        } else {
          console.error("User not found");
        }
      }
    } catch (err) {
      if (err instanceof AppwriteException) {
        console.log("Appwrite error:", err);
        Alert.alert(err.message);
      } else {
        Alert.alert("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    setMode("pending");
  };

  const reloadPlayer = async () => {
    const user = await account.get();
    if (user) {
      console.log("Auth data:", user);
      try {
        const player = await fetchPlayer(user.$id);
        console.log("Player fetched:", player);
        setUser({
            id: player.$id,
            name: user.name,
            email: user.email,
            teams: player.teams || [],
            games: player.games || [],
        });
        setMode("authenticated");
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    } else {
      console.error("User not found");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        if (user) {
          console.log("Auth data:", user);
          try {
            const player = await fetchPlayer(user.$id);
            console.log("Player fetched:", player);
            setUser({
                id: player.$id,
                name: user.name,
                email: user.email,
                teams: player.teams || [],
                games: player.games || [],
            });
            setMode("authenticated");
          } catch (error) {
            console.error("Error fetching player:", error);
          } 
        } else {
          console.error("User not found");
        }
      } catch (err) {
        console.log("Error fetching user", err);
        setUser(null);
      } finally {
        setCheckingUser(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (nextAppState === "active") {
        try {
          const user = await account.get();
          const player = await fetchPlayer(user.$id);
          console.log("Player data:", player);
          setUser({
              id: player.$id,
              name: user.name,
              email: user.email,
              teams: player.teams || [],
              games: player.games || [],
          });
          setMode("authenticated");
        } catch (err) {
          setUser(null);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);


    return (
        <SessionContext.Provider value={{ User, mode, loading, checkingUser, setMode, handleAuth, handleLogout, reloadPlayer }}>
        {children}
        </SessionContext.Provider>
    );
};

// Custom hook to use the session context
const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export { SessionProvider, useSession };


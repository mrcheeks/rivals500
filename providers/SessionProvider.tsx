// SessionProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { Account, AppwriteException, Client, ID } from 'react-native-appwrite';


type User = {
    id: string;
    name: string;
    email: string;
};

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
    try {
      if (mode === "signup") {
        await account.create(ID.unique(), email, password);
        Alert.alert("Signup successful! Please login.");
        setMode("login");
      } else {
        await account.createEmailPasswordSession(email, password);
        Alert.alert("Login successful!");
        const user = await account.get();
        setUser({
            id: user.$id,
            name: name,
            email: email
        });
        setMode("authenticated");
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser({
            id: user.$id,
            name: user.name,
            email: user.email
        });
        setMode("authenticated");
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
          setUser({
            id: user.$id,
            name: user.name,
            email: user.email
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
        <SessionContext.Provider value={{ User, mode, loading, checkingUser, setMode, handleAuth, handleLogout }}>
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


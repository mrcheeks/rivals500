// SessionProvider.tsx
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Account, Client, OAuthProvider } from 'react-native-appwrite';


type User = {
    id: string;
    name: string;
    email: string;
};

// Define the session context
interface SessionContextType {
    User: User | null;
    loading: boolean;
    authState: 'authenticated' | 'unauthenticated' | 'pending';
    loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
    // Add other methods as needed, e.g., signOut
    signOut: () => void;
    reloadUser: () => void;
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

    const [authState, setAuthState] = useState<'authenticated' | 'unauthenticated' | 'pending'>('pending');
    const [User, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

  // Check for existing session
    useEffect(() => {
        if (authState === 'pending') {

            (async () => {

                const user = await account.get().catch(e => {
                    console.warn('Error fetching user data:', e);
                    return null;
                });
                if (user) {
                    setUser({
                        id: user.$id,
                        name: user.name,
                        email: user.email,
                    });
                    setAuthState('authenticated');
                } else {
                    setAuthState('unauthenticated');
                }
            })();

            //checkSession();
        }
    }, [authState]);

    const loginWithOAuth = async (provider: OAuthProvider) => {
         try {
            const redirectUri = Linking.createURL("/");

            console.log("Platform:", Platform.OS);
            console.log("Redirect URI:", redirectUri);
            
            // Use createOAuth2Token for android and ios to ensure cookies
            // are shared between app and in-app browser after redirection
            const response = account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
            );
            if (!response) throw new Error("Create OAuth2 token failed");

            const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
            );

            if (browserResult.type !== "success")
            throw new Error("Create OAuth2 token failed");

            console.log("Browser Result: ", browserResult);

            const url = new URL(browserResult.url);
            const secret = url.searchParams.get("secret")?.toString();
            const userId = url.searchParams.get("userId")?.toString();
            if (!secret || !userId) throw new Error("Create OAuth2 token failed");

            // Create session manually using userId and secret
            await account.createSession(userId, secret);

            // Return the newly created session
            const currentSession = await account.getSession("current");
            if (!currentSession) {
                throw new Error("Failed to create session after OAuth authentication");
            }
            
            setAuthState('pending');

            
        } catch (error) {
            console.error("Login error:", error);

        }
    };
    
    // Sign out
    const signOut = useCallback(async () => {
        setUser(null);
        await account.deleteSession('current');
        setAuthState('pending');
    }, []);

    const reloadUser = useCallback(async () => {
        setAuthState('pending');
    }, []);

    return (
        <SessionContext.Provider value={{ User, authState, loading, loginWithOAuth, signOut, reloadUser }}>
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


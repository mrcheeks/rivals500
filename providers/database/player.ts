import { ID, Query } from "react-native-appwrite";
import { databases } from "../AppwriteProvider";

export const createPlayer = async (user_id: string, name: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_PLAYERS_COLLECTION_ID as string;
    
    try {
        const response = await databases.createDocument(
            db,
            collection,
            ID.unique(),
            {
                "auth_id": user_id,
                "username": name,
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating player:", error);
        throw error;
    }
};

export const fetchPlayer = async (user_id: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_PLAYERS_COLLECTION_ID as string;

    const query =  [ Query.equal('auth_id', user_id) ];

    try {
        const response = await databases.listDocuments(
            db,
            collection,
            query
        );
        return response.documents[0];
    } catch (error) {
        console.error("Error fetching player:", error);
        throw error;
    }
};

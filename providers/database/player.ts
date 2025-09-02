import { ID, Query } from "react-native-appwrite";
import { tablesDB } from "../AppwriteProvider";

export const createPlayer = async (user_id: string, name: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_PLAYERS_COLLECTION_ID as string;
    
    try {
        const response = await tablesDB.createRow({
            databaseId: db,
            tableId: collection,
            rowId: ID.unique(),
            data: {
                "auth_id": user_id,
                "username": name,
            }
        });

        return response;
    } catch (error) {
        console.error("Error creating player:", error);
        throw error;
    }
};

export const fetchPlayer = async (user_id: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_PLAYERS_COLLECTION_ID as string;

    try {
        const response = await tablesDB.getRow({
            databaseId: db,
            tableId: collection,
            rowId: ID.unique(),
            queries: [
                Query.equal('auth_id', user_id)
            ]
        });
        return response.documents[0];
    } catch (error) {
        console.error("Error fetching player:", error);
        throw error;
    }
};

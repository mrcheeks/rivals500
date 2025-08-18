import { ID, Query } from "react-native-appwrite";
import { databases } from "../AppwriteProvider";

export const createGame = async (title: string, owner_id: string, opponent_id: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_GAMES_COLLECTION_ID as string;
    console.log(db, collection);
    try {
        const response = await databases.createDocument(
            db,
            collection,
            ID.unique(),
            {
                "title": title,
                "team_1_id": owner_id,
                "team_2_id": opponent_id,
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating game:", error);
        throw error;
    }
};

export const fetchMyGames = async (owner_id: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_GAMES_COLLECTION_ID as string;

    const query = [Query.or([
        Query.equal("team_1_id", owner_id),
        Query.equal("team_2_id", owner_id)
    ])];

    try {
        const response = await databases.listDocuments(
            db,
            collection,
            query
        );
        return response;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
};

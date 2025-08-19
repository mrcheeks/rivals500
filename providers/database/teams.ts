import { ID, Query } from "react-native-appwrite";
import { databases } from "../AppwriteProvider";

export const createTeam = async (name: string, owner_id: string, team_mate: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_TEAMS_COLLECTION_ID as string;
    console.log(db, collection);
    try {
        const response = await databases.createDocument(
            db,
            collection,
            ID.unique(),
            {
                "name": name,
                "player": owner_id,
                "player_2": team_mate,
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating team:", error);
        throw error;
    }
};

export const fetchTeam = async (team_id: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_TEAMS_COLLECTION_ID as string;

    try {
        const response = await databases.getDocument(
            db,
            collection,
            team_id
        );
        return response;
    } catch (error) {
        console.error("Error fetching team:", error);
        throw error;
    }
};

export const fetchMyTeams = async (owner_id: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_TEAMS_COLLECTION_ID as string;
    
    const query = [ Query.equal('owner_id', owner_id) ];

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

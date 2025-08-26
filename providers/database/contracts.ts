import { ID, Query } from "react-native-appwrite";
import { databases } from "../AppwriteProvider";
import { Contract } from "../types";

export const createContract = async (contract:Contract) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_CONTRACTS_COLLECTION_ID as string;
    console.log('createContract:', contract);
    try {
        const response = await databases.createDocument(
            db,
            collection,
            ID.unique(),
            {
                "suit": contract.suit,
                "count": contract.count,
                "outcome": contract.outcome,
                "game": contract.game_id,
                "team": contract.team
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating game:", error);
        throw error;
    }
};

export const updateContract = async (contract:Contract) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_CONTRACTS_COLLECTION_ID as string;
    console.log('updateContract:', contract);
    try {
        const response = await databases.updateDocument(
            db,
            collection,
            contract.$id,
            {
                "suit": contract.suit,
                "count": contract.count,
                "outcome": contract.outcome,
                "game": contract.game_id,
                "team": contract.team
            }
        );
        return response;
    } catch (error) {
        console.error("Error updating contract:", error);
        throw error;
    }
};

export const getContractsByGameId = async (gameId: string) => {
    const db = process.env.EXPO_PUBLIC_DATABASE_ID as string;
    const collection = process.env.EXPO_PUBLIC_CONTRACTS_COLLECTION_ID as string;
    try {
        const response = await databases.listDocuments(db, collection, [
            Query.equal("game", gameId)
        ]);
        return response.documents;
    } catch (error) {
        console.error("Error fetching contracts:", error);
        throw error;
    }
};

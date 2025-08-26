import main from "@/theme/styles/main";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BidProps {
    onClose: () => void;
    handleBid: (bid: Bid) => void;
    team: 'team_1' | 'team_2';
    teamname: string;
}

type Bid = {
  count: '6' | '7' | '8' | '9' | '10';
  suit: 'hearts' | 'diamonds' | 'spades' | 'clubs' | 'no_trumps';
  team: 'team_1' | 'team_2';
};

const BidModal = ({ onClose, handleBid, team, teamname }: BidProps) => {
    const [selected, setSelected] = useState<{ suit: Suit; trick: Trick } | null>(null);
    const suits = ['spades','clubs','diamonds','hearts','no_trumps'] as const;
    const tricks = ['6', '7', '8', '9', '10'] as const;

    type Suit = typeof suits[number];
    type Trick = typeof tricks[number];

    return (
        <View style={styles.modalContainer}>
            <Text style={[main.welcomeSubtitle, { marginBottom: 32 }]}>You are bidding for {teamname}</Text>
        {/* Suits row */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24, marginBottom: 12, width: "100%", paddingHorizontal: 16 }}>
                {suits.map((suit) => (
                <View
                    key={suit}
                    style={{
                    flex: 1,
                    alignItems: "center",
                    width: "20%",
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    marginHorizontal: 2,
                    paddingVertical: 4,
                    }}
                >
                    {suit === "no_trumps" ? (
                    <Text style={{ fontSize: 24, color: "#FFD700", textAlign: "center" }}>★</Text>
                    ) : (
                    <Text
                        style={{
                        fontSize: 24,
                        color:
                            suit === "hearts" || suit === "diamonds"
                            ? "#D32F2F"
                            : "#222",
                        textAlign: "center",
                        }}
                    >
                        {suit === "hearts" && "♥"}
                        {suit === "diamonds" && "♦"}
                        {suit === "spades" && "♠"}
                        {suit === "clubs" && "♣"}
                    </Text>
                    )}
                </View>
                ))}
            </View>
            {/* Trick buttons grid */}
            <View>
                {tricks.map((trick) => (
                <View key={trick} style={{ flexDirection: "row", justifyContent: "center", marginBottom: 8, width: "100%", paddingHorizontal: 16 }}>
                    {suits.map((suit) => {
                    const isSelected = selected?.suit === suit && selected?.trick === trick;
                    return (
                        <TouchableOpacity
                        key={suit}
                        style={{
                            flex: 1,
                            width: "20%",
                            backgroundColor: isSelected ? "#1976d2" : "#fff",
                            borderColor: "#1976d2",
                            borderWidth: 1,
                            borderRadius: 8,
                            marginHorizontal: 2,
                            paddingVertical: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: isSelected ? 2 : 0,
                        }}
                        onPress={() => setSelected({ suit, trick })}
                        accessibilityLabel={`${trick} of ${suit}`}
                        accessibilityState={{ selected: isSelected }}
                        >
                        <Text style={{ color: isSelected ? "#fff" : "#1976d2", fontWeight: "bold", fontSize: 16 }}>
                            {trick}
                        </Text>
                        </TouchableOpacity>
                    );
                    })}
                </View>
                ))}
            </View>
            {/* Action buttons */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, width: "100%", paddingHorizontal: 16 }}>
                <TouchableOpacity onPress={onClose} style={{ flex: 1, marginRight: 8 }}>
                    <Text style={{ textAlign: "center", padding: 12, backgroundColor: "#f44336", borderRadius: 8, color: "#fff" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (selected && selected.trick && selected.suit) {
                            console.log(`Placing bid: ${selected.trick} ${selected.suit} for ${team}`);
                            handleBid({ count: selected.trick, suit: selected.suit, team });
                        }
                    }}
                    style={{ flex: 1, marginLeft: 8 }}
                    disabled={!selected || !selected.trick || !selected.suit}
                >
                    <Text style={{
                        textAlign: "center",
                        padding: 12,
                        backgroundColor: (!selected || !selected.trick || !selected.suit) ? "#A5D6A7" : "#4CAF50",
                        borderRadius: 8,
                        color: "#fff"
                    }}>
                        Place Bid
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BidModal;

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});

import BidModal from "@/components/BidModal";
import { createContract, getContractsByGameId, updateContract } from "@/providers/database/contracts";
import { useSession } from "@/providers/SessionProvider";
import { Game, Team } from "@/providers/types";
import { createGameState, updateScore } from "@/scripts/gameState";
import main from "@/theme/styles/main";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

interface GameDetailsProps {
  params: { gameId: string };
}

interface TeamState {
  roundScore: number; // current round tally
  wins: number;       // number of matches won
}

type Bid = {
  count: '6' | '7' | '8' | '9' | '10';
  suit: 'hearts' | 'diamonds' | 'spades' | 'clubs' | 'no_trumps';
  team: 'team_1' | 'team_2';
};

export default function GameDetails({ params }: GameDetailsProps) {
  const [loading, setLoading] = useState(false);
  const { gameId } = useLocalSearchParams();
  const { User, reloadPlayer } = useSession();
  const [gameData, setGameData] = useState<Game | null>(null);
  const [team1Data, setTeam1Data] = useState<Team | null>(null);
  const [team2Data, setTeam2Data] = useState<string>('');
  const [team1Score, setTeam1Score] = useState<TeamState>({ roundScore: 0, wins: 0 });
  const [team2Score, setTeam2Score] = useState<TeamState>({ roundScore: 0, wins: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [contractSet, setContractSet] = useState(false);
  const [contractData, setContractData] = useState<any | null>(null);
  const [loadedContracts, setLoadedContracts] = useState<any[]>([]);
  const [contractOutcome, setContractOutcome] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<'team_1' | 'team_2'>('team_1');
  const gameTally = createGameState();

  const handleContract = (bid: Bid) => {
    if (!gameData) return;
    setContractSet(true);
    setModalVisible(false);
    createBid({
      count: bid.count,
      suit: bid.suit,
      team: bid.team,
      outcome: 'in_progress',
      game_id: gameData.$id
    });
  };

  const handleOutcome = (outcome: string, allTen: boolean) => {
    setContractOutcome(outcome);
    if (contractData && gameData) {
      setContractData(null);
      updateBid({
        $id: contractData.$id,
        count: contractData.count,
        suit: contractData.suit,
        team: contractData.team,
        outcome: outcome,
        game_id: gameData.$id,
        all_ten: allTen
      });
      setContractSet(false);
      // After updating, reload contracts to refresh FlatList data
    }
    
  };

  const updateBid = async (data: any) => {
    if (!gameData || !data) return;
    setLoading(true);
    try {
      const contract = await updateContract(data);
      console.log("Contract updated:", contract);
      loadContracts(gameData.$id);
    } catch (error) {
      console.error("Error updating contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const createBid = async (data: any) => {
    if (!gameData || !data) return;
    setLoading(true);
    try {
      const contract = await createContract(data);
      console.log("Contract created:", contract);
      setContractData({
      $id: contract.$id,
      count: contract.count,
      suit: contract.suit,
      team: contract.team,
      outcome: 'in_progress',
      game_id: gameData.$id
    });
    } catch (error) {
      console.error("Error creating contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadContracts = async (gameId: string) => {
    if (!gameId) return;
    setLoadedContracts([]);
    setLoading(true);
    try {
      const contracts = await getContractsByGameId(gameId);
      console.log("Contracts loaded");
      // Map or cast DefaultDocument[] to Contract[]
      setLoadedContracts(
        contracts.map((doc: any) => ({
          $id: doc.$id,
          suit: doc.suit,
          count: doc.count,
          outcome: doc.outcome,
          game_id: doc.game_id,
          team: doc.team,
          all_ten: doc.all_ten
        }))
      );
    } catch (error) {
      console.error("Error loading contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkContracts = () => {
    const inProgressContract = loadedContracts.find(contract => contract.outcome === 'in_progress');
    if (inProgressContract) {
      setContractData(inProgressContract);
      setContractOutcome(inProgressContract.outcome);
      setContractSet(true);
      setSelectedTeam(inProgressContract.team);
    }
    const otherContracts = loadedContracts.filter(
      contract => contract.outcome !== 'in_progress'
    );
  };

  const tallyScore = () => {
    if (!gameData) return;

    // For each loaded contract, use updateScore to update the game state
    loadedContracts.forEach(contract => {
      const { count, suit, outcome, team } = contract;
      if (outcome === 'won' || outcome === 'lost') {
      // If outcome is 'won', tricksMade = count, else tricksMade = 0
      const tricksMade = contract.all_ten ? 10 : (outcome === 'won' ? Number(count) : 0);
      console.log(gameTally, team, Number(count), suit, tricksMade);
      updateScore(gameTally, team, Number(count), suit, tricksMade);
      }
    });
    setTeam1Score({ roundScore: gameTally.team_1.roundScore, wins: gameTally.team_1.wins });
    setTeam2Score({ roundScore: gameTally.team_2.roundScore, wins: gameTally.team_2.wins });
    console.log("Tally complete:", gameTally);
  };

  const openBidModal = (team: 'team_1' | 'team_2') => {
    setSelectedTeam(team);
    setModalVisible(true);
  };

  const getTeamName = (team: string) => {
    if (team === "team_1") {
      return team1Data?.name || '';
    } else if (team === "team_2") {
      return team2Data || '';
    }
    return '';
  };

  useEffect(() => {
    const currentGame = User?.games.find(game => game.$id === gameId) || null;
    if (!currentGame) {
      alert("Game not found.");
      return;
    } else {
      setGameData(currentGame);
      const currentTeam1 = User?.teams.find(team => team.$id === currentGame.team_1_id) || null;
      const currentTeam2 = currentGame.team_2_id;
      if (!currentTeam1?.name || !currentTeam2) {
        alert("Not all Teams found.");
      } else {
        setTeam1Data(currentTeam1);
        setTeam2Data(currentTeam2);
        loadContracts(currentGame.$id)
      }
    }
  }, [gameId])

  useEffect(() => {
    if (!loadedContracts) return;
    checkContracts();
    tallyScore();
  }, [loadedContracts])

  return (
    <SafeAreaView style={main.containerCentred}>
      <>
      {gameData && !modalVisible && (
        <>
          {gameData && !contractSet && (
            <>
              <Text style={[main.welcomeSubtitle, { marginBottom: 32, marginTop: 32 }]}>{gameData.title}</Text>
              <View style={main.teamContainer}>
              <View>
                <Text style={main.welcomeSubtitle}>{team1Data?.name}</Text>
                <TouchableOpacity style={main.bidButton} onPress={() => openBidModal('team_1')}>
                <Text style={main.bidButtonText}>Place Bid</Text>
                </TouchableOpacity>
              </View>
              <Text style={main.welcomeSubtitle}>{team1Score?.wins}|{team1Score?.roundScore}</Text>
              </View>
              <View style={main.teamContainer}>
              <View>
                <Text style={main.welcomeSubtitle}>{team2Data}</Text>
                <TouchableOpacity style={main.bidButton} onPress={() => openBidModal('team_2')}>
                <Text style={main.bidButtonText}>Place Bid</Text>
                </TouchableOpacity>
              </View>
              <Text style={main.welcomeSubtitle}>{team2Score?.wins}|{team2Score?.roundScore}</Text>
              </View>
              <FlatList
              data={[...loadedContracts].reverse()}
              renderItem={({ item }) => (
                <View>
                <Text style={main.pTextCenter}>{getTeamName(item.team)} {item.outcome} {item.count} {item.suit}</Text>
                </View>
              )}
              keyExtractor={item => item.$id}
              />
            </>
          )}

          {gameData && contractSet && (
            <>
              <Text style={[main.welcomeTitle, { marginBottom: 32 }]}>{gameData.title}</Text>
              <View style={main.teamContainer}>
                <View>
                  <Text style={main.welcomeSubtitle}>{team1Data?.name}</Text>
                  {selectedTeam === 'team_1' && (
                    <>
                      <Text style={main.pTextCenter}>Bid: {contractData?.count} {contractData?.suit}</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                        <TouchableOpacity onPress={() => handleOutcome('lost', false)} >
                          <MaterialIcons name="close" size={48} color="#FF4848" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOutcome('won', false)} >
                          <MaterialIcons name="check-circle" size={48} color="#289835" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOutcome('won', true)} >
                          <MaterialIcons name="check-circle" size={48} color="#ce9211ff" />
                        </TouchableOpacity>
                      </View>
                    </>
                  )} 
                  
                </View>
                <Text style={main.score}>{gameData.team_1_doors}-{gameData.team_1_score}</Text>
              </View>
              <View style={main.teamContainer}>
                <View>
                  <Text style={main.welcomeSubtitle}>{team2Data}</Text>
                  {selectedTeam === 'team_2' && (
                    <>
                      <Text style={main.pTextCenter}>Bid: {contractData?.count} {contractData?.suit}</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                        <TouchableOpacity onPress={() => handleOutcome('lost', false)} >
                          <MaterialIcons name="close" size={48} color="#FF4848" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOutcome('won', false)} >
                          <MaterialIcons name="check-circle" size={48} color="#289835" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOutcome('won', true)} >
                          <MaterialIcons name="check-circle" size={48} color="#ce9211ff" />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                  
                </View>
                <Text style={main.score}>{gameData.team_2_doors}-{gameData.team_2_score}</Text>
              </View>
            </>
          )}

        </>
      )}
      
      {modalVisible && (
            <BidModal onClose={() => setModalVisible(false)} handleBid={handleContract} team={selectedTeam} teamname={getTeamName(selectedTeam)} />
          )}
      </>

    </SafeAreaView>
  );
}


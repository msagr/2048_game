'use client';

import Score from "../components/score"
import { useState } from "react";
import Player from "../components/player";

const PLAYERS = {
  p1: "Player 1",
  p2: "Player 2",
};

function deriveActivePlayer(gameTurns: number) {
  let currentPlayer = 'p1';

  if (gameTurns % 2 === 0) {
    currentPlayer = 'p2';
  }

  return currentPlayer;
}

export default function Home() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState(1);

  const activePlayer = deriveActivePlayer(gameTurns);
  
  function handlePlayerNameChange(playerId: string, newName: string) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [playerId]: newName,
      };
    });
  }

  return (
    <div>
      <header>
        <h1>2048 Game</h1>
          <Player 
            initialName={PLAYERS.p1}
            playerId="p1" 
            isActive={activePlayer === 'p1'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.p2}
            playerId="p2" 
            isActive={activePlayer === 'p2'}
            onChangeName={handlePlayerNameChange}
          />
      </header>
    </div>
  )
}
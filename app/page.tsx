'use client';

import { useState } from "react";
import Player from "../components/player";
import Board from "../components/board";
import GameProvider from "../context/game-context";
import styles from "../styles/board.module.css";

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
  
  function handlePlayerNameChange(playerId: 'p1' | 'p2', newName: string) {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [playerId]: newName || prevPlayers[playerId]
    }));
  }

  return (
    <GameProvider>
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <h1>2048</h1>
          <div className={styles.scores}>
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
          </div>
        </div>
        
        <Board />
        
        <div className={styles.instructions}>
          <p>Join the tiles, get to <strong>2048!</strong></p>
          <p>Use <kbd>arrow keys</kbd> or <kbd>swipe</kbd> to move the tiles.</p>
        </div>
      </div>
    </GameProvider>
  );
}
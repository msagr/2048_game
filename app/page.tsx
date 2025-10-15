'use client';

import { useState } from "react";
import Player from "../components/player";
import Board from "../components/board";
import GameProvider from "../context/game-context";
import styles from "../styles/board.module.css";

function deriveActivePlayer(gameTurns: number) {
  let currentPlayer = 'p1';

  if (gameTurns % 2 === 0) {
    currentPlayer = 'p2';
  }

  return currentPlayer;
}

export default function Home() {
  const [gameTurns, setGameTurns] = useState(1);

  const activePlayer = deriveActivePlayer(gameTurns);

  return (
    <GameProvider>
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <Player 
            playerId="p1" 
            isActive={activePlayer === 'p1'}
          />
          <h1 className={styles.gameTitle}>2048</h1>
          <Player 
            playerId="p2" 
            isActive={activePlayer === 'p2'}
          />
        </div>
        
        <Board />
      </div>
    </GameProvider>
  );
}
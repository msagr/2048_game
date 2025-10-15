import { useContext } from "react";
import { GameContext } from "../context/game-context";
import styles from "../styles/player.module.css";

interface PlayerProps {
  playerId: "p1" | "p2";
  isActive: boolean;
}

export default function Player({
  playerId,
  isActive,
}: PlayerProps) {
  const { p1_score, p2_score } = useContext(GameContext);
  
  const score = playerId === 'p1' ? p1_score : p2_score;
  const playerName = playerId === 'p1' ? 'Player 1' : 'Player 2';

  return (
    <div className={`${styles.playerCard} ${isActive ? styles.active : ''}`}>
      <div className={styles.playerInfo}>
        <h3 className={styles.playerName}>{playerName}</h3>
      </div>
      <div className={styles.score}>
        <span className={styles.scoreLabel}>Score</span>
        <span className={styles.scoreValue}>{score}</span>
      </div>
    </div>
  );
}

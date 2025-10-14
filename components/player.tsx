import { useState, useEffect } from "react";
import styles from "../styles/player.module.css";

interface PlayerProps {
  initialName: string;
  playerId: 'p1' | 'p2';
  isActive: boolean;
  onChangeName: (playerId: 'p1' | 'p2', newName: string) => void;
}

export default function Player({ initialName, playerId, isActive, onChangeName }: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(initialName);

  useEffect(() => {
    setPlayerName(initialName);
    setEditedName(initialName);
  }, [initialName]);

  function handleEditClick() {
    if (isEditing) {
      if (editedName.trim()) {
        onChangeName(playerId, editedName);
      }
    } else {
      setEditedName(playerName);
    }
    setIsEditing(!isEditing);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditedName(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleEditClick();
    } else if (event.key === 'Escape') {
      setEditedName(playerName);
      setIsEditing(false);
    }
  }

  return (
    <div className={`${styles.playerCard} ${isActive ? styles.active : ''}`}>
      <div className={styles.playerInfo}>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.nameInput}
            autoFocus
            maxLength={12}
          />
        ) : (
          <h3 className={styles.playerName}>{playerName}</h3>
        )}
        <button 
          onClick={handleEditClick} 
          className={styles.editButton}
          aria-label={isEditing ? 'Save name' : 'Edit name'}
        >
          {isEditing ? '✓' : '✎'}
        </button>
      </div>
      <div className={styles.score}>
        <span className={styles.scoreLabel}>Score</span>
        <span className={styles.scoreValue}>0</span>
      </div>
    </div>
  );
}
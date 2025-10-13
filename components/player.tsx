import { useState } from "react";

export default function Player({initialName, playerId, isActive, onChangeName}: {initialName: string, playerId: string, isActive: boolean, onChangeName: (playerId: string, newName: string) => void}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);

        if(isEditing) {
            onChangeName(playerId, playerName);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                {/* score */}
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
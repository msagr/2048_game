import { createContext } from "react";
import { Tile } from "../schema/tile";

type MoveDirection = "move_up" | "move_down" | "move_left" | "move_right";

export const GameContext = createContext({
    p1_score: 0,
    p2_score: 0,
    status: "ongoing",
    moveTiles: (_: MoveDirection) => {},
    getTiles: () => [] as Tile[],
    startGame: () => {},
});
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useEffect,
    useReducer,
    useMemo,
  } from "react";
import { isNil, throttle } from "lodash";
import {
    gameWinTileValue,
    mergeAnimationDuration,
    tileCountPerDimension,
} from "@/constants";
import { Tile } from "@/schema/tile";
import gameReducer, { initialState } from "@/reducers/game-reducer";
  
type MoveDirection = "move_up" | "move_down" | "move_left" | "move_right";
type GameStatus = "ongoing" | "won" | "lost";
  
interface GameContextType {
    p1_score: number;
    p2_score: number;
    status: GameStatus;
    moveTiles: (direction: MoveDirection) => void;
    getTiles: () => Tile[];
    startGame: () => void;
}
  
export const GameContext = createContext<GameContextType>({
    p1_score: 0,
    p2_score: 0,
    status: "ongoing",
    moveTiles: () => {},
    getTiles: () => [],
    startGame: () => {},
});
  
export default function GameProvider({ children }: PropsWithChildren) {
    const [gameState, dispatch] = useReducer(gameReducer, initialState);
  
    const getEmptyCells = useCallback((): [number, number][] => {
      const results: [number, number][] = [];
      for (let x = 0; x < tileCountPerDimension; x++) {
        for (let y = 0; y < tileCountPerDimension; y++) {
          if (isNil(gameState.board[y][x])) {
            results.push([x, y]);
          }
        }
      }
      return results;
    }, [gameState.board]);
  
    const appendRandomTile = useCallback(() => {
      const emptyCells = getEmptyCells();
      if (emptyCells.length === 0) return;
  
      const cellIndex = Math.floor(Math.random() * emptyCells.length);
      const newTile: Omit<Tile, "id"> = {
        position: emptyCells[cellIndex],
        value: 2,
      };
  
      dispatch({ type: "create_tile", tile: newTile });
    }, [getEmptyCells]);
  
    const getTiles = useCallback(() => {
      return gameState.tilesByIds.map((id) => gameState.tiles[id]);
    }, [gameState.tilesByIds, gameState.tiles]);
  
    const moveTiles = useMemo(
        () =>
          throttle(
            (direction: MoveDirection) => dispatch({ type: direction }),
            mergeAnimationDuration * 1.05,
          ) as (direction: MoveDirection) => void,
        [dispatch]
    );
  
    const startGame = useCallback(() => {
      dispatch({ type: "reset_game" });
      appendRandomTile();
      appendRandomTile();
    }, [dispatch, appendRandomTile]);
  
    useEffect(() => {
    // Only check game state when the game hasn't changed and is ongoing
    if (gameState.hasChanged || gameState.status !== "ongoing") return;
    
    const { tiles, board } = gameState;
    
    // Check for win condition
    if (Object.values(tiles).some(t => t.value === gameWinTileValue)) {
      dispatch({ type: "update_status", status: "won" });
      return;
    }
    
    // Check if board is full
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) return; // Game can continue
  
    // Check for possible moves (adjacent tiles with same value)
    const maxIndex = tileCountPerDimension - 1;
    
    for (let x = 0; x <= maxIndex; x++) {
      for (let y = 0; y <= maxIndex; y++) {
        const tile = board[y][x]; // Note: board is [y][x]
        if (!tile) continue;
  
        // Check right neighbor
        if (x < maxIndex) {
          const right = board[y][x + 1];
          if (right && tiles[tile].value === tiles[right].value) return; // Move possible
        }
        
        // Check down neighbor  
        if (y < maxIndex) {
          const down = board[y + 1][x];
          if (down && tiles[tile].value === tiles[down].value) return; // Move possible
        }
      }
    }
  
    // No moves possible - game lost
    dispatch({ type: "update_status", status: "lost" });
  }, [gameState, getEmptyCells]);
  
    useEffect(() => {
      if (!gameState.hasChanged) return;
  
      const timer = setTimeout(() => {
        dispatch({ type: "clean_up" });
        appendRandomTile();
      }, mergeAnimationDuration);
  
      return () => clearTimeout(timer);
    }, [gameState.hasChanged, dispatch, appendRandomTile]);
  
    return (
        <GameContext.Provider
            value={{
                p1_score: gameState.p1_score,
                p2_score: gameState.p2_score,
                status: gameState.status as "ongoing" | "won" | "lost",
                getTiles,
                moveTiles,
                startGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
  
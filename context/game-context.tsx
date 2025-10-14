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
            { trailing: false }
          ) as (direction: MoveDirection) => void,
        [dispatch]
    );
  
    const startGame = useCallback(() => {
      dispatch({ type: "reset_game" });
      dispatch({ type: "create_tile", tile: { position: [0, 1], value: 2 } });
      dispatch({ type: "create_tile", tile: { position: [0, 2], value: 2 } });
    }, []);
  
    const checkGameState = useCallback(() => {
      const { tiles, board } = gameState;
    
      if (Object.values(tiles).some(t => t.value === gameWinTileValue)) {
        dispatch({ type: "update_status", status: "won" });
        return;
      }
    
      const maxIndex = tileCountPerDimension - 1;
    
      for (let x = 0; x < maxIndex; x++) {
        for (let y = 0; y < maxIndex; y++) {
          const tile = board[x][y];
          if (!tile) return; 
    
          const right = board[x + 1][y];
          const down = board[x][y + 1];
    
          if (!right || !down) return; 
          if (tiles[tile].value === tiles[right].value) return; 
          if (tiles[tile].value === tiles[down].value) return; 
        }
      }
    
      dispatch({ type: "update_status", status: "lost" });
    }, [gameState, dispatch]);
  
    useEffect(() => {
      if (!gameState.hasChanged) {
        checkGameState();
      }
    }, [gameState.hasChanged, checkGameState]);
  
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
  
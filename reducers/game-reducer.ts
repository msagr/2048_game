import { TileMap } from "@/schema/tile";
import { Tile } from "@/schema/tile";
import { tileCountPerDimension } from "@/constants";
import { flattenDeep, isEqual, isNil } from "lodash";
import { uid } from "uid";

type GameStatus = "ongoing" | "won" | "lost" | "p1_wins" | "p2_wins" | "draw";
type PlayerTurn = "p1" | "p2";

type State = {
    board: string[][];
    tiles: TileMap;
    tilesByIds: string[];
    hasChanged: boolean;
    p1_score: number;
    p2_score: number;
    status: GameStatus;
    activePlayer: PlayerTurn;
    turnCount: number;
};

type Action =
  | { type: "create_tile"; tile: Tile }
  | { type: "clean_up" }
  | { type: "move_up" }
  | { type: "move_down" }
  | { type: "move_left" }
  | { type: "move_right" }
  | { type: "reset_game" }
  | { type: "start_game" }
  | { type: "update_status"; status: GameStatus };


function createBoard() {
    const board: string[][] = [];
  
    for (let i = 0; i < tileCountPerDimension; i += 1) {
      board[i] = new Array(tileCountPerDimension).fill(undefined);
    }
  
    return board;
}

export const initialState: State = {
    board: createBoard(),
    tiles: {},
    tilesByIds: [],
    hasChanged: false,
    p1_score: 0,
    p2_score: 0,
    status: "ongoing",
    activePlayer: "p1",
    turnCount: 1,
};

export default function gameReducer(state: State = initialState, action: Action): State {
    switch(action.type) {
        case "clean_up": {
            const flattenBoard = flattenDeep(state.board);
            const newTiles: TileMap = flattenBoard.reduce(
              (result, tileId: string) => {
                if (isNil(tileId)) {
                  return result;
                }
      
                return {
                  ...result,
                  [tileId]: state.tiles[tileId],
                };
              },
              {},
            );
            
            // Switch to next player after cleanup (which happens after each move)
            const newTurnCount = state.turnCount + 1;
            const newActivePlayer = (newTurnCount % 2 === 1 ? "p1" : "p2") as PlayerTurn;
      
            return {
              ...state,
              tiles: newTiles,
              tilesByIds: Object.keys(newTiles),
              hasChanged: false,
              turnCount: newTurnCount,
              activePlayer: newActivePlayer,
            };
        }
        case "create_tile": {
            const tileId = uid();
            const [x, y] = action.tile.position;
            const newBoard = JSON.parse(JSON.stringify(state.board));
            newBoard[y][x] = tileId;
      
            return {
              ...state,
              board: newBoard,
              tiles: {
                ...state.tiles,
                [tileId]: {
                  id: tileId,
                  ...action.tile,
                },
              },
              tilesByIds: [...state.tilesByIds, tileId],
            };
        }
        case "move_up": {
            const newBoard = createBoard();
            const newTiles: TileMap = {};
            let hasChanged = false;
            let { p1_score, p2_score } = state;
      
            for (let x = 0; x < tileCountPerDimension; x++) {
              let newY = 0;
              let previousTile: Tile | undefined;
      
              for (let y = 0; y < tileCountPerDimension; y++) {
                const tileId = state.board[y][x];
                const currentTile = state.tiles[tileId];
      
                if (!isNil(tileId)) {
                  if (previousTile?.value === currentTile.value) {
                    if(state.activePlayer === "p1") {
                        p1_score += previousTile.value * 2;
                    } else {
                        p2_score += previousTile.value * 2;
                    }
                    newTiles[previousTile.id as string] = {
                      ...previousTile,
                      value: previousTile.value * 2,
                    };
                    newTiles[tileId] = {
                      ...currentTile,
                      position: [x, newY - 1],
                    };
                    previousTile = undefined;
                    hasChanged = true;
                    continue;
                  }
      
                  newBoard[newY][x] = tileId;
                  newTiles[tileId] = {
                    ...currentTile,
                    position: [x, newY],
                  };
                  previousTile = newTiles[tileId];
                  if (!isEqual(currentTile.position, [x, newY])) {
                    hasChanged = true;
                  }
                  newY++;
                }
              }
            }
            return {
              ...state,
              board: newBoard,
              tiles: newTiles,
              hasChanged,
              p1_score,
              p2_score,
            };
          }
          case "move_down": {
            const newBoard = createBoard();
            const newTiles: TileMap = {};
            let hasChanged = false;
            let { p1_score, p2_score } = state;
      
            for (let x = 0; x < tileCountPerDimension; x++) {
              let newY = tileCountPerDimension - 1;
              let previousTile: Tile | undefined;
      
              for (let y = tileCountPerDimension - 1; y >= 0; y--) {
                const tileId = state.board[y][x];
                const currentTile = state.tiles[tileId];
      
                if (!isNil(tileId)) {
                  if (previousTile?.value === currentTile.value) {
                    if(state.activePlayer === "p1") {
                        p1_score += previousTile.value * 2;
                    } else {
                        p2_score += previousTile.value * 2;
                    }
                    newTiles[previousTile.id as string] = {
                      ...previousTile,
                      value: previousTile.value * 2,
                    };
                    newTiles[tileId] = {
                      ...currentTile,
                      position: [x, newY + 1],
                    };
                    previousTile = undefined;
                    hasChanged = true;
                    continue;
                  }
      
                  newBoard[newY][x] = tileId;
                  newTiles[tileId] = {
                    ...currentTile,
                    position: [x, newY],
                  };
                  previousTile = newTiles[tileId];
                  if (!isEqual(currentTile.position, [x, newY])) {
                    hasChanged = true;
                  }
                  newY--;
                }
              }
            }
            return {
              ...state,
              board: newBoard,
              tiles: newTiles,
              hasChanged,
              p1_score,
              p2_score,
            };

        }
        case "move_left": {
            const newBoard = createBoard();
            const newTiles: TileMap = {};
            let hasChanged = false;
            let { p1_score, p2_score } = state;
      
            for (let y = 0; y < tileCountPerDimension; y++) {
              let newX = 0;
              let previousTile: Tile | undefined;
      
              for (let x = 0; x < tileCountPerDimension; x++) {
                const tileId = state.board[y][x];
                const currentTile = state.tiles[tileId];
      
                if (!isNil(tileId)) {
                  if (previousTile?.value === currentTile.value) {
                    if(state.activePlayer === "p1") {
                        p1_score += previousTile.value * 2;
                    } else {
                        p2_score += previousTile.value * 2;
                    }
                    newTiles[previousTile.id as string] = {
                      ...previousTile,
                      value: previousTile.value * 2,
                    };
                    newTiles[tileId] = {
                      ...currentTile,
                      position: [newX - 1, y],
                    };
                    previousTile = undefined;
                    hasChanged = true;
                    continue;
                  }
      
                  newBoard[y][newX] = tileId;
                  newTiles[tileId] = {
                    ...currentTile,
                    position: [newX, y],
                  };
                  previousTile = newTiles[tileId];
                  if (!isEqual(currentTile.position, [newX, y])) {
                    hasChanged = true;
                  }
                  newX++;
                }
              }
            }
            return {
              ...state,
              board: newBoard,
              tiles: newTiles,
              hasChanged,
              p1_score,
              p2_score,
            };
          }
          case "move_right": {
            const newBoard = createBoard();
            const newTiles: TileMap = {};
            let hasChanged = false;
            let { p1_score, p2_score } = state;
      
            for (let y = 0; y < tileCountPerDimension; y++) {
              let newX = tileCountPerDimension - 1;
              let previousTile: Tile | undefined;
      
              for (let x = tileCountPerDimension - 1; x >= 0; x--) {
                const tileId = state.board[y][x];
                const currentTile = state.tiles[tileId];
      
                if (!isNil(tileId)) {
                  if (previousTile?.value === currentTile.value) {
                    if(state.activePlayer === "p1") {
                        p1_score += previousTile.value * 2;
                    } else {
                        p2_score += previousTile.value * 2;
                    }
                    newTiles[previousTile.id as string] = {
                      ...previousTile,
                      value: previousTile.value * 2,
                    };
                    newTiles[tileId] = {
                      ...currentTile,
                      position: [newX + 1, y],
                    };
                    previousTile = undefined;
                    hasChanged = true;
                    continue;
                  }
      
                  newBoard[y][newX] = tileId;
                  newTiles[tileId] = {
                    ...state.tiles[tileId],
                    position: [newX, y],
                  };
                  previousTile = newTiles[tileId];
                  if (!isEqual(currentTile.position, [newX, y])) {
                    hasChanged = true;
                  }
                  newX--;
                }
              }
            }
            return {
              ...state,
              board: newBoard,
              tiles: newTiles,
              hasChanged,
              p1_score,
              p2_score,
            };
          }
          case "reset_game":
            return initialState;
          case "start_game": {
            // Create fresh board with two random tiles
            const newBoard = createBoard();
            const newTiles: TileMap = {};
            const tilesByIds: string[] = [];
            
            // Generate all possible positions
            const allPositions: [number, number][] = [];
            for (let x = 0; x < tileCountPerDimension; x++) {
              for (let y = 0; y < tileCountPerDimension; y++) {
                allPositions.push([x, y]);
              }
            }
            
            // Select two random positions
            const firstIndex = Math.floor(Math.random() * allPositions.length);
            const firstPosition = allPositions[firstIndex];
            const remainingPositions = allPositions.filter((_, index) => index !== firstIndex);
            const secondIndex = Math.floor(Math.random() * remainingPositions.length);
            const secondPosition = remainingPositions[secondIndex];
            
            // Create first tile
            const firstTileId = uid();
            const [x1, y1] = firstPosition;
            newBoard[y1][x1] = firstTileId;
            newTiles[firstTileId] = {
              id: firstTileId,
              position: firstPosition,
              value: 2,
            };
            tilesByIds.push(firstTileId);
            
            // Create second tile
            const secondTileId = uid();
            const [x2, y2] = secondPosition;
            newBoard[y2][x2] = secondTileId;
            newTiles[secondTileId] = {
              id: secondTileId,
              position: secondPosition,
              value: 2,
            };
            tilesByIds.push(secondTileId);
            
            return {
              ...initialState,
              board: newBoard,
              tiles: newTiles,
              tilesByIds,
              turnCount: 1,
              activePlayer: "p1",
            };
          }
          case "update_status":
            return {
              ...state,
              status: action.status,
            };
          default:
            return state;
    }
}
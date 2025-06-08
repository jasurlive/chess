import { useEffect, useState } from "react";
import Chessboard1 from "../pages/chessboard-1";
import getCustomPieces from "./pieces";
import { handleMoveSounds, playGameStartSound } from "./sound";
import GameLogic from "./GameLogic";
import { useClickMove } from "./Click";

export default function ChessGame1() {
  const [gameLogic, setGameLogic] = useState(new GameLogic());
  const [fen, setFen] = useState(gameLogic.getFen());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );
  const customPieces = getCustomPieces();

  useEffect(() => {
    setFen(gameLogic.getFen());
    playGameStartSound();
  }, []);

  const {
    onDrop,
    onSquareClick,
    customSquareStyles,
  } = useClickMove({
    gameLogic,
    setGameLogic,
    boardOrientation,
    setBoardOrientation,
    fen,
    setFen,
    handleMoveSounds,
  });

  return (
    <div>
      <Chessboard1
        position={fen}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        boardOrientation={boardOrientation}
        customPieces={customPieces}
        customSquareStyles={customSquareStyles}
      />
    </div>
  );
}

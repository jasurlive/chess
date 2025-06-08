import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import AnalysisBoard from "../pages/analysis-all";
import getCustomPieces from "./pieces";
import { handleMoveSounds, playGameStartSound } from "./sound";
import { useClickMove } from "./Click";
import GameLogic from "./GameLogic";

export default function ChessGameAnalysis() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const customPieces = getCustomPieces();

  // Wrap Chess.js in GameLogic for click logic compatibility
  const [gameLogic, setGameLogic] = useState(() => new GameLogic(game.fen()));

  useEffect(() => {
    setFen(game.fen());
    playGameStartSound();
    setGameLogic(new GameLogic(game.fen()));
  }, []);

  // Use click logic hook
  const {
    onDrop,
    onSquareClick,
    customSquareStyles,
    customPieces: clickCustomPieces,
  } = useClickMove({
    fen,
    setFen,
    gameLogic,
    setGameLogic,
    boardOrientation: "white",
    setBoardOrientation: () => {},
  });

  // Get turn from gameLogic (assumes .getInstance().turn() returns "w" or "b")
  let turn: "white" | "black" = "white";
  try {
    const t = gameLogic.getInstance().turn?.();
    if (t === "b") turn = "black";
  } catch {}

  return (
    <div>
      <AnalysisBoard
        position={fen}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        boardOrientation="white"
        customPieces={clickCustomPieces}
        customSquareStyles={customSquareStyles}
        turn={turn}
      />
    </div>
  );
}

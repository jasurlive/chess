import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import AnalysisBoard from "../pages/analysis-all";
import getCustomPieces from "./pieces";
import { handleMoveSounds, playGameStartSound } from "./sound";
import { useClickMove } from "./Click";
import GameLogic from "./GameLogic";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function ChessGameAnalysis() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const customPieces = getCustomPieces();

  // Move history for navigation
  const [history, setHistory] = useState<string[]>([game.fen()]);
  const [currentMove, setCurrentMove] = useState(0);

  // Wrap Chess.js in GameLogic for click logic compatibility
  const [gameLogic, setGameLogic] = useState(() => new GameLogic(game.fen()));

  useEffect(() => {
    setFen(game.fen());
    playGameStartSound();
    setGameLogic(new GameLogic(game.fen()));
    setHistory([game.fen()]);
    setCurrentMove(0);
  }, []);

  // Use click logic hook
  const {
    onDrop,
    onSquareClick,
    customSquareStyles,
    customPieces: clickCustomPieces,
  } = useClickMove({
    fen,
    setFen: (newFen: string) => {
      setFen(newFen);
      // If a new move is made, update history
      setHistory((prev) => {
        const updated = prev.slice(0, currentMove + 1).concat(newFen);
        setCurrentMove(updated.length - 1);
        return updated;
      });
    },
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

  // Move navigation handlers
  const handleBack = () => {
    if (currentMove > 0) {
      const prevFen = history[currentMove - 1];
      setFen(prevFen);
      setCurrentMove(currentMove - 1);
      setGameLogic(new GameLogic(prevFen));
    }
  };

  const handleForward = () => {
    if (currentMove < history.length - 1) {
      const nextFen = history[currentMove + 1];
      setFen(nextFen);
      setCurrentMove(currentMove + 1);
      setGameLogic(new GameLogic(nextFen));
    }
  };

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
      <div className="analysis-arrows-container">
        <button
          onClick={handleBack}
          disabled={currentMove === 0}
          className={`analysis-arrow-btn${
            currentMove === 0 ? " disabled" : ""
          }`}
          aria-label="Back"
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          onClick={handleForward}
          disabled={currentMove === history.length - 1}
          className={`analysis-arrow-btn${
            currentMove === history.length - 1 ? " disabled" : ""
          }`}
          aria-label="Forward"
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}

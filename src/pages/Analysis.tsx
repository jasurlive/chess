import { useEffect, useState } from "react";
import Chessboard from "../tools/Chessboard";
import GameLogic from "../tools/logic";
import { useClickMove } from "../tools/click";
import { playGameStartSound } from "../tools/sound";
import PGN from "../tools/PGN";
import "../css/analysis.css";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function Analysis() {
  const [gameLogic, setGameLogic] = useState(new GameLogic());
  const [fen, setFen] = useState(gameLogic.getFen());
  const [history, setHistory] = useState([gameLogic.getFen()]);
  const [moves, setMoves] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState(0);

  useEffect(() => playGameStartSound(), []);

  const { onSquareClick, customSquareStyles } = useClickMove({
    gameLogic,
    setGameLogic,
    setFen: (newFen: string) => {
      setFen(newFen);
      setHistory((prev) => {
        const updated = [...prev.slice(0, currentMove + 1), newFen];
        setCurrentMove(updated.length - 1);
        return updated;
      });
    },
    onMove: (move) => setMoves((m) => [...m.slice(0, currentMove), move.san]),
  });

  const goTo = (index: number) => {
    setCurrentMove(index);
    setFen(history[index]);
    setGameLogic(new GameLogic(history[index]));
  };

  return (
    <div className="game-page">
      <div className="game-board-area">
        <Chessboard
          position={fen}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
        />
      </div>
      <div className="game-sidebar">
        <div className="analysis-arrows-container">
          <button
            onClick={() => goTo(currentMove - 1)}
            disabled={currentMove === 0}
            className="analysis-arrow-btn"
            aria-label="Back"
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <button
            onClick={() => goTo(currentMove + 1)}
            disabled={currentMove === history.length - 1}
            className="analysis-arrow-btn"
            aria-label="Forward"
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
        <PGN moves={moves} />
      </div>
    </div>
  );
}

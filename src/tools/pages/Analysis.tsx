import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiRefreshCw } from "react-icons/fi";
import Chessboard from "../components/Chessboard";
import PGN from "../components/PGN";
import GameStatus from "../components/GameStatus";
import GameLogic from "../lib/logic";
import { playGameStartSound } from "../lib/sound";
import { useClickMove } from "../hooks/LOCAL/useClickMove";
import { useShortcuts } from "../hooks/LOCAL/useShortcuts";
import "../css/game.css";

// free board: play moves, step back and forth, branch off from any point
export default function Analysis() {
  const [game, setGame] = useState(0);
  return <Board key={game} onNewGame={() => setGame((g) => g + 1)} />;
}

function Board({ onNewGame }: { onNewGame: () => void }) {
  const [gameLogic, setGameLogic] = useState(() => new GameLogic());
  const [history, setHistory] = useState([gameLogic.getFen()]);
  const [moves, setMoves] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => playGameStartSound(), []);

  const { onSquareClick, customSquareStyles, turn, status } = useClickMove({
    gameLogic,
    setGameLogic,
    // a new move from an earlier position drops the moves after it
    setFen: (fen) => {
      setHistory((h) => [...h.slice(0, current + 1), fen]);
      setCurrent(current + 1);
    },
    onMove: (move) => setMoves((m) => [...m.slice(0, current), move.san]),
  });

  const goTo = (index: number) => {
    const i = Math.max(0, Math.min(history.length - 1, index));
    setCurrent(i);
    setGameLogic(new GameLogic(history[i]));
  };

  useShortcuts({
    arrowleft: () => goTo(current - 1),
    arrowright: () => goTo(current + 1),
    arrowup: () => goTo(0),
    arrowdown: () => goTo(history.length - 1),
    f: () => setFlipped((f) => !f),
  });

  return (
    <div className="game-page">
      <div className="game-board-area">
        <Chessboard
          position={history[current]}
          boardOrientation={flipped ? "black" : "white"}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
        />
      </div>
      <aside className="game-sidebar">
        <GameStatus turn={turn} status={status} onNewGame={onNewGame} />
        <div className="analysis-nav">
          <button type="button" className="page-button" onClick={() => goTo(0)} disabled={current === 0} title="Start (↑)">
            <FiChevronsLeft />
          </button>
          <button type="button" className="page-button" onClick={() => goTo(current - 1)} disabled={current === 0} title="Back (←)">
            <FiChevronLeft />
          </button>
          <button
            type="button"
            className="page-button"
            onClick={() => goTo(current + 1)}
            disabled={current === history.length - 1}
            title="Forward (→)"
          >
            <FiChevronRight />
          </button>
          <button
            type="button"
            className="page-button"
            onClick={() => goTo(history.length - 1)}
            disabled={current === history.length - 1}
            title="Latest (↓)"
          >
            <FiChevronsRight />
          </button>
          <button type="button" className="page-button" onClick={() => setFlipped((f) => !f)} title="Flip board (F)">
            <FiRefreshCw />
          </button>
        </div>
        <PGN moves={moves} current={current} />
      </aside>
    </div>
  );
}

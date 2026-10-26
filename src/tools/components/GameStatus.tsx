import { FiRotateCcw } from "react-icons/fi";

// whose turn / check / result, plus a new-game button
export default function GameStatus({
  turn,
  status,
  onNewGame,
}: {
  turn: "white" | "black";
  status: string | null;
  onNewGame: () => void;
}) {
  return (
    <div className="game-status">
      <span className={`turn-dot turn-${turn}`} aria-hidden />
      <span className="game-status-text">{status && status !== "Check" ? status : `${turn === "white" ? "White" : "Black"} to move${status ? " (check)" : ""}`}</span>
      <button type="button" className="page-button" onClick={onNewGame} title="New game">
        <FiRotateCcw />
      </button>
    </div>
  );
}

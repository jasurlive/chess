import { useEffect, useState } from "react";
import Chessboard from "../components/Chessboard";
import PGN from "../components/PGN";
import Time from "../components/Time";
import GameStatus from "../components/GameStatus";
import GameLogic from "../lib/logic";
import { playGameStartSound } from "../lib/sound";
import { useClickMove } from "../hooks/LOCAL/useClickMove";
import "../css/game.css";

// one device on the table between two players: board stays put, pieces turn to face whoever is to move
export default function Chess2() {
  const [game, setGame] = useState(0);
  return <Game key={game} onNewGame={() => setGame((g) => g + 1)} />;
}

function Game({ onNewGame }: { onNewGame: () => void }) {
  const [gameLogic, setGameLogic] = useState(() => new GameLogic());
  const [fen, setFen] = useState(gameLogic.getFen());
  const [moves, setMoves] = useState<string[]>([]);

  useEffect(() => playGameStartSound(), []);

  const { onSquareClick, customSquareStyles, turn, status } = useClickMove({
    gameLogic,
    setGameLogic,
    setFen,
    onMove: (move) => {
      setMoves((m) => [...m, move.san]);
    },
  });

  return (
    <div className="game-page">
      <div className="game-board-area">
        <Chessboard
          position={fen}
          rotatePieces={turn === "black"}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
        />
      </div>
      <aside className="game-sidebar">
        <GameStatus turn={turn} status={status} onNewGame={onNewGame} />
        <Time turn={turn} stopped={gameLogic.getInstance().isGameOver()} />
        <PGN moves={moves} />
      </aside>
    </div>
  );
}

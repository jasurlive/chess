import { useEffect, useState } from "react";
import Chessboard from "../tools/Chessboard";
import GameLogic from "../tools/logic";
import { useClickMove } from "../tools/click";
import { playGameStartSound } from "../tools/sound";
import PGN from "../tools/PGN";
import Time from "../tools/Time";

export default function Chess2() {
  const [gameLogic, setGameLogic] = useState(new GameLogic());
  const [fen, setFen] = useState(gameLogic.getFen());
  const [moves, setMoves] = useState<string[]>([]);

  useEffect(() => playGameStartSound(), []);

  const { onSquareClick, customSquareStyles, turn } = useClickMove({
    gameLogic,
    setGameLogic,
    setFen,
    onMove: (move) => setMoves((m) => [...m, move.san]),
  });

  return (
    <div className="game-page">
      <div className="game-board-area">
        <Chessboard
          position={fen}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
          rotatePieces={turn === "black"}
        />
      </div>
      <div className="game-sidebar">
        <Time turn={turn} />
        <PGN moves={moves} />
      </div>
    </div>
  );
}

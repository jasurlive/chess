import { useEffect, useState } from "react";
import Chessboard from "../tools/Chessboard";
import GameLogic from "../tools/logic";
import { useClickMove } from "../tools/click";
import { playGameStartSound } from "../tools/sound";
import PGN from "../tools/PGN";
import Time from "../tools/Time";

export default function Chess1() {
  const [gameLogic, setGameLogic] = useState(new GameLogic());
  const [fen, setFen] = useState(gameLogic.getFen());
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [moves, setMoves] = useState<string[]>([]);

  useEffect(() => playGameStartSound(), []);

  const { onSquareClick, customSquareStyles, turn } = useClickMove({
    gameLogic,
    setGameLogic,
    setFen,
    onMove: (move) => {
      setMoves((m) => [...m, move.san]);
      setOrientation((o) => (o === "white" ? "black" : "white"));
    },
  });

  return (
    <div className="game-page">
      <div className="game-board-area">
        <Chessboard
          position={fen}
          boardOrientation={orientation}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
        />
      </div>
      <div className="game-sidebar">
        <Time turn={turn} />
        <PGN moves={moves} />
      </div>
    </div>
  );
}

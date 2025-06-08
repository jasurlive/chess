import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import AnalysisBoard from "../pages/analysis-all";
import getCustomPieces from "./pieces";
import { handleMoveSounds, playGameStartSound } from "./sound";

export default function ChessGameAnalysis() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const customPieces = getCustomPieces();

  useEffect(() => {
    setFen(game.fen());
    playGameStartSound();
  }, []);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({ from: sourceSquare, to: targetSquare });

    if (move) {
      setGame(newGame);
      setFen(newGame.fen());
      handleMoveSounds(newGame, move);
      return true;
    }

    handleMoveSounds(newGame, null);
    return false;
  };

  return (
    <div>
      <AnalysisBoard
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation="white"
        customPieces={customPieces}
      />
    </div>
  );
}

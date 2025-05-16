import { useEffect, useState } from "react";
import Chessboard1 from "../pages/chessboard-1";
import getCustomPieces from "./pieces";
import { handleMoveSounds, playGameStartSound } from "./sound";
import GameLogic from "./GameLogic";

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

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const logic = new GameLogic(gameLogic.getFen());
    const result = logic.move(sourceSquare, targetSquare, "q");

    if (result.valid) {
      setGameLogic(logic);
      setFen(result.updatedFen);
      setBoardOrientation((prev) => (prev === "white" ? "black" : "white"));
      handleMoveSounds(logic.getInstance(), result.move);

      const status = result.gameStatus;

      if (status.isCheckmate) console.log("Checkmate!");
      else if (status.isStalemate) console.log("Stalemate!");
      else if (status.isThreefoldRepetition) console.log("Draw by repetition!");
      else if (status.isFiftyMoveRule)
        console.log("Draw by 50-move rule or insufficient material!");
      else if (status.isCheck) console.log("Check!");

      return true;
    }

    handleMoveSounds(logic.getInstance(), null);
    return false;
  };

  return (
    <div>
      <Chessboard1
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation={boardOrientation}
        customPieces={customPieces}
      />
    </div>
  );
}

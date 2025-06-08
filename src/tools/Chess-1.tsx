import { useEffect, useState } from "react";
import Chessboard1 from "../pages/chessboard-1";
import getCustomPieces from "./pieces";
import { handleMoveSounds, playGameStartSound } from "./sound";
import GameLogic from "./GameLogic";
import Click from "./Click";

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

  return (
    <div>
      <Click
        ChessboardComponent={Chessboard1}
        fen={fen}
        setFen={setFen}
        gameLogic={gameLogic}
        setGameLogic={setGameLogic}
        boardOrientation={boardOrientation}
        setBoardOrientation={setBoardOrientation}
        handleMoveSounds={handleMoveSounds}
      />
    </div>
  );
}

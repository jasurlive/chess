import { useEffect, useState } from "react";
import Chessboard2 from "../pages/chessboard-2";
import getCustomPieces from "./pieces";
import { handleMoveSounds, playGameStartSound } from "./sound";
import GameLogic from "./GameLogic";
import Click from "./Click";

export default function ChessGame2() {
  const [gameLogic, setGameLogic] = useState(new GameLogic());
  const [fen, setFen] = useState(gameLogic.getFen());

  useEffect(() => {
    setFen(gameLogic.getFen());
    playGameStartSound();
  }, []);

  return (
    <div>
      <Click
        ChessboardComponent={Chessboard2}
        fen={fen}
        setFen={setFen}
        gameLogic={gameLogic}
        setGameLogic={setGameLogic}
        boardOrientation="white"
        setBoardOrientation={() => {}}
        handleMoveSounds={handleMoveSounds}
      />
    </div>
  );
}

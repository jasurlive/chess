import { useState } from "react";
import Chessboard1 from "../pages/chessboard-1";
import GameLogic from "./GameLogic";
import getCustomPieces from "./pieces";

type ClickProps = {
  fen: string;
  setFen: (fen: string) => void;
  gameLogic: GameLogic;
  setGameLogic: (logic: GameLogic) => void;
  boardOrientation: "white" | "black";
  setBoardOrientation: (o: "white" | "black") => void;
  handleMoveSounds?: (game: any, move: any) => void;
};

// This file is now a utility hook for click-to-move logic if you want to use it elsewhere
export function useClickMove({
  gameLogic,
  setGameLogic,
  boardOrientation,
  setBoardOrientation,
  fen,
  setFen,
  handleMoveSounds,
}: ClickProps) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const customPieces = getCustomPieces();

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const logic = new GameLogic(gameLogic.getFen());
    const result = logic.move(sourceSquare, targetSquare, "q");

    if (result.valid) {
      setGameLogic(logic);
      setFen(result.updatedFen);
      setBoardOrientation(boardOrientation === "white" ? "black" : "white");
      if (handleMoveSounds) handleMoveSounds(logic.getInstance(), result.move);

      setSelectedSquare(null);
      setPossibleMoves([]);
      return true;
    }

    if (handleMoveSounds) handleMoveSounds(logic.getInstance(), null);
    setSelectedSquare(null);
    setPossibleMoves([]);
    return false;
  };

  const onSquareClick = (square: string) => {
    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setPossibleMoves([]);
      } else {
        const moved = onDrop(selectedSquare, square);
        setPossibleMoves([]);
        if (!moved) setSelectedSquare(null);
      }
    } else {
      const chess = gameLogic.getInstance();
      const piece = chess.get(square as any);
      if (piece && piece.color === chess.turn()) {
        setSelectedSquare(square);
        const moves = chess.moves({ square: square as any, verbose: true });
        setPossibleMoves(moves.map((m: any) => m.to));
      } else {
        setPossibleMoves([]);
      }
    }
  };

  // Generate customSquareStyles for highlighting and dots
  const customSquareStyles: Record<string, React.CSSProperties> = {};
  if (selectedSquare) {
    customSquareStyles[selectedSquare] = {
      background:
        "radial-gradient(circle,rgb(251, 251, 159) 60%, #baca44 100%)",
    };
  }
  possibleMoves.forEach((sq) => {
    customSquareStyles[sq] = {
      ...customSquareStyles[sq],
      background:
        (customSquareStyles[sq]?.background
          ? customSquareStyles[sq].background + ", "
          : "") +
        "radial-gradient(circle, rgba(30,30,30,0.3) 25%, transparent 26%)",
    };
  });

  return {
    selectedSquare,
    possibleMoves,
    onDrop,
    onSquareClick,
    setSelectedSquare,
    setPossibleMoves,
    customPieces,
    customSquareStyles,
  };
}

export default function Click({
  fen,
  setFen,
  gameLogic,
  setGameLogic,
  boardOrientation,
  setBoardOrientation,
}: ClickProps) {
  const {
    selectedSquare,
    possibleMoves,
    onDrop,
    onSquareClick,
    customPieces,
    customSquareStyles,
  } = useClickMove({
    gameLogic,
    setGameLogic,
    boardOrientation,
    setBoardOrientation,
    fen,
    setFen,
  });

  return (
    <Chessboard1
      position={fen}
      onPieceDrop={onDrop}
      onSquareClick={onSquareClick}
      boardOrientation={boardOrientation}
      customPieces={customPieces}
      customSquareStyles={customSquareStyles}
    />
  );
}

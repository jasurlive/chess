import { useState } from "react";
import type { CSSProperties } from "react";
import type { Move } from "chess.js";
import GameLogic from "./logic";
import { handleMoveSounds } from "./sound";

type Args = {
  gameLogic: GameLogic;
  setGameLogic: (logic: GameLogic) => void;
  setFen: (fen: string) => void;
  onMove?: (move: Move) => void; // e.g. flip board orientation, record PGN
};

export function useClickMove({ gameLogic, setGameLogic, setFen, onMove }: Args) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

  const move = (from: string, to: string) => {
    const logic = new GameLogic(gameLogic.getFen());
    const result = logic.move(from, to, "q");

    handleMoveSounds(logic.getInstance(), result.move);
    setSelectedSquare(null);
    setPossibleMoves([]);

    if (result.valid && result.move) {
      setGameLogic(logic);
      setFen(result.updatedFen);
      onMove?.(result.move);
    }
    return result.valid;
  };

  const onSquareClick = (square: string) => {
    if (selectedSquare) {
      if (selectedSquare !== square) move(selectedSquare, square);
      else {
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
      return;
    }

    const chess = gameLogic.getInstance();
    const piece = chess.get(square as any);
    if (piece && piece.color === chess.turn()) {
      setSelectedSquare(square);
      setPossibleMoves(chess.moves({ square: square as any, verbose: true }).map((m: any) => m.to));
    }
  };

  const customSquareStyles: Record<string, CSSProperties> = {};
  if (selectedSquare) {
    customSquareStyles[selectedSquare] = {
      background: "radial-gradient(circle, rgb(251,251,159) 60%, #baca44 100%)",
    };
  }
  possibleMoves.forEach((sq) => {
    customSquareStyles[sq] = {
      background: "radial-gradient(circle, rgba(30,30,30,0.3) 25%, transparent 26%)",
    };
  });

  return {
    onSquareClick,
    customSquareStyles,
    turn: gameLogic.getTurn() === "b" ? "black" : "white",
  } as const;
}

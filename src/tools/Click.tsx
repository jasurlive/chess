import { useState } from "react";
import getCustomPieces from "./pieces";
import GameLogic from "./GameLogic";
import { handleMoveSounds } from "./sound"; // <-- Import here

type ClickProps = {
  fen: string;
  setFen: (fen: string) => void;
  gameLogic: GameLogic;
  setGameLogic: (logic: GameLogic) => void;
  boardOrientation: "white" | "black";
  setBoardOrientation: (o: "white" | "black") => void;
  ChessboardComponent: React.ComponentType<any>;
  // Accept extra props for chessboard
  [key: string]: any;
};

export function useClickMove({
  gameLogic,
  setGameLogic,
  boardOrientation,
  setBoardOrientation,
  fen,
  setFen,
}: Omit<ClickProps, "ChessboardComponent">) {
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
      handleMoveSounds(logic.getInstance(), result.move); // Always play sound
      setSelectedSquare(null);
      setPossibleMoves([]);
      return true;
    }

    handleMoveSounds(logic.getInstance(), null); // Play error sound
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

export default function Click(props: ClickProps) {
  const {
    fen,
    setFen,
    gameLogic,
    setGameLogic,
    boardOrientation,
    setBoardOrientation,
    ChessboardComponent,
    ...rest
  } = props;

  const { onDrop, onSquareClick, customPieces, customSquareStyles } =
    useClickMove({
      fen,
      setFen,
      gameLogic,
      setGameLogic,
      boardOrientation,
      setBoardOrientation,
    });

  // Get turn from gameLogic (assumes .getInstance().turn() returns "w" or "b")
  let turn: "white" | "black" = "white";
  try {
    const t = gameLogic.getInstance().turn?.();
    if (t === "b") turn = "black";
  } catch {}

  return (
    <ChessboardComponent
      position={fen}
      onPieceDrop={onDrop}
      onSquareClick={onSquareClick}
      boardOrientation={boardOrientation}
      customPieces={customPieces}
      customSquareStyles={customSquareStyles}
      turn={turn}
      {...rest}
    />
  );
}

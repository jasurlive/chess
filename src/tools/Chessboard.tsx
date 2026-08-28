import type { ReactNode, CSSProperties } from "react";
import getCustomPieces from "./pieces";
import "../css/chessboard.css";

type ChessboardProps = {
  position: string;
  boardOrientation?: "white" | "black"; // flips the whole board
  rotatePieces?: boolean; // flips piece sprites only (fixed board, "pass and play" mode)
  onSquareClick?: (square: string) => void;
  customSquareStyles?: Record<string, CSSProperties>;
};

const PIECE_MAP: Record<string, string> = {
  P: "wP", N: "wN", B: "wB", R: "wR", Q: "wQ", K: "wK",
  p: "bP", n: "bN", b: "bB", r: "bR", q: "bQ", k: "bK",
};

export default function Chessboard({
  position,
  boardOrientation = "white",
  rotatePieces = false,
  onSquareClick,
  customSquareStyles = {},
}: ChessboardProps) {
  const pieces = getCustomPieces();
  const rows = position.split(" ")[0].split("/");
  const squares: ReactNode[] = [];

  rows.forEach((row, rank) => {
    let file = 0;
    for (const char of row) {
      const n = Number(char);
      const count = Number.isNaN(n) ? 1 : n;

      for (let i = 0; i < count; i++) {
        const square = `${String.fromCharCode(97 + file)}${8 - rank}`;
        const Piece = pieces[PIECE_MAP[char]];

        squares.push(
          <div
            key={square}
            className={`chess-square ${(rank + file) % 2 ? "dark" : "light"}`}
            style={customSquareStyles[square]}
            onClick={() => onSquareClick?.(square)}
          >
            {Piece && (
              <div className={`chess-piece${rotatePieces ? " piece-rotated" : ""}`}>
                <Piece />
              </div>
            )}
          </div>
        );
        file++;
      }
    }
  });

  if (boardOrientation === "black") squares.reverse();

  return (
    <div className="chessboard-wrapper">
      <div className="chessboard">{squares}</div>
    </div>
  );
}

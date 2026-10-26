import type { CSSProperties, ReactNode } from "react";
import "../css/chessboard.css";

type ChessboardProps = {
  position: string;
  boardOrientation?: "white" | "black"; // flips the whole board
  rotatePieces?: boolean; // turns piece sprites upside down (fixed board, face-to-face mode)
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
  const rows = position.split(" ")[0].split("/");
  const squares: ReactNode[] = [];

  rows.forEach((row, rank) => {
    let file = 0;
    for (const char of row) {
      const n = Number(char);
      const count = Number.isNaN(n) ? 1 : n;

      for (let i = 0; i < count; i++) {
        const square = `${String.fromCharCode(97 + file)}${8 - rank}`;
        const piece = PIECE_MAP[char];

        squares.push(
          <button
            type="button"
            key={square}
            className={`chess-square ${(rank + file) % 2 ? "dark" : "light"}`}
            style={customSquareStyles[square]}
            onClick={() => onSquareClick?.(square)}
            aria-label={piece ? `${square} ${piece}` : square}
          >
            {piece && (
              <img
                className={`chess-piece${rotatePieces ? " piece-rotated" : ""}`}
                src={`/assets/img/${piece}.png`}
                alt=""
                draggable={false}
              />
            )}
          </button>
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

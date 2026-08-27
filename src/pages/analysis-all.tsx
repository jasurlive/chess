import React from "react";
import { Chessboard as ReactChessboard } from "react-chessboard";
import "../css/analysis.css";

interface ChessboardProps {
  position: string;
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean;
  boardOrientation: "white" | "black";
  customPieces: any;
  onSquareClick?: (square: string) => void;
  customSquareStyles?: Record<string, React.CSSProperties>;
  turn?: "white" | "black";
}

const AnalysisBoard: React.FC<ChessboardProps> = ({
  position,
  onPieceDrop,
  boardOrientation,
  customPieces,
  onSquareClick,
  customSquareStyles,
  turn,
}) => {
  return (
    <div className="chessboard-container-analysis">
      <div className="react-chessboard-wrapper-analysis">
        <ReactChessboard
          position={position}
          onPieceDrop={onPieceDrop}
          boardOrientation={boardOrientation}
          customPieces={customPieces}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
          customBoardStyle={{
            borderRadius: "5px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          customDarkSquareStyle={{
            backgroundColor: "rgb(119, 149, 86)",
          }}
          customLightSquareStyle={{
            backgroundColor: "rgb(237, 237, 209)",
          }}
        />
      </div>
    </div>
  );
};

export default AnalysisBoard;

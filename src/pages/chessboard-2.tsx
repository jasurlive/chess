import React, { useState } from "react";
import { Chessboard as ReactChessboard } from "react-chessboard";
import "../css/chessboard-2.css";

type ChessboardProps = {
  position: string;
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean;
  boardOrientation: "white" | "black";
  customPieces: any;
  onSquareClick?: (square: string) => void;
  customSquareStyles?: Record<string, React.CSSProperties>;
  turn?: "white" | "black"; // Add this prop
};

const ChessBoard2: React.FC<ChessboardProps> = ({
  position,
  onPieceDrop,
  boardOrientation,
  customPieces,
  onSquareClick,
  customSquareStyles = {},
  turn = "white", // Default to white if not provided
}) => {
  // Use turn prop to determine rotation
  const rotatedPieces = Object.keys(customPieces).reduce(
    (acc: any, key: string) => {
      const PieceComponent = customPieces[key];
      acc[key] = (props: any) => (
        <div
          className={
            turn === "white" ? "normal-piece" : "instant-rotated-piece"
          }
        >
          <PieceComponent {...props} />
        </div>
      );
      return acc;
    },
    {}
  );

  return (
    <div className="chessboard-container-2">
      <div className="react-chessboard-wrapper-2">
        <ReactChessboard
          position={position}
          onPieceDrop={onPieceDrop}
          boardOrientation="white" // Keep board fixed
          customPieces={rotatedPieces} // Apply rotation to pieces only
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

export default ChessBoard2;

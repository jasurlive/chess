import React, { useState } from "react";
import { Chessboard as ReactChessboard } from "react-chessboard";
import "../css/chessboard-2.css";

type ChessboardProps = {
  position: string;
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean;
  boardOrientation: "white" | "black";
  customPieces: any;
};

const ChessBoard2: React.FC<ChessboardProps> = ({
  position,
  onPieceDrop,
  boardOrientation,
  customPieces,
}) => {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    const moveSuccess = onPieceDrop(sourceSquare, targetSquare);
    if (moveSuccess) {
      setIsWhiteTurn((prev) => !prev);
    }
    return moveSuccess;
  };

  const rotatedPieces = Object.keys(customPieces).reduce(
    (acc: any, key: string) => {
      const PieceComponent = customPieces[key];
      acc[key] = (props: any) => (
        <div className={isWhiteTurn ? "normal-piece" : "instant-rotated-piece"}>
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
          onPieceDrop={handlePieceDrop}
          boardOrientation="white" // Keep board fixed
          customPieces={rotatedPieces} // Apply rotation to pieces only
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

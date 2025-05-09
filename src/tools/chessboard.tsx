import React from "react";
import { Chessboard as ReactChessboard } from "react-chessboard";
import "../css/chessboard.css";

type ChessboardProps = {
  position: string;
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean;
  boardOrientation: "white" | "black";
  customPieces: any;
};

const ChessBoard: React.FC<ChessboardProps> = ({
  position,
  onPieceDrop,
  boardOrientation,
  customPieces,
}) => {
  return (
    <div className="chessboard-container">
      <div className="react-chessboard-wrapper">
        <ReactChessboard
          position={position}
          onPieceDrop={onPieceDrop}
          boardOrientation={boardOrientation}
          customPieces={customPieces}
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

export default ChessBoard;

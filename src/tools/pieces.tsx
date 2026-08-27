import React, { useMemo } from "react";

const pieces = [
  "wP",
  "wN",
  "wB",
  "wR",
  "wQ",
  "wK",
  "bP",
  "bN",
  "bB",
  "bR",
  "bQ",
  "bK",
];

const getCustomPieces = () => {
  return useMemo(() => {
    const pieceComponents: {
      [key: string]: React.FC<{ squareWidth: number }>;
    } = {};

    pieces.forEach((piece) => {
      pieceComponents[piece] = ({ squareWidth }: { squareWidth: number }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/assets/img/${piece}.png)`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      );
    });

    return pieceComponents;
  }, []);
};

export default getCustomPieces;

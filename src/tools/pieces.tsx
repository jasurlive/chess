import React, { useMemo } from "react";

const pieces = [
  "wP", "wN", "wB", "wR", "wQ", "wK",
  "bP", "bN", "bB", "bR", "bQ", "bK",
];

const getCustomPieces = () => {
  return useMemo(() => {
    const pieceComponents: Record<string, React.FC> = {};

    pieces.forEach((piece) => {
      pieceComponents[piece] = () => (
        <div
          style={{
            width: "100%",
            height: "100%",
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
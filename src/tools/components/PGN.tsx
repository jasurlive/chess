import { useEffect, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import "../css/pgn.css";

type PGNProps = {
  moves: string[]; // SAN moves in order, e.g. ["e4", "e5", "Nf3", ...]
  current?: number; // highlights this many moves played (analysis)
};

export default function PGN({ moves, current = moves.length }: PGNProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const pairs: [string, string?][] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push([moves[i], moves[i + 1]]);
  }

  // keep the latest move in view
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [moves.length]);

  const download = () => {
    const pgn = pairs
      .map(([white, black], i) => `${i + 1}. ${white}${black ? " " + black : ""}`)
      .join(" ");
    const blob = new Blob([pgn], { type: "application/x-chess-pgn" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "game.pgn";
    a.click();
    URL.revokeObjectURL(url);
  };

  const cls = (index: number) => `pgn-move${index === current - 1 ? " pgn-current" : ""}`;

  return (
    <div className="pgn-panel">
      <ol className="pgn-list" ref={listRef}>
        {pairs.length === 0 && <li className="pgn-empty">No moves yet</li>}
        {pairs.map(([white, black], i) => (
          <li key={i} className="pgn-row">
            <span className="pgn-move-number">{i + 1}.</span>
            <span className={cls(i * 2)}>{white}</span>
            <span className={cls(i * 2 + 1)}>{black ?? ""}</span>
          </li>
        ))}
      </ol>
      <button type="button" className="page-button pgn-save-btn" onClick={download} disabled={!moves.length}>
        <FiDownload /> Save PGN
      </button>
    </div>
  );
}

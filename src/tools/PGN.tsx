import "../css/pgn.css";

type PGNProps = {
  moves: string[]; // SAN moves in order, e.g. ["e4", "e5", "Nf3", ...]
};

export default function PGN({ moves }: PGNProps) {
  const pairs: [string, string?][] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push([moves[i], moves[i + 1]]);
  }

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

  return (
    <div className="pgn-panel">
      <ol className="pgn-list">
        {pairs.map(([white, black], i) => (
          <li key={i} className="pgn-row">
            <span className="pgn-move-number">{i + 1}.</span>
            <span className="pgn-move">{white}</span>
            <span className="pgn-move">{black ?? ""}</span>
          </li>
        ))}
      </ol>
      <button className="pgn-save-btn" onClick={download} disabled={!moves.length}>
        Save PGN
      </button>
    </div>
  );
}

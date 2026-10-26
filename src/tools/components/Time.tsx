import { useEffect, useState } from "react";
import "../css/time.css";

const TIME_CONTROLS = [
  { label: "1 min", seconds: 60 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "No clock", seconds: 0 },
];

type TimeProps = {
  turn: "white" | "black";
  stopped?: boolean; // game over
};

const format = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

export default function Time({ turn, stopped = false }: TimeProps) {
  const [seconds, setSeconds] = useState(TIME_CONTROLS[1].seconds);
  const [white, setWhite] = useState(seconds);
  const [black, setBlack] = useState(seconds);
  const [started, setStarted] = useState(false);

  const reset = (s: number) => {
    setSeconds(s);
    setWhite(s);
    setBlack(s);
  };

  const flagged = seconds > 0 && (white === 0 || black === 0);
  const running = started && !stopped && seconds > 0 && !flagged;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (turn === "white") setWhite((t) => Math.max(0, t - 1));
      else setBlack((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [turn, running]);

  return (
    <div className="time-panel">
      <button
        type="button"
        className="page-button time-start"
        onClick={() => setStarted(true)}
        disabled={started || seconds === 0}
      >
        {flagged ? `${white === 0 ? "White" : "Black"} lost on time` : started ? "Game is on!" : "Start the clock"}
      </button>
      <select
        className="time-select"
        value={seconds}
        onChange={(e) => reset(Number(e.target.value))}
        disabled={started}
      >
        {TIME_CONTROLS.map((tc) => (
          <option key={tc.label} value={tc.seconds}>
            {tc.label}
          </option>
        ))}
      </select>
      {seconds > 0 && (
        <div className="time-clocks">
          <div className={`clock ${turn === "black" ? "active" : ""} ${black === 0 ? "flag" : ""}`}>
            <span>Black</span> {format(black)}
          </div>
          <div className={`clock ${turn === "white" ? "active" : ""} ${white === 0 ? "flag" : ""}`}>
            <span>White</span> {format(white)}
          </div>
        </div>
      )}
    </div>
  );
}

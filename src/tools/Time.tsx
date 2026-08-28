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
  onFlag?: (side: "white" | "black") => void;
};

export default function Time({ turn, onFlag }: TimeProps) {
  const [seconds, setSeconds] = useState(TIME_CONTROLS[1].seconds);
  const [white, setWhite] = useState(seconds);
  const [black, setBlack] = useState(seconds);

  const reset = (s: number) => {
    setSeconds(s);
    setWhite(s);
    setBlack(s);
  };

  const running = seconds > 0 && white > 0 && black > 0;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (turn === "white") setWhite((t) => Math.max(0, t - 1));
      else setBlack((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [turn, running]);

  useEffect(() => {
    if (seconds > 0 && white === 0) onFlag?.("white");
  }, [white]);
  useEffect(() => {
    if (seconds > 0 && black === 0) onFlag?.("black");
  }, [black]);

  const format = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  return (
    <div className="time-panel">
      <select
        className="time-select"
        value={seconds}
        onChange={(e) => reset(Number(e.target.value))}
      >
        {TIME_CONTROLS.map((tc) => (
          <option key={tc.label} value={tc.seconds}>
            {tc.label}
          </option>
        ))}
      </select>
      {seconds > 0 && (
        <div className="time-clocks">
          <div className={`clock ${turn === "black" ? "active" : ""}`}>{format(black)}</div>
          <div className={`clock ${turn === "white" ? "active" : ""}`}>{format(white)}</div>
        </div>
      )}
    </div>
  );
}

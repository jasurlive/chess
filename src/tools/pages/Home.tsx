import { Link } from "react-router";
import { FiWifi } from "react-icons/fi";
import { FaChess, FaChessKing, FaMagnifyingGlassChart } from "react-icons/fa6";
import Header from "../components/Header";
import "../css/home.css";

const MODES = [
  { to: "/chess-1", icon: <FaChess />, title: "Chess 1 side", text: "One device, the board turns after every move." },
  { to: "/chess-2", icon: <FaChessKing />, title: "Chess 2 sides", text: "Phone on the table, players sit face to face." },
  { to: "/chess-analysis", icon: <FaMagnifyingGlassChart />, title: "Analysis", text: "Play out ideas, step back and forth, save the PGN." },
  { to: "/chess-online", icon: <FiWifi />, title: "Chess online", text: "Coming soon." },
];

export default function Home() {
  return (
    <div className="home-container">
      <Header />

      <main className="home-content">
        <ul className="home-grid">
          {MODES.map((m) => (
            <li key={m.to}>
              <Link to={m.to} className="home-card">
                <span className="home-card-icon">{m.icon}</span>
                <strong>{m.title}</strong>
                <span>{m.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="home-foot">
          Made by <a href="https://jasurlive.uz">jasurlive</a>. Works offline once loaded.
        </p>
      </main>
    </div>
  );
}

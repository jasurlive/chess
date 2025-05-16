import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaChess, FaChessKing, FaGlobe, FaHome } from "react-icons/fa";
import { SiLichess } from "react-icons/si";
import ChessGame1 from "../tools/Chess-1";
import ChessGame2 from "../tools/Chess-2";
import "../css/dom-menu.css";
import "../css/App.css";
import HomePage from "../pages/HomePage";
import AnalysisBoard from "../tools/Analysis";
import { FaH } from "react-icons/fa6";

function Chess1() {
  return (
    <div>
      <ChessGame1 />
    </div>
  );
}

function Chess2() {
  return (
    <div>
      <ChessGame2 />
    </div>
  );
}
function ChessBoardAnalysisPage() {
  return (
    <div>
      <AnalysisBoard />
    </div>
  );
}
function ChessOnline() {
  return (
    <div className="dom-menu-general-div">Oops! Still under development...</div>
  );
}

function App() {
  return (
    <Router>
      <nav className="dom-menu-container">
        <ul className="dom-menu-ul">
          <li className="dom-menu-item">
            <Link to="/">
              <FaHome className="dom-menu-icon" />
              Home
            </Link>
          </li>
          <li className="dom-menu-item">
            <Link to="/chess-1">
              <FaChess className="dom-menu-icon" /> Chess 1 Side
            </Link>
          </li>
          <li className="dom-menu-item">
            <Link to="/chess-analysis">
              <SiLichess className="dom-menu-icon" /> Analysis
            </Link>
          </li>
          <li className="dom-menu-item">
            <Link to="/chess-2">
              <FaChessKing className="dom-menu-icon" /> Chess 2 Side
            </Link>
          </li>

          <li className="dom-menu-item">
            <Link to="/chess-online">
              <FaGlobe className="dom-menu-icon" /> Chess Online
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chess-1" element={<Chess1 />} />
        <Route path="/chess-2" element={<Chess2 />} />
        <Route path="/chess-analysis" element={<ChessBoardAnalysisPage />} />
        <Route path="/chess-online" element={<ChessOnline />} />
      </Routes>
    </Router>
  );
}

export default App;

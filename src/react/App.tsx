import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaChess, FaChessKing, FaGlobe, FaHome } from "react-icons/fa";
import { SiLichess } from "react-icons/si";
import Chess1 from "../pages/Chess1";
import Chess2 from "../pages/Chess2";
import Analysis from "../pages/Analysis";
import Home from "../pages/Home";
import "../css/dom-menu.css";
import "../css/App.css";

import { useFullscreen } from "../hooks/fullscreen";
import { FaCompress, FaExpand } from "react-icons/fa6";



function ChessOnline() {
  return (
    <div className="dom-menu-general-div">Oops! Still under development...</div>
  );
}

export default function App() {

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Router>
      <div className="app-layout">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chess-1" element={<Chess1 />} />
            <Route path="/chess-2" element={<Chess2 />} />
            <Route path="/chess-analysis" element={<Analysis />} />
            <Route path="/chess-online" element={<ChessOnline />} />
          </Routes>
        </div>
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
            <li className="dom-menu-item" onClick={toggleFullscreen}>
              <div className="dom-menu-toggle">
                {isFullscreen ? <FaCompress /> : <FaExpand />}
                {isFullscreen ? "Exit Full Screen" : "Full Screen"}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

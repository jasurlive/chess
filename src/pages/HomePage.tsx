import { Link } from "react-router-dom";
import "../css/home.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="header-home">
        <Link to="/">uzChess.vercel.app</Link>
      </header>
      <ul className="links-container-home">
        <li className="links-grid-home">
          <Link to="/chess-1" className="link-item-home">
            Chess 1 Side
          </Link>
        </li>
        <li className="links-grid-home">
          <Link to="/chess-analysis" className="link-item-home">
            Analysis
          </Link>
        </li>
        <li className="links-grid-home">
          <Link to="/chess-2" className="link-item-home">
            Chess 2 Side
          </Link>
        </li>
        <li className="links-grid-home">
          <Link to="/chess-online" className="link-item-home">
            Chess Online
          </Link>
        </li>
      </ul>
    </div>
  );
}

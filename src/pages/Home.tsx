import { Link } from "react-router-dom";
import "../css/home.css";
import { FaChess, FaMagnifyingGlassChart, FaWifi } from "react-icons/fa6";
import { SiChessdotcom } from "react-icons/si";

export default function Home() {
  return (
    <div className="home-page">
      <header className="header-home">
      <SiChessdotcom /><Link to="/">uzChess.vercel.app</Link>
      </header>
      <ul className="links-container-home">
        <li className="links-grid-home">
          <Link to="/chess-1" className="link-item-home">
            <SiChessdotcom /> Chess 1 Side
          </Link>
        </li>
        <li className="links-grid-home">
          <Link to="/chess-analysis" className="link-item-home">
            <FaMagnifyingGlassChart /> Analysis
          </Link>
        </li>
        <li className="links-grid-home">
          <Link to="/chess-2" className="link-item-home">
            <FaChess /> Chess 2 Side
          </Link>
        </li>
        <li className="links-grid-home">
          <Link to="/chess-online" className="link-item-home">
            <FaWifi /> Chess Online
          </Link>
        </li>
      </ul>
    </div>
  );
}

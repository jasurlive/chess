import { SiChessdotcom } from "react-icons/si";

export default function Header() {
  return (
    <header className="home-menu">
      <h1 className="home-title">
        <SiChessdotcom /> uzChess
      </h1>
      <span className="home-sub">Chess, all in one</span>
    </header>
  );
}

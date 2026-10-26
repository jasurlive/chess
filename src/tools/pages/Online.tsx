import { Link } from "react-router";

// stub page, replace with the real thing
export default function Online() {
  return (
    <div className="page-container page-center">
      <h1 className="page-title">Chess online</h1>
      <p className="page-text">Oops! Still under development…</p>
      <img src="/oops.gif" alt="" width={160} />
      <Link to="/" className="page-button">
        Back home
      </Link>
    </div>
  );
}

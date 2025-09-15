// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "10px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "#0070f3" }}>
        🏠 Home
      </Link>
      <Link href="/upload" style={{ textDecoration: "none", color: "#0070f3" }}>
        📤 Upload
      </Link>
    </nav>
  );
}

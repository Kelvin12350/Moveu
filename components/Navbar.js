import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Moveu</h1>
      <Link
        href="/upload"
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Upload
      </Link>
    </nav>
  );
}

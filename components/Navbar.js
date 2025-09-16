export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Moveu</h1>
      <div>
        <button className="bg-blue-600 px-4 py-2 rounded">Upload</button>
      </div>
    </nav>
  );
}

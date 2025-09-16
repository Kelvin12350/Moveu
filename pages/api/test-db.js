export default function handler(req, res) {
  res.status(200).json({ message: "Database connection test successful!" });
}

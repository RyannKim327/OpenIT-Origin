import { Link } from "react-router";

export default function Header() {
  return (
    <div className="flex flex-row w-full justify-between items-center p-2 shadow">
      <div>
        <span className="font-bold">Quick</span>
        <span className="font-bold text-red-500">Watch</span>
      </div>
      <nav className="flex flex-row gap-2 items-center">
        <Link to="/">Home</Link>
        <Link to="records">Records</Link>
        <Link to="/map">Map</Link>
        <Link to="/signup" className="bg-red-500 text-white p-2 rounded-lg">
          Get Started
        </Link>
      </nav>
    </div>
  );
}

import { Link } from "react-router";

export default function Header() {
  return (
    <div className="flex flex-row w-full justify-between p-2">
      <div>
        <span className="font-bold">Quick</span>
        <span className="font-bold text-red-500">Watch</span>
      </div>
      <nav className="flex flex-row gap-1">
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}

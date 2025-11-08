import { Link } from "react-router";

export default function Header() {
  return (
    <div className="flex flex-row px-8 py-6 justify-between w-full items-center shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">
        Quake<span className="font-semibold text-[#CE2503]">Watch</span>
      </h1>
      <nav className="flex flex-row items-center">
        <div className="flex flex-row gap-8 mr-12">
          <Link
            className="text-gray-600 
                    hover:text-gray-900 
                    transition-colors 
                    font-semibold"
            to="/"
          >
            Home
          </Link>

          <Link
            className="text-gray-600 
                    hover:text-gray-900 
                    transition-colors 
                    font-semibold"
            to="/about"
          >
            About
          </Link>

          <Link
            className="text-gray-600 
                    hover:text-gray-900 
                    transition-colors 
                    font-semibold"
            to="/report"
          >
            Report
          </Link>

          <Link
            className="text-gray-600
                     hover:text-gray-900 
                     transition-colors 
                     font-semibold"
            to="/map"
          >
            Map
          </Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Link
            className="bg-[#CE2503] 
                    text-white 
                    px-4 
                    py-2 
                    rounded-md 
                    hover:bg-[#941900] transition-colors 
                    font-semibold"
            to="/login"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}

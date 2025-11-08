import { useState } from "react";
import { Link } from "react-router";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="px-6 py-4 shadow-md w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    Quake<span className="font-semibold text-[#CE2503]">Watch</span>
                </h1>

                {/* Hamburger Button */}
                <button
                    className="md:hidden text-gray-800 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/">Home</Link>
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/about">About</Link>
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/report">Report</Link>
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/map">Map</Link>
                    <Link className="bg-[#CE2503] text-white px-4 py-2 rounded-md hover:bg-[#941900] font-semibold" to="/login">Get Started</Link>
                </nav>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4">
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/">Home</Link>
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/about">About</Link>
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/report">Report</Link>
                    <Link className="text-gray-600 hover:text-gray-900 font-semibold" to="/map">Map</Link>
                    <Link className="bg-[#CE2503] text-white px-4 py-2 rounded-md hover:bg-[#941900] font-semibold" to="/login">Get Started</Link>
                </div>
            )}
        </header>
    );
}
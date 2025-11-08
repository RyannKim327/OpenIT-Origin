import { Link } from "react-router";

export default function Header(){
    return (
        <div className="flex flex-row px-8 py-6 justify-between w-full items-center shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800">Quick <span>Watch</span></h1>
            <nav className="flex flex-row items-center">
                <div className="flex flex-row gap-8 mr-12">
                    <Link className="text-gray-600 hover:text-gray-900 transition-colors font-semibold" to="/">Home</Link>
                    <Link className="text-gray-600 hover:text-gray-900 transition-colors font-semibold" to="/events">About</Link>
                    <Link className="text-gray-600 hover:text-gray-900 transition-colors font-semibold" to="/certificates">Report</Link>
                    <Link className="text-gray-600 hover:text-gray-900 transition-colors font-semibold" to="/certificates">Report</Link>

                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Link className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-semibold" to="/signup">Get Started</Link>
                </div>
            </nav>
        </div>
    )
}

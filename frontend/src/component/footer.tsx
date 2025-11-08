export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 w-full ">
      <div className="w-full px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 ml-15">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">
              Quake<span className="text-[#CE2503]">Watch</span>
            </h2>
            <p className="text-gray-300 max-w-md">
              World where every individual, family, and community is equipped with the tools and knowledge to respond to seismic events swiftly and effectively.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Report
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Map
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Attendify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

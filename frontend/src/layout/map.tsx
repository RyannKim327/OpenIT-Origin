import MapComponent from "../component/map";

export default function Map() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#f9f9f9] px-6 py-30">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          Monitor Earthquake
        </h1>
        <p className="text-gray-600 text-lg">
          Track seismic activity in real time with our interactive map
        </p>
      </div>

      <div className="w-1/3 bg-white rounded-lg shadow-lg  p-6 mb-6">
        {/* <div className="rounded-lg overflow-hidden shadow-lg w-full h-full"> */}
        <MapComponent />
        {/* </div> */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5 mt-5">
          Recent Earthquake Activity
        </h2>

        <div className="space-y-3 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-100 rounded-lg p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
          Open Live Tracker
        </button>
      </div>
    </div>
  );
}

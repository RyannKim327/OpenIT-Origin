import { useEffect, useState } from "react";
import MapComponent from "../component/map";
import { eq_dry } from "../utils/api";
import { getData, setData } from "../utils/data";
import { Link } from "react-router";

type json = Record<string, any>;

export default function Map() {
  const [dataset, setDataset] = useState<json[]>(getData("mapdata") ?? []);

  useEffect(() => {
    (async () => {
      const response = await eq_dry();
      setData("mapdata", response);
      setDataset(response);
    })();
  }, []);

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

      <div className="w-1/3 bg-white rounded-lg shadow-lg p-6 mb-6">
        {/* <div className="rounded-lg overflow-hidden shadow-lg w-full h-full"> */}
        <MapComponent dataset={dataset} />
        {/* </div> */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5 mt-5">
          Recent Earthquake Activity
        </h2>

        <div className="space-y-3 mb-6 w-full">
          {dataset &&
            dataset.slice(0, 5).map((item) => (
              <div
                key={item.location}
                className="flex flex-row bg-gray-100 rounded-lg p-4 justify-between gap-4 w-full items-center"
              >
                <div className="flex flex-col items-center justify-center rounded-full text-lg w-[85px] h-[70px] bg-red-200 border border-red-500 border-solid animate-pulse">
                  {item.magnitude}
                </div>
                <div className="flex flex-col w-full">
                  <div className="rounded w-3/4 font-semibold">
                    {item.location}
                  </div>
                  <div className="rounded w-1/2 text-sm text-gray-500">
                    {item.date_time}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Link to="/map" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
          Open Live Tracker
        </Link>
      </div>
    </div>
  );
}

import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { eq_dry } from "../utils/api";

type json = Record<string, any>;

const checker = (date: string) => {
  const month = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const x = date.split(" ");
  const y = `${month[x[1]]}-${x[0]}-${x[2]} ${x[4]} ${x[5]}`;
  const a = new Date(y);
  const b = new Date();
  const c = b.getTime() - a.getTime();
  return c <= 18000000;
};

export default function MapComponent() {
  const [dataset, setDataset] = useState<json[]>([]);
  const info = {
    x: 12.17,
    y: 122.93,
    z: 4.5,
  };

  useEffect(() => {
    (async () => {
      const response = await eq_dry();
      setDataset(response);
    })();
  }, []);

  return (
    <div className="w-full aspect-video bg-red-500">
      <MapContainer
        className="w-full h-full"
        center={[info.x, info.y]}
        zoom={info.z}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {dataset.length > 0
          ? dataset.map((data) => {
              return data.latitude && data.longitude ? (
                <CircleMarker
                  radius={5}
                  fillColor={checker(data.date_time) ? "#ff0000" : "#0000ff"}
                  color={checker(data.date_time) ? "#ff0000" : "#0000ff"}
                  center={[data.latitude, data.longitude]}
                >
                  {/* <Popup> */}
                  {/*   <p> */}
                  {/*     Location: {data.location} */}
                  {/*     <br /> */}
                  {/*     Magnitude: {data.magnitude} */}
                  {/*     <br /> */}
                  {/*     KM Dept: {data.depth_km} */}
                  {/*     <br /> */}
                  {/*     Date Time: {data.date_time} */}
                  {/*   </p> */}
                  {/* </Popup> */}
                </CircleMarker>
              ) : null;
            })
          : null}
      </MapContainer>
    </div>
  );
}

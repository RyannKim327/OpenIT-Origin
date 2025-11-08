import {
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { eq_dry } from "../utils/api";
import { DivIcon, polygon } from "leaflet";

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

export default function MapView() {
  const info = {
    x: 12.17,
    y: 122.93,
    z: 6,
  };

  const [locator, setLocator] = useState<number[]>([info.x, info.y]);
  const [dataset, setDataset] = useState<json[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocator([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // alert("Sorry po");
        },
      );
      (async () => {
        const response = await eq_dry();
        setDataset(response);
      })();
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <h1>Map</h1>
      <div className="w-full h-full">
        <MapContainer
          className="absolute w-full h-full"
          center={[info.x, info.y]}
          zoom={info.z}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {dataset.length > 0
            ? dataset.map((data) => {
                return data.latitude && data.longitude ? (
                  <CircleMarker
                    // icon={
                    //   new CircleMarker({
                    //     // iconSize: 8,
                    //     iconUrl: "/record.png",
                    //   })
                    // }
                    // draggable={false}
                    radius={5}
                    fillColor={checker(data.date_time) ? "#ff0000" : "#0000ff"}
                    color={checker(data.date_time) ? "#ff0000" : "#0000ff"}
                    center={[data.latitude, data.longitude]}
                  >
                    <Popup>
                      <p>
                        Location: {data.location}
                        <br />
                        Magnitude: {data.magnitude}
                        <br />
                        KM Dept: {data.depth_km}
                        <br />
                        Date Time: {data.date_time}
                      </p>
                    </Popup>
                  </CircleMarker>
                ) : null;
              })
            : null}

          {locator[1] !== info.y ? (
            <Marker position={locator}>
              <Popup>Your current location is right here.</Popup>
            </Marker>
          ) : null}
        </MapContainer>
      </div>
    </div>
  );
}

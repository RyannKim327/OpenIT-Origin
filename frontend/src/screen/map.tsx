import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export default function Map() {
  const [locator, setLocator] = useState<number[] | null>(null);

  const info = {
    x: 12.17,
    y: 122.93,
    z: 6,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocator([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          alert("Sorry po");
        },
      );
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <h1>Map</h1>
      <div className="w-full h-full">
        <MapContainer
          className="w-full h-full"
          center={[info.x, info.y]}
          zoom={info.z}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url={`https://tile.openstreetmap.org/${info.z}/${info.x}/${info.y}.png`}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locator ? (
            <Marker position={locator ?? [0, 0]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ) : null}
        </MapContainer>
      </div>
    </div>
  );
}

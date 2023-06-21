import "leaflet/dist/leaflet.css";
import "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

/**
 * Common map container that we use in each of the other views. This is to reduce the need
 * to copy / paste these params over and over.
 */
export default function Map(props: {
  center: [number, number];
  children?: React.ReactNode;
}) {
  return (
    <MapContainer
      center={props.center}
      zoom={13}
      scrollWheelZoom={true}
      className="h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.children}
    </MapContainer>
  );
}

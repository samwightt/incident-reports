import { IncidentReportFile } from "../types";
import "leaflet/dist/leaflet.css";
import "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

export default function Map({ report }: { report: IncidentReportFile }) {
  const address = report.address;

  return (
    <MapContainer
      center={[address.latitude, address.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[address.latitude, address.longitude]}>
        <Popup>
          <h3 className="text-xl font-bold">Incident Address</h3>
          <div className="space-y-0">
            <p>
              {address.common_place_name}
              <br />
              {address.address_line1}
              <br />
              {address.city}, {address.state} {address.postal_code}
            </p>
            <p>
              <b className="font-semibold">Response zone:</b>{" "}
              {address.response_zone}
            </p>
            <p>
              <b className="font-semibold">Intersection:</b>{" "}
              {address.cross_street1} & {address.cross_street2}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

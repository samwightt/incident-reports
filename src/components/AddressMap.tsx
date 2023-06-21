import Map from "./Map";
import { Address } from "../types";
import { Marker, Popup } from "react-leaflet";

export default function AddressMap({ address }: { address: Address }) {
  return (
    <Map center={[address.latitude, address.longitude]}>
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
    </Map>
  );
}
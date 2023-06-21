import Map from "./Map";
import { Address } from "../types";
import { Marker, Popup } from "react-leaflet";

/**
 * Renders a map with a marker at the given address's latitude and longitude.
 * @param {Object} props - The component props.
 * @param {Object} props.address - The address object containing the address details.
 */
export default function AddressMap({ address }: { address: Address }) {
  return (
    <div className="bg-white rounded-md shadow-lg p-4">
      <h2 className="text-2xl font-bold">Address Details</h2>
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
    </div>
  );
}

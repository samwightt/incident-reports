import { useState } from "react";
import { Apparatus } from "../types";
import Map from "./Map";
import { Marker, Popup } from "react-leaflet";
import { toDate, format } from "date-fns-tz";

export interface ApparatusDetailsProps {
  apparati: Apparatus[];
}

const parseAndFormatDate = (date: string) =>
  format(toDate(date), "LLLL do, yyyy hh:mm:ss aa zzz");

export default function ApparatusDetails(props: ApparatusDetailsProps) {
  const [currentApparatusIndex, setCurrentApparatusIndex] = useState(0);
  const [currentStatusName, setCurrentStatusName] = useState<null | string>(
    null
  );

  const currentApparatus = props.apparati[currentApparatusIndex];
  const currentUnitStatus =
    currentStatusName !== null &&
    currentApparatus.unit_status[currentStatusName];

  return (
    <div className="mt-4 bg-white p-4 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Apparatus Details</h2>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <label>
            Apparatus
            <select
              className="block"
              onChange={(e) => {
                setCurrentApparatusIndex(parseInt(e.target.value));
                setCurrentStatusName(
                  Object.keys(
                    props.apparati[parseInt(e.target.value)].unit_status
                  )[0]
                );
              }}
              value={currentApparatusIndex}
            >
              {props.apparati.map((apparatus, index) => (
                <option key={index} value={index}>
                  {apparatus.unit_id}
                </option>
              ))}
            </select>
          </label>
          <label>
            Unit Status
            {Object.keys(currentApparatus.unit_status).map((status, index) => (
              <label className="block">
                <input
                  type="radio"
                  value={status}
                  onChange={() => {
                    setCurrentStatusName(status);
                  }}
                  checked={currentStatusName === status}
                  key={index}
                />{" "}
                {status}
              </label>
            ))}
          </label>
          <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <th>ID</th>
              <th>Type</th>
              <th>Shift</th>
              <th>Station</th>
              <th>Car ID</th>
            </thead>
            <tbody>
              <tr>
                <td>{currentApparatus.unit_id}</td>
                <td>{currentApparatus.unit_type}</td>
                <td>{currentApparatus.shift}</td>
                <td>{currentApparatus.station}</td>
                <td>{currentApparatus.car_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          {currentUnitStatus && (
            <Map
              key={currentStatusName}
              center={[currentUnitStatus.latitude, currentUnitStatus.longitude]}
            >
              <Marker
                position={[
                  currentUnitStatus.latitude,
                  currentUnitStatus.longitude,
                ]}
              >
                <Popup>
                  <h3 className="text-xl font-bold">{currentStatusName}</h3>
                  <p>
                    <b className="font-bold">Timestamp: </b>
                    {parseAndFormatDate(currentUnitStatus.timestamp)}
                  </p>
                </Popup>
              </Marker>
            </Map>
          )}
        </div>
      </div>
    </div>
  );
}

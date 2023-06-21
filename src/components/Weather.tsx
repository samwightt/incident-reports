import { type IncidentReportFile } from "../types";
import { toDate, format } from "date-fns-tz";
import useSwr from "swr";

export interface WeatherProps {
  report: IncidentReportFile;
}

export default function Weather(props: WeatherProps) {
  const incidentDate = format(
    toDate(props.report.description.event_opened),
    "yyyy-MM-dd"
  );
  const toFetch = `https://archive-api.open-meteo.com/v1/archive?latitude=${props.report.address.latitude}&longitude=${props.report.address.longitude}&start_date=${incidentDate}&end_date=${incidentDate}&hourly=temperature_2m,relativehumidity_2m&temperature_unit=fahrenheit`;

  const { data } = useSwr(toFetch, (url) =>
    fetch(url).then((res) => res.json())
  );

  const timeIndex =
    data &&
    data.hourly.time.findIndex(
      (x) =>
        x ===
        format(
          toDate(props.report.description.event_opened),
          "yyyy-MM-dd'T'HH:00"
        )
    );
  const temperature = timeIndex && data.hourly["temperature_2m"][timeIndex];
  const relativeHumidity =
    timeIndex && data.hourly["relativehumidity_2m"][timeIndex];

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold">Weather</h2>
      <br />
      <p>
        <b>Temperature:</b> {temperature} F
      </p>
      <p>
        <b>Relative Humidity:</b> {relativeHumidity} %
      </p>
    </div>
  );
}

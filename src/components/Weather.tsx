import { type IncidentReportFile } from "../types";
import { toDate, format } from "date-fns-tz";
import useSwr from "swr";

export interface WeatherProps {
  /**
   * The incident report object containing the report details.
   */
  report: IncidentReportFile;
}

/**
 * Renders the weather information for the given incident date and location.
 */
export default function Weather(props: WeatherProps) {
  const incidentDate = format(
    toDate(props.report.description.event_opened),
    "yyyy-MM-dd"
  );
  // Construct the URL to fetch the weather data and fetch it with SWR.
  const toFetch = `https://archive-api.open-meteo.com/v1/archive?latitude=${props.report.address.latitude}&longitude=${props.report.address.longitude}&start_date=${incidentDate}&end_date=${incidentDate}&hourly=temperature_2m,relativehumidity_2m&temperature_unit=fahrenheit`;
  const { data } = useSwr(toFetch, (url) =>
    fetch(url).then((res) => res.json())
  );

  // Find the index of the incident time in the weather data.
  // This API returns a list of hourly data, so we need to find the index of the incident time in the list.

  const timeIndex =
    data &&
    data.hourly.time.findIndex(
      (x: string) =>
        x ===
        format(
          toDate(props.report.description.event_opened),
          "yyyy-MM-dd'T'HH:00"
        )
    );
  // Get the temperature and relative humidity at the incident time.
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

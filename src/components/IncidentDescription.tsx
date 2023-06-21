import { Fragment } from "react";
import { type IncidentDescription } from "../types";
import { format, toDate } from "date-fns-tz";
import { formatDuration, intervalToDuration } from "date-fns";

export interface IncidentDescriptionProps {
  description: IncidentDescription;
}

export default function IncidentDescription({
  description,
}: IncidentDescriptionProps) {
  const parseAndFormatDate = (date: string) =>
    format(toDate(date), "LLLL do, yyyy hh:mm:ss aa zzz");

  const keysAndValues = [
    {
      key: "Event ID",
      value: description.event_id,
    },
    {
      key: "Incident Number",
      value: description.incident_number,
    },
    {
      key: "Incident Type",
      value: description.type,
    },
    {
      key: "Incident Subtype",
      value: description.subtype,
    },
    {
      key: "Comments",
      value: description.comments,
    },
    {
      key: "Event Opened",
      value: parseAndFormatDate(description.event_opened),
    },
    {
      key: "Event Closed",
      value: parseAndFormatDate(description.event_closed),
    },
    {
      key: "First Unit Arrival Time",
      value: parseAndFormatDate(description.first_unit_arrived),
    },
    {
      key: "First Unit Dispatched Time",
      value: parseAndFormatDate(description.first_unit_dispatched),
    },
    {
      key: "First Unit En Route Time",
      value: parseAndFormatDate(description.first_unit_enroute),
    },
    {
      key: "Dispatch Duration",
      value: formatDuration(
        intervalToDuration({
          start: 0,
          end: description.extended_data.dispatch_duration * 1000,
        })
      ),
    },
    {
      key: "Event Duration",
      value: formatDuration(
        intervalToDuration({
          start: 0,
          end: description.extended_data.event_duration * 1000,
        })
      ),
    },
    {
      key: "Response Duration",
      value: formatDuration(
        intervalToDuration({
          start: 0,
          end: description.extended_data.response_time * 1000,
        })
      ),
    },
  ];

  return (
    <details className="cursor-pointer rounded-sm bg-white shadow-lg">
      <summary className="p-4">Incident Details</summary>
      <dl className="text-gray-600 text-sm p-4">
        {keysAndValues.map(({ key, value }) => (
          <Fragment key={key}>
            <dt className="font-semibold text-gray-900">{key}</dt>
            <dd className="mb-2">{value}</dd>
          </Fragment>
        ))}
      </dl>
    </details>
  );
}

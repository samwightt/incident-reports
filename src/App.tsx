import { useState, useMemo } from "react";

interface EventWithLocation {
  geohash: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface IncidentReportFile {
  address: {
    address_id: string;
    address_line1: string;
    city: string;
    common_place_name: string;
    cross_street1: string;
    cross_street2: string;
    first_due: string;
    geohash: string;
    latitude: number;
    longitude: number;
    name: string;
    number: string;
    postal_code: string;
    prefix_direction: string;
    response_zone: string;
    state: string;
    suffix_direction: string;
    type: string;
    unit_status: {
      arrived: EventWithLocation;
      available: EventWithLocation;
      dispatched: EventWithLocation;
      enroute: EventWithLocation;
    };
    unit_type: string;
  };
  apparatus: Array<{
    car_id: string;
    distance: number;
    extended_data: {
      event_duration: number;
      response_duration: number;
      travel_duration: number;
      turnout_duration: number;
    };
    geohash: string;
    personnel: [];
    shift: string;
    station: string;
    unit_id: string;
    unit_status: string;
  }>;
  description: {
    comments: string;
    day_of_week: string;
    event_closed: string;
    event_id: string;
    event_opened: string;
    extended_data: {
      dispatch_duration: number;
      event_duration: number;
      response_time: number;
    };
    first_unit_arrived: string;
    first_unit_dispatched: string;
    first_unit_enroute: string;
    hour_of_day: number;
    incident_number: string;
    loi_search_complete: string;
    subtype: string;
    type: string;
  };
  fire_department: {
    fd_id: string;
    firecares_id: string;
    name: string;
    shift: string;
    state: string;
    timezone: string;
  };
  version: string;
}

function App() {
  const [fileContent, setFileContent] = useState<string | null>(null);

  // Unfortunately TypeScript can't infer the return type of this function on its own.
  // Wrap the function in useMemo to avoid re-parsing the JSON on every render.
  const parsedJSON = useMemo<
    | { success: true; result: IncidentReportFile }
    | { success: false; error: string }
    | null
  >(() => {
    if (fileContent === null) return null;

    try {
      const parsedFile = JSON.parse(fileContent);
      return {
        success: true,
        result: parsedFile,
      };
    } catch (_) {
      return {
        success: false,
        error: "JSON couldn't be parsed.",
      };
    }
  }, [fileContent]);

  return (
    <div className="w-full min-h-screen">
      <div>
        <form
          onSubmit={(e) => {
            // Use a form so that we can use HTML validations.
            e.preventDefault();
            const textarea = e.currentTarget.elements[0] as HTMLTextAreaElement;
            setFileContent(textarea.value);
          }}
        >
          <label>
            File Content
            <textarea
              placeholder="JSON content of the file"
              aria-errormessage="file-error-message"
              required
              minLength={2}
              className="w-full h-96"
              aria-invalid={parsedJSON?.success === false}
            />
            {parsedJSON?.success === false && (
              <div id="file-error-message" className="text-red-500">
                {parsedJSON.error}
              </div>
            )}
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
          >
            View File
          </button>
        </form>
      </div>
      {parsedJSON?.success && (
        <div>
          <dl className="space-y-4">
            <dt>Comments</dt>
            <dd>{parsedJSON.result.description.comments}</dd>

            <dt>Incident Type</dt>
            <dd>{parsedJSON.result.description.type}</dd>

            <dt>Incident Subtype</dt>
            <dd>{parsedJSON.result.description.subtype}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}

export default App;

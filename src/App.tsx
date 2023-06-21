import { useState, useMemo } from "react";
import { IncidentReportFile } from "./types";
import IncidentDescription from "./components/IncidentDescription";
import AddressMap from "./components/AddressMap";
import ApparatusDetails from "./components/ApparatusDetails";
import Weather from "./components/Weather";

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
    <div className="w-full min-h-screen bg-gray-50 px-2 space-y-8">
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
          <IncidentDescription description={parsedJSON.result.description} />
          <Weather report={parsedJSON.result} />
          <AddressMap key={fileContent} address={parsedJSON.result.address} />
          <ApparatusDetails apparati={parsedJSON.result.apparatus} />
        </div>
      )}
    </div>
  );
}

export default App;

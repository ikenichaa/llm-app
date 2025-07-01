/**
 * Interface for the payload sent to the generate-affective-narrative API.
 */
export interface GenerateNarrativePayload {
  emotion: string;
  intensity_level: number;
  word_count: number;
  purpose: string;
}

/**
 * Interface for the expected response from the generate-affective-narrative API.
 * Adjust this based on your actual backend response structure.
 */
interface GenerateNarrativeResponse {
  summary_text: string;
  visualization_urls: string[]; // Assuming your backend returns URLs for visualizations
  // Add other fields your backend might return, e.g.,
  // recommended_emotion?: string;
  // recommended_emotion_reason?: string;
}

/**
 * Calls the backend API to generate an affective narrative based on provided parameters.
 *
 * @param sessionId The session ID for the request.
 * @param payload The data required to generate the narrative (emotion, intensity, word count, purpose).
 * @returns A Promise that resolves with the generated narrative data, or rejects on error.
 */
export async function generateAffectiveNarrative(
  sessionId: string,
  payload: GenerateNarrativePayload
): Promise<GenerateNarrativeResponse> {
  // Construct the API URL using the provided session ID
  const apiUrl = `http://127.0.0.1:8000/api/generate-affective-narrative/${sessionId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST", // Use POST method as per your curl command
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify(payload), // Convert the JavaScript object to a JSON string
    });

    // Check if the response was successful (status code 2xx)
    if (!response.ok) {
      // If not successful, try to parse error details from the response
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${JSON.stringify(
          errorData
        )}`
      );
    }

    // Parse the JSON response body
    const data: GenerateNarrativeResponse = await response.json();
    console.log("Affective narrative generated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error generating affective narrative:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
}

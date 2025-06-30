export async function uploadFile(
  file: File,
  description: string,
  sessionId: string
): Promise<any> {
  // Define the API endpoint
  const apiUrl = "http://127.0.0.1:8000/api/upload";

  // Create a new FormData object
  // FormData is used to send form data, including files, in a multipart/form-data request.
  const formData = new FormData();

  // Append the file to the FormData object.
  // The 'file' key corresponds to the --form 'file=@...' part in your curl command.
  formData.append("file", file);

  // Append the description to the FormData object.
  // The 'description' key corresponds to the --form 'description="..."' part.
  formData.append("description", description);

  // Append the session_id to the FormData object.
  // The 'session_id' key corresponds to the --form 'session_id="..."' part.
  formData.append("session_id", sessionId);

  try {
    // Make the POST request using the fetch API.
    // When sending FormData, fetch automatically sets the 'Content-Type' header
    // to 'multipart/form-data' with the correct boundary, so you don't need to
    // set it manually.
    const response = await fetch(apiUrl, {
      method: "POST", // The HTTP method is POST
      body: formData, // The request body is the FormData object
    });

    // Check if the request was successful (status code 2xx)
    if (!response.ok) {
      // If the response status is not OK, throw an error with the status text
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${JSON.stringify(
          errorData
        )}`
      );
    }

    // Parse the JSON response from the server
    const data = await response.json();

    console.log("Upload successful:", data);
    return data;
  } catch (error) {
    // Catch any errors during the fetch operation (e.g., network issues)
    console.error("Error during file upload:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
}

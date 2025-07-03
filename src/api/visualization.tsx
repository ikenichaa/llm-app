interface HeadersWithContentDisposition extends Headers {
  get(name: "Content-Disposition"): string | null;
}

/**
 * Processes a ZIP file containing visualizations from the backend, extracts images,
 * and returns their object URLs for display.
 *
 * @param sessionId The session ID for which to process visualizations.
 * @returns A Promise that resolves with an array of image URLs (strings) if successful,
 * or rejects with an error if the API call or unzipping fails.
 */
export async function processVisualizationsZipAndGetUrls(
  sessionId: string,
  colors: string
): Promise<string[]> {
  const apiUrl = `http://127.0.0.1:8000/api/visualization/${sessionId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST", // As per your curl command
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify({ colors: colors }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    // Get the Blob (Binary Large Object) data from the response
    const zipBlob = await response.blob();

    // @ts-ignore
    const jszip = new JSZip();
    const zip = await jszip.loadAsync(zipBlob);

    const imageUrls: string[] = [];

    // Iterate over each file in the zip
    for (const filename in zip.files) {
      const zipEntry = zip.files[filename];

      // Skip directories and non-image files (you can extend this check)
      if (
        !zipEntry.dir &&
        (filename.endsWith(".png") ||
          filename.endsWith(".jpg") ||
          filename.endsWith(".jpeg") ||
          filename.endsWith(".gif"))
      ) {
        // Get the file content as a Blob
        const imageBlob = await zipEntry.async("blob");

        // Create an object URL for the image Blob
        const url = URL.createObjectURL(imageBlob);
        imageUrls.push(url);
      }
    }

    console.log(`Processed ZIP and extracted ${imageUrls.length} image URLs.`);
    return imageUrls;
  } catch (error) {
    console.error("Error processing visualizations ZIP:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
}

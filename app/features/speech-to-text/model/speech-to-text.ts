import { blobToBase64 } from '~/shared/utils/blob-to-base64';

/**
 * Sends audio blob to backend for transcription and returns transcribed text.
 */
export async function speechToText(blob: Blob): Promise<string> {
  const base64Audio = await blobToBase64(blob);

  const response = await fetch('/api/speech-to-text', {
    method: 'POST',
    body: JSON.stringify({ url: base64Audio }),
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await response.json();

  if (!response.ok) {
    let message = 'Unknown error occurred during speech-to-text conversion.';

    if (json && json.message) {
      // extract error message from the response, which may be nested in a specific format
      const specificString = (json.message as string).slice(3);
      const errorMsg = JSON.parse(specificString);

      if (errorMsg && errorMsg.error && errorMsg.error.message) {
        message = errorMsg.error.message;
      } else {
        message = json.message;
      }
    }

    throw new Error(message);
  }

  return json.text;
}

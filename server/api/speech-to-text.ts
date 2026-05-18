import Groq, { toFile } from "groq-sdk";

export default defineEventHandler(async (event) => {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY, });

  const body = await readBody(event);

  const response = await client.audio.transcriptions.create({
    model: "whisper-large-v3",
    url: body.url,
  });

  return response;
})

import { OpenRouter } from '@openrouter/sdk';

export default defineEventHandler(async (event) => {
  const client = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY || '' });

  const messages = await readBody(event);

  const response = await client.chat.send({
    chatRequest: {
      model: "openai/gpt-oss-20b:free",
      messages,
    }
  });

  return response
})

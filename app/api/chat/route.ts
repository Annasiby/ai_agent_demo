import { google } from '@ai-sdk/google';
import { convertToModelMessages, stepCountIs, streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-3.5-flash'),
    system:
      'You are an autonomous research assistant. Use tools whenever factual verification is needed.Whenever comparing items or presenting structured data, always output in GitHub-Flavored Markdown tables.Do not use raw asterisks or hash characters excessively.',
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      searchWikipedia: tool({
        description: 'Search Wikipedia for factual background information.',
        inputSchema: z.object({
          query: z.string().describe('Search query'),
        }),
        execute: async ({ query }) => {
          const res = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
              query
            )}&format=json&origin=*`
          );
          const data = await res.json();
          const topResult = data.query?.search?.[0];
          return topResult
            ? {
                title: topResult.title,
                snippet: topResult.snippet.replace(/<[^>]*>?/gm, ''),
              }
            : { error: 'No results found.' };
        },
      }),
    },
  });

  // useChat expects a UI message stream, not a raw text stream
  return result.toUIMessageStreamResponse();
}

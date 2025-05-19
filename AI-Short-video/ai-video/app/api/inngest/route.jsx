import { inngest } from "@/inngest/client";
import { GenerateVideoData, helloWorld } from "@/inngest/functions";
import { serve } from "inngest/next";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   helloWorld,
   GenerateVideoData 
  ],
  middleware: [
    async (req) => {
      try {
        // Ensure the request body is properly parsed
        if (req.method === 'PUT') {
          const contentType = req.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            return new Response('Content-Type must be application/json', { status: 400 });
          }
          
          const body = await req.text();
          if (!body) {
            return new Response('Request body cannot be empty', { status: 400 });
          }
          
          try {
            JSON.parse(body);
          } catch (e) {
            return new Response('Invalid JSON in request body', { status: 400 });
          }
        }
        return req;
      } catch (error) {
        console.error('Middleware error:', error);
        return new Response('Internal server error', { status: 500 });
      }
    }
  ]
});

import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  const API_URL = 'http://localhost:8080/api/messages'
  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  }
  console.log('Throwing error; here\'s the request:\n', request);
  throw new Error('Error in request');
}
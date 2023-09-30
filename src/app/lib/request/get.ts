import {NextRequest} from "next/server";

export async function get(request: NextRequest) {
  try {
    return await request.json();
  } catch (e) {
    console.log("e is", e);
    throw new Error("Invalid JSON");
  }
}
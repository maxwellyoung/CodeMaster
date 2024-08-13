import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.from("questions").select("*");
  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    return NextResponse.json(
      { message: "Failed to fetch questions", error },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}

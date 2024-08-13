import { supabase } from "../utils/supabaseClient";
import { NextRequest } from "next/server";

export async function rateLimit(request: NextRequest, limit: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated", status: 401 };

  const { data, error } = await supabase
    .from("rate_limits")
    .select("used")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return { error: "Error fetching rate limits", status: 500 };
  }

  if (data.used >= limit) {
    return { error: "Rate limit exceeded", status: 429 };
  }

  await supabase
    .from("rate_limits")
    .update({ used: data.used + 1 })
    .eq("user_id", user.id);

  return { status: 200 };
}

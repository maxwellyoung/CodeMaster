import { supabase } from "./supabaseClient";

export const fetchRemainingRequests = async (): Promise<number> => {
  const user = await supabase.auth.getUser();
  if (!user || !user.data || !user.data.user) return 0;

  const { data, error } = await supabase
    .from("rate_limits")
    .select("used, limit")
    .eq("user_id", user.data.user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching remaining requests:", error);
    return 0;
  }

  return data.limit - data.used;
};

export const fetchSubscriptionStatus = async (): Promise<string> => {
  const user = await supabase.auth.getUser();
  if (!user || !user.data || !user.data.user) return "free";

  const { data, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.data.user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching subscription status:", error);
    return "free";
  }

  return data.status === "active" ? "paid" : "free";
};

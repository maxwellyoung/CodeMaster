import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../utils/supabaseClient";

export const useStoreClerkUserInSupabase = () => {
  const { user } = useUser();

  useEffect(() => {
    const storeUser = async () => {
      if (user) {
        const { data, error } = await supabase.from("rate_limits").insert([
          {
            user_id: user.id, // Clerk User ID
            limit: 50, // Initial limit for free users
            reset_time: new Date(new Date().setHours(24, 0, 0, 0)), // Next midnight
          },
        ]);

        if (error) {
          console.error("Error storing Clerk user in Supabase:", error);
        } else {
          console.log("Clerk user stored in Supabase:", data);
        }
      }
    };

    storeUser();
  }, [user]);
};

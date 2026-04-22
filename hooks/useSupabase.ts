import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export function useSupabase() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  return supabase;
}

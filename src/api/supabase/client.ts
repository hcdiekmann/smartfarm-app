import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// see options https://supabase.com/docs/reference/javascript/initializing
const supabaseOptions = {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    },
}
         
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey,supabaseOptions);

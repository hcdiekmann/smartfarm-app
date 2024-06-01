import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://amvlpfduasiuxfoevnry.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdmxwZmR1YXNpdXhmb2V2bnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxODA2NjUsImV4cCI6MjAzMjc1NjY2NX0.2E5HQqRyosrO41oWi7AyDBvoksklHBwEqbZYsyV8jWw'
            
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = 'http://localhost:8000' // kong gateway
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzEyODcyODAwLAogICJleHAiOiAxODcwNjM5MjAwCn0.bXY-GS1uOjpenL_OmuQ_gnIbx4rZeMvIvLgiDMCaUa0'

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

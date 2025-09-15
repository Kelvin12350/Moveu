import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR_PROJECT.supabase.co"; 
const supabaseAnonKey = "YOUR_PUBLIC_ANON_KEY";

// Create a client to talk to Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

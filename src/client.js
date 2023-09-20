import { createClient } from "@supabase/supabase-js";
const API_KEY = import.meta.env.VITE_API_KEY;

const supabaseUrl = "https://zzlrmobhmdqlhsbvhxwy.supabase.co";
const supabaseKey = API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

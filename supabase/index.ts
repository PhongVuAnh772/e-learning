import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://jszobpaizhdfgdyyvjgx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzem9icGFpemhkZmdkeXl2amd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTQ2NTQsImV4cCI6MjA0MjQ3MDY1NH0.GIDyX8_tdmArhA8SWXrXEqgtwRhihcWndDOYNlgEVfo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

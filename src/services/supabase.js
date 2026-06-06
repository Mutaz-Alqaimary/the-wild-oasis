import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = "https://dclaevazetcjjkrzczpc.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbGFldmF6ZXRjamprcnpjenBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyOTIzNDQsImV4cCI6MTk5ODg2ODM0NH0.LGg0M-taoHgKtxCzr9owrb09epnPaO_Yfz6xVE54sIY";

export const supabaseUrl = "https://thmdrfombxtbhwtbeqcf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWRyZm9tYnh0Ymh3dGJlcWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODA3ODUsImV4cCI6MjA2NDk1Njc4NX0.Oih7BFTrBAXom7k9Wmb0MKLsAoQ7eHB2OvY4YIFW7-s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

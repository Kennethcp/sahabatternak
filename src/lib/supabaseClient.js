import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjrcwxodiizcwizkxfkk.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcmN3eG9kaWl6Y3dpemt4ZmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjY2NzMsImV4cCI6MjA0ODMwMjY3M30.T1vEjCr5D9LoQTbyD3nEZXdoXu16DsfRQLi4Ot1EIyo'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

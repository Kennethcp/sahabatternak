import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vhzjybeixtxedosqyrlz.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoemp5YmVpeHR4ZWRvc3F5cmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjU1NjcsImV4cCI6MjA3ODkwMTU2N30.PUXzX4NgpKiyO1chDS_Oy_tMxEKtWRbIYwesMjFEL5s'; // Replace with your Supabase anon key

export const fetchDataByDate = async (date) => {
    const { data, error } = await supabase.from('events').select('*').eq('date', date);
    if (error) throw error;
    return data;
  };
  
  export const fetchDataByDateRange = async (startDate, endDate) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate);
    if (error) throw error;
    return data;
  };
  
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

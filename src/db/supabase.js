import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://mqmbrciexgmpltelgxqv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbWJyY2lleGdtcGx0ZWxneHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzUzMDMsImV4cCI6MjA1NTgxMTMwM30.qGt6bpMdeCfQWz238mHbqJU4Tslmfilg6jBbz3T3gQY',
);

export { supabase };

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://psqyilfdqlbjakwornnv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcXlpbGZkcWxiamFrd29ybm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNTMxNjksImV4cCI6MjEwNDcyOTE2OX0.z7uAt1klFjtEueous02qPkzaKMwYm_IL-Ehz47GKKWg';

export const supabase = createClient(supabaseUrl, supabaseKey);

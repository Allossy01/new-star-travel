import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://psqyilfdqlbjakwornnv.supabase.co';
const supabaseKey = 'sb_publishable__Rc8PiMjS2qwylZzbsdsVw_Od1X3G_A';

export const supabase = createClient(supabaseUrl, supabaseKey);

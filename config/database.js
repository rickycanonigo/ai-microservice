const { createClient } = require('@supabase/supabase-js');
require("dotenv").config({ path: "../.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

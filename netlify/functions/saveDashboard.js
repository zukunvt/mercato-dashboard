const { createClient } = require('@supabase/supabase-js');
   
   const SUPABASE_URL = 'https://tvqurriorgmuzvmtepna.supabase.co';
   const SUPABASE_KEY = 'sb_publishable_TwBIVTj-_1G2tJSEosuruA_RN1qaO4Y';
   
   const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
   
   exports.handler = async (event) => {
     if (event.httpMethod !== 'POST') {
       return { statusCode: 405, body: 'Method Not Allowed' };
     }
   
     try {
       const dashboard = JSON.parse(event.body);
   
       if (!dashboard.label || !dashboard.customLabel || !dashboard.period) {
         return {
           statusCode: 400,
           body: JSON.stringify({ error: 'Dati mancanti' })
         };
       }
   
       const { data, error } = await supabase
         .from('dashboards')
         .insert([{
           id: dashboard.id,
           label: dashboard.label,
           custom_label: dashboard.customLabel,
           saved_at: dashboard.savedAt,
           period_from: dashboard.period.from,
           period_to: dashboard.period.to,
           stats: dashboard.stats,
           data: dashboard.data,
           created_at: new Date().toISOString()
         }])
         .select();
   
       if (error) throw new Error(error.message);
   
       return {
         statusCode: 200,
         body: JSON.stringify({ success: true, data })
       };
     } catch (err) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: err.message })
       };
     }
   };

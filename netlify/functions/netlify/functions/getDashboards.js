const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://tvqurriorgmuzvmtepna.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TwBIVTj-_1G2tJSEosuruA_RN1qaO4Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { data, error } = await supabase
      .from('dashboards')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    const dashboards = (data || []).map(d => ({
      id: d.id,
      label: d.label,
      customLabel: d.custom_label,
      savedAt: d.saved_at,
      period: {
        from: d.period_from,
        to: d.period_to
      },
      stats: d.stats,
      data: d.data
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(dashboards)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://tvqurriorgmuzvmtepna.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TwBIVTj-_1G2tJSEosuruA_RN1qaO4Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id } = JSON.parse(event.body);

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'ID mancante' })
      };
    }

    const { error } = await supabase
      .from('dashboards')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

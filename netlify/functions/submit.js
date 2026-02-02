const https = require('https');

const AIRTABLE_CONFIG = {
  baseId: process.env.AIRTABLE_BASE_ID,
  tableId: process.env.AIRTABLE_TABLE_ID,
  pat: process.env.AIRTABLE_PAT
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const postData = JSON.stringify({ records: [{ fields: data }], typecast: true });

    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.airtable.com',
        port: 443,
        path: `/v0/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tableId}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_CONFIG.pat}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body });
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    // Log Airtable errors for debugging
    if (response.statusCode >= 400) {
      console.error('Airtable error:', response.statusCode, response.body);
    }

    return {
      statusCode: response.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: response.body
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

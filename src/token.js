const fetch = require('node-fetch');

const { app_id, app_secret, ACCESS_TOKEN_URL } = require('./config');


module.exports = async function(params, context) {
  const resp = await fetch(
    ACCESS_TOKEN_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_id, 
        app_secret
      })
    }
  );

  const json = await resp.json();
  const { app_access_token: token } = json;

  return {
    token
  };
}

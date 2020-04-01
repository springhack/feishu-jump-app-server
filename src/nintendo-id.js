const fetch = require('node-fetch');

const { GIZETA_KV_URL } = require('./config');

module.exports = async function(params) {
  const { method, openId } = params;
  try {
    switch (method) {
      case 'query':
        const nintendoId = await fetch(`${GIZETA_KV_URL}/get/${openId}`).then(res => res.text());
        return nintendoId === 'not found' ? '000000000000' : nintendoId;
      case 'update':
        await fetch(`${GIZETA_KV_URL}/set/${openId}/${params.nintendoId}`).then(res => res.text());
        return params.nintendoId;
      default:
        return 'xxxxxxxxxxxx';
    }
  } catch (e) {
    return '000000000000';
  }
}

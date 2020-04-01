const express = require('express');
const fetch = require('node-fetch');

const ffmpeg = require('./src/ffmpeg');
const getToken = require('./src/token');
const nintendoId = require('./src/nintendo-id');
const { USER_INFO_URL, TOKEN_VALIDATE_URL } = require('./src/config');


let token;
const app = express();

(async () => {
  // Token task
  token = (await getToken()).token;
  setInterval(async () => {
    token = (await getToken()).token;
  }, 110 * 1000);
  
  // Routers
  app.get('/id/code2open/:code', async (req, res) => {
    const { code } = req.params;
    const resp = await fetch(TOKEN_VALIDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        code,
        token
      })
    }).then(res => res.json());
    const { open_id: openId } = resp.data;
    res.end(JSON.stringify({ openId }));
  });

  app.get('/user/user2info/:openId', async (req, res) => {
    const { openId } = req.params;
    const resp = await fetch(`${USER_INFO_URL}?open_id=${openId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json());
    const { data: info } = resp;
    res.end(JSON.stringify({ info }));
  });

  app.get('/id/open2nintendo', async (req, res) => {
    const id = await nintendoId(req.query);
    res.end(id);
  });

  app.get('/media/mpeg2webm', (req, res) => {
    ffmpeg(req, res);
  });
  
  app.listen(12321);
})();

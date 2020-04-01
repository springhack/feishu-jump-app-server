const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');

module.exports = (req, resp) => {
  const { url } = req.query;
  axios({
    method: 'get',
    url,
    responseType: 'stream'
  }).then(response => {
    resp.setHeader('Content-Type', 'video/webm');
    resp.setHeader('Access-Control-Allow-Origin', '*');
    ffmpeg(response.data)
      .outputOption([
        '-r 24',
        '-cpu-used 5', '-deadline realtime',
        '-c:v vp9', '-vf scale=-1:240', '-b:v 100k',
        '-c:a libvorbis', '-b:a 48k',
        '-f webm'
      ])
      .on('end', () => {})
      .on('error', () => {})
      .pipe(resp, {
        end: true
      });
  });
};

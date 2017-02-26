const request = require('request-promise');
const config  = require('../config');

module.exports = function(app) {
  app.get('/callback', callback);
}

function callback(req, res, next) {
  request('https://github.com/login/oauth/access_token', {
    method: 'POST',
    json: true,
    body: {
      client_id:     'a3babf538c0e87a2d6ee',
      client_secret: config.githubKey,
      code:          req.query.code,
    }
  }).then((json) => {
    res.json({
      token: json.access_token,
    })
  }).catch(next);
}

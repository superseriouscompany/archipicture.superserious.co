const request = require('request-promise');
const shortid = require('shortid');
const config  = require('../config');

const users = {}

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
    if( !json.access_token ) { throw new Error(`Invalid json ${JSON.stringify(json)}`) }
    const id = shortid.generate()
    users[json.access_token] = { id: id }
    res.redirect(`http://localhost:8000?id=${id}`)
  }).catch(next);
}

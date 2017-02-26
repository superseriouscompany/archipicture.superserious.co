const config = require('../config');
const stripe = require('stripe')(config.stripeKey)

module.exports = function(app) {
  app.post('/pay', pay)
}

function pay(req, res, next) {
  stripe.charges.create({
    amount: 999,
    currency: "usd",
    source: req.body.token,
    metadata: {
      email: req.body.email,
    }
  }).then((cool) => {
    res.json({
      cool: cool
    })
  }).catch((err) => {
    console.error(err);
    next(err);
  })
}

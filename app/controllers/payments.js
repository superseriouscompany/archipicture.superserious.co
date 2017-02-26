module.exports = function(app) {
  app.post('/pay', pay)
}

function pay(req, res, next) {
  res.json({
    good: 'great'
  })
}

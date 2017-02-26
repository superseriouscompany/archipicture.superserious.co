const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.disable('etag');
app.get('/', function(req, res) {
  res.json({cool: 'nice'})
})

const normalizedPath = require("path").join(__dirname, "app", "controllers");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./app/controllers/" + file)(app);
});

app.use(function(err, req, res, next) {
  console.error({err: err, message: err.message, errName: err.name, stack: err.stack}, 'Uncaught server error');
  res.status(500).json({message: 'Something went wrong.'});
})

app.listen(port, function() {
  console.log(`Listening on ${port}...`)
})

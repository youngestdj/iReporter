const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const redFlag = require('./server/routes/red_flags.js');
app.use('/', redFlag);

if (require.main === module) {
  app.listen(process.env.PORT || 3000);
} else {
  module.exports = app;
}

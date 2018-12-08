const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const redFlag = require('./server/routes/red_flags.js');
const signup = require('./server/routes/signup.js');

app.use('/api/v1/red-flags', redFlag);
app.use('/api/v1/auth/signup', signup);

if (require.main === module) app.listen(process.env.PORT || 3000);

module.exports = {
  app,
};

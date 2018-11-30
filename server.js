const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const redFlag = require('./server/routes/red_flags.js');
app.use('/', redFlag);

if (require.main === module) app.listen(process.env.PORT || 3000);

//app.listen(process.env.PORT || 3000);
//export default app;
module.exports = {
		app,
	};
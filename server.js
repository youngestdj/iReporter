import express from 'express';
import bodyParser from 'body-parser';
import redFlag from './server/routes/red_flags.js';
import signup from './server/routes/signup.js';
import login from './server/routes/login.js';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//const redFlag = require('./server/routes/red_flags.js');
//const signup = require('./server/routes/signup.js');
//const login = require('./server/routes/login.js');

app.use('/api/v1/red-flags', redFlag);
app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/login', login);

if (require.main === module) app.listen(process.env.PORT || 3000);

export default app;
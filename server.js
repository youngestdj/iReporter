import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Records from './server/routes/records';
import signup from './server/routes/signup';
import login from './server/routes/login';
import Auth from './server/middleware/auth';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/login', login);
app.use('/api/v1/', Auth.verifyToken, Records);

if (require.main === module) app.listen(process.env.PORT || 3000);

export default app;

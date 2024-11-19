import { exceptionHandler } from './middleware/exceptionHandler.js';
import { logHttpRequest } from './middleware/infoLoger.js';
import { apiEndpoint } from './endpoints/api.endpoint.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import env from 'dotenv';

const app = express();

app.use(express.json());
app.use(cookieParser());
env.config();

app.set('view engine', 'pug');
app.use(express.static('static'));

app.use(logHttpRequest);
app.use('/api_goodArcan', apiEndpoint);
app.use(exceptionHandler);

app.use('/api_goodArcan/public', express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server init in port - ${PORT}`);
});

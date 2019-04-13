import express from 'express';
import logger from 'morgan';
import route from './server/route';

const app = express();

app.use(logger('dev'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => { res.send('hello world'); });

app.use('/api/v1', route);

export default app;

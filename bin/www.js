import Debug from 'debug';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

const debug = Debug('http');
const port = process.env.PORT || 6000;

app.listen(port, () => { debug(`Server started at port ${port}`); });

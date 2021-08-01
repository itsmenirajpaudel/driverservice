import * as http from 'http';
import app from './app';
import { PORT } from './settings';

//create the server
const server = http.createServer(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(server);

// set socket instance in app
app.set('io', io);

//run the server
server.listen(PORT, () => console.info(`Server running on port ${PORT}`));

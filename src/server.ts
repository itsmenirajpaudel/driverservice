import * as http from 'http';
import app from './app';
import { PORT } from './settings';

//create the server
const server = http.createServer(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    socket.on('end', function () {
        if (global['socketInterval']) clearInterval(global['socketInterval']);
        socket.disconnect(true);
    });
});
// set socket instance in app
app.set('io', io);

//run the server
server.listen(PORT, () => console.info(`Server running on port ${PORT}`));

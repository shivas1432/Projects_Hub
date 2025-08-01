import express from 'express';
import cors from 'cors';

import router from './router/service.router';
import {
    initializeConsumer
} from './helper/service.helper';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router)

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, async () => {
    await initializeConsumer();
    console.log(`Server listening at Port ${PORT}`);
})
server.on('error', (error) => console.log(error));
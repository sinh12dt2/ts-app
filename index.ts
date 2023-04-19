import express from 'express';
import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import rootRoutes from './routes/root';
import studentRoutes from './routes/student';
import exampleRoutes from './routes/example';
import inventoryRoutes from './routes/inventory';
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credential: true,
}
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use('/', rootRoutes);
app.use('/student', studentRoutes);
app.use('/posts', studentRoutes);
app.use('/example', exampleRoutes);
app.use('/inventory', inventoryRoutes);

const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

console.log('console');

console.log(server.address);

export default app;
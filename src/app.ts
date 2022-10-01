import {config} from 'dotenv';
import express, {Express} from 'express';
import connect from './utils/connect';
import logger from "./utils/logger";
import routes from "./routes";

config();

const app: Express = express();

const port: number = Number(process.env.PORT);

app.use(express.json());

app.listen(port, async () => {
    await connect();

    routes(app);

    logger.info("App is running on http://localhost:" + port);
});
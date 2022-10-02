import {config} from 'dotenv';
import express, {Express} from 'express';
import connect from './utils/connect';
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

config();

const app: Express = express();

const port: number = Number(process.env.PORT);

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
    await connect();

    routes(app);

    logger.info("App is running on http://localhost:" + port);
});
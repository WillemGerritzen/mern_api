import express, {Express} from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from "./utils/logger";
import routes from "./routes";

const app: Express = express();

const port: number = config.get<number>('port');

// app.use(express.json());

app.listen(port, async () => {
    logger.info("App is running on http://localhost:" + port);

    await connect();

    routes(app);
});
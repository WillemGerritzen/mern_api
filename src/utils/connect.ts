import mongoose from 'mongoose';
import config from "config";
import logger from "./logger";

async function connect() {
    const dbUri: string = config.get<string>('dbUri');
    try {
        await mongoose.connect(dbUri)
        logger.info('Connected to database');
    } catch (error) {
        logger.error('Error connecting to database: ' + error);
        }
        process.exit(1);
}

export default connect;
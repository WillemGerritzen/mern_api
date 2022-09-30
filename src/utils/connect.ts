import mongoose from 'mongoose';
import config from "config";
import logger from "./logger";

async function connect() {
    const dbUri: string = config.get<string>('dbUri');

    try {
        logger.info('Connecting to MongoDB...');
        await mongoose.connect(dbUri);
    } catch (error) {
        logger.error('Error connecting to database: ' + error);
        process.exit(1);
        }
    }

export default connect;
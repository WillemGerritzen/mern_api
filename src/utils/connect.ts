import mongoose from 'mongoose';
import logger from "./logger";

async function connect() {
    const dbUri: string = String(process.env.DB_URI)

    try {
        logger.info('Connecting to MongoDB...');
        await mongoose.connect(dbUri);
    } catch (error) {
        logger.error('Error connecting to database: ' + error);
        process.exit(1);
        }
    }

export default connect;
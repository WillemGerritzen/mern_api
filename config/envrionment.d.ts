declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_KEY: string;
            PRIVATE_KEY: string;
            PORT: number;
            SALT_WORK_FACTOR: number;
            MONGO_INITDB_ROOT_USERNAME: string;
            MONGO_INITDB_ROOT_PASSWORD: string;
            MONDODB_DATABASE: string;
            DB_URI: string;
            ACCESS_TOKEN_TTL: string;
            REFRESH_TOKEN_TTL: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
import * as dotenv from "dotenv";
dotenv.config()

export const credenciales = {
    FILE_SYSTEM_DB: process.env.FILE_SYSTEM_DB,
    MARIADB_HOST: process.env.MARIADB_HOST,
    MARIADB_DB: process.env.MARIADB_DB,
    MARIADB_USER: process.env.MARIADB_USER,
    MARIADB_PASSWORD: process.env.MARIADB_PASSWORD,
    MONGO_AUTENTICATION_API_KEY:process.env.MONGO_AUTHENTICATION_API_KEY,
    MONGO_SESSION_API_KEY:process.env.MONGO_SESSION_API_KEY
};
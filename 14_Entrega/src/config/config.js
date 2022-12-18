import path from 'path';
import {fileURLToPath} from 'url';
import { credenciales } from './configCredenciales.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const options = {
    mariaDb:{
        client:'mysql',
        connection:{
            host: credenciales.MARIADB_HOST,
            user: credenciales.MARIADB_USER,
            password:credenciales.MARIADB_PASSWORD,
            database:credenciales.MARIADB_DB,
            port: '4433'
        }
    },
    fileSystem:{
        path: path.join(__dirname , "../db/msgPersistence.txt")
    }
}
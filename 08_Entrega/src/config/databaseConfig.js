const path = require('path')

const options = {
    mariaDB:{
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'coderhousedb'
        }
    },
    sqlite:{
        client: 'sqlite3',
        connection: { filename: path.join(__dirname,'../db/database.sqlite') }
      },
      useNullAsDefault: true
};

module.exports = options;

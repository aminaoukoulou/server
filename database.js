const pg = require('pg')

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'sqmeal',
    password: 'amina',
    port: 5432
}

const client = new pg.Client(dbConfig)

client.connect()
 
module.exports = client


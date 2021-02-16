const { Client, Pool } = require('pg');

let client;
if (process.env.NODE_ENV && process.env.NODE_ENV === "developpement") { // prod
    try {
        client = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
        });
    } catch (error) {
        throw new Error(error);
    }
} else { // dev
    try {
        client = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
        });
    } catch (error) {
        throw new Error(error);
    }
    client.connect();
};

module.exports = client;
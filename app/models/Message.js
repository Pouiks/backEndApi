const db = require('../database');

class Message {
    constructor(data) {
        for(const prop in data) {
            this[prop] = data[prop];
        };
    };

    async save () {
        if(this.id) { 
            // V2 UPDATE
        } else { // On insert le message en BDD
            const message = await db.query(`
            INSERT INTO "message" (content, send_to, send_by)
            VALUES ($1, $2, $3)
            RETURNING id;`,
            [
                this.content,
                this.send_to,
                this.send_by
            ]); 
            if (message.rowCount) {
                this.id = message.rows[0].id;
            }
        }
    };
};

module.exports = Message;

const db = require('../database');

class User {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };
    
    // Récupérer un utilisateur via son ID
    static async findOne(id) {
        const user = await db.query(`
            SELECT * FROM "user" 
            WHERE id = $1;`, [id]
        );

        return user.rows[0];
    };

    // Récupérer le mail de l'utilisateur pour lui permettre de se connecter
    static async findByEmail(email) {
        const userByEmail = await db.query(`
            SELECT * FROM "user" 
            WHERE email = $1;`, [email]
        );

        return userByEmail.rows[0];
    };

    async save() { 
        if (this.id) { // Mise à jour de l'utilisateur 
            const user = await db.query(`
            UPDATE "user" 
            SET first_name = $1, city = $2, password = $3, address = $4, updated_at = $5
            WHERE id = $6
            RETURNING *;`,
            [
                this.first_name, 
                this.city,
                this.password, 
                this.address,
                'NOW()',
                this.id
            ]);
            return user.rows[0];
        } else { // On insert le nouvel utilisateur dans la BDD
            const user = await db.query(`
            INSERT INTO "user" (first_name, city, address, email, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;`, 
            [
                this.first_name,
                this.city,
                this.address,
                this.email,
                this.password,
            ]);
            if (user.rowCount) {
                this.id = user.rows[0].id;
            }
        }
    };

    // Suppression d'un compte utilisateur
    static async delete(id) {
        const user = await db.query(`
            DELETE FROM "user"
            WHERE id = $1`, [id]);
    };
};

module.exports = User;
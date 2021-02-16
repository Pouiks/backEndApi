const db = require('../database');

class Animal {
    constructor(data) {
        for(const prop in data) {
            this[prop] = data[prop];
        };
    };

    // On récupère un animal via son ID
    static async findOne(id){
        const animal = await db.query(`
            SELECT * FROM "animal" 
            WHERE id = $1;`, [id]
        );

        return animal.rows[0];
    };

    // On récupère les 8 derniers inscrits pour la page d'accueil
    static async lastAnimalsSignedUp(){
        const lastAnimalsSignedUp = await db.query(`
            SELECT image, name, breed, description
            FROM "animal" 
            ORDER BY created_at DESC
            LIMIT 8;`
        );

        return lastAnimalsSignedUp.rows;
    };

    // Récupérer tous les groupes dont l'animal fait partie
    static async findAllGroups(animalId) {
        const groups = await db.query(`
            SELECT "group".id, "group".name, "group".description, "group".city 
            FROM "group" 
            JOIN group_has_animal 
            ON "group".id = group_has_animal.group_id 
            WHERE group_has_animal.animal_id = $1;`, [animalId]
        );
        
        return groups.rows;
    };

    // Trouver l'animal via son user
    static async findByOwner(id) {
        const animal = await db.query(`
            SELECT * FROM "animal"
            WHERE user_id = $1`, [id]
        );

        return animal.rows[0];
    };   

    // Rejoindre un groupe
    static async join(group_id, animal_id) {
        const inserted = await db.query(` 
            INSERT into "group_has_animal" (group_id, animal_id)
            VALUES ($1, $2)
            RETURNING *`,
        [
            group_id,
            animal_id
        ]);

        return inserted;
    };
    
    async save() {
        // Met à jour l'animal
        if (this.id) { 
            const animal = await db.query(`
            UPDATE "animal" 
            SET name = $1, breed = $2, sex = $3, age = $4, size = $5, description = $6, updated_at = $7, image = $8 
            WHERE id = $9
            RETURNING *;`,
            [
                this.name, 
                this.breed,
                this.sex,
                this.age,
                this.size,
                this.description,
                'NOW()',
                this.image,
                this.id
            ]);
            return animal.rows[0];
        } else { // Insère l'animal en BDD
            const animal = await db.query(`
            INSERT INTO "animal" (name, breed, sex, age, size, description, user_id, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;`, 
            [
                this.name,
                this.breed,
                this.sex,
                this.age,
                this.size,
                this.description,
                this.user_id,
                this.image
            ]);
            if (animal.rowCount) {
                this.id = animal.rows[0].id;
             }
        }
    };
};

module.exports = Animal;
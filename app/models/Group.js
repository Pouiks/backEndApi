const db = require('../database');

class Group {
    constructor(data) {
        for(const prop in data) {
            this[prop] = data[prop];
        };
    };

    // Récupérer un groupe via son id
    static async findOne(id){
        // On récupère le total des membres du groupe (méthode déclarée plus bas)
        const totalMembersInTheGroup = await Group.findTotalMembers(id);

        const oneGroup = await db.query(`
            SELECT * FROM "group" 
            WHERE id = $1;`, [id]
        );
        
        return [totalMembersInTheGroup, oneGroup.rows[0]];
    };

     // Récupérer tous les groupes -- pour la page Home uniquement
    static async findAll() {
        const groups = await db.query(`
            SELECT * FROM "group"`
        );

        return groups.rows;
    };
    
    // Récupérer tous les groupes par ville 
    static async findAllByCity(name) {
        const groupsByCity = await db.query(`
            SELECT * FROM "group" 
            WHERE city = $1;`, [name]
        );

        return groupsByCity.rows;
    };

    //  Récupère tous les animaux du groupe 
    static async findAllAnimals(groupId) {
        const allAnimalsInTheGroup = await db.query(`
            SELECT "animal".id AS animal_id, "animal".name, "animal".image 
            FROM "animal", "group_has_animal", "group" 
            WHERE "group".id = $1 
            GROUP BY "animal".id, "group".id;`, [groupId]
        );

        return allAnimalsInTheGroup.rows;
    };

    //  Récupère le total des membres du groupe 
    static async findTotalMembers(groupId) {
        const totalMembersInTheGroup = await db.query(`
            SELECT COUNT(animal_id) AS total_members
            FROM "group_has_animal" 
            WHERE group_has_animal.group_id = $1;`, [groupId]
        );
    
        return totalMembersInTheGroup.rows[0]; // On retourne ici rows[0] pour renvoyer un objet et non un tableau : plus simple pour le front de récupérer cette donnée en objet
    };

    //  Récupère tous les messages de la chatroom du groupe 
    static async findAllMessages(groupId) {
        const messagesInTheGroup = await db.query(`
            SELECT animal.id, animal.name, animal.image, message.id, message.content, message.send_at
            FROM "message" 
            JOIN "group" 
            ON message.send_to = $1
            JOIN "animal" 
            ON message.send_by = animal.id 
            GROUP BY animal.id, message.id 
            ORDER BY message.send_at ASC;`, [groupId]
        );
        
        return messagesInTheGroup.rows;
    };

    async save () {
        //  pour différencier un INSERT d'un UPDATE, on va vérifier la présence d'un id
        if(this.id) { // il y a un id, on met à jour le groupe
            const group = await db.query(`
            UPDATE "group"
            SET name = $1, latitude = $2, longitude = $3, address = $4, city = $5, description = $6, updated_at = $7
            WHERE id = $8
            RETURNING *`,
            [
                this.name,
                this.latitude,
                this.longitude,
                this.address,
                this.city,
                this.description,
                'NOW()',
                this.id
            ]);
            if (group.rowCount) {
                return group.rows[0];
            };
            
        }else { // pas d'id, on l'insert en BDD
            const groupResult = await db.query(`
            INSERT INTO "group" (name, latitude, longitude, address, city, country, description, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;`, 
            [
                this.name,
                this.latitude,
                this.longitude,
                this.address,
                this.city, 
                this.country,
                this.description, 
                this.created_by, 
            ]); 
            if (groupResult.rowCount){
                this.id = groupResult.rows[0].id;
            }
        }
    };
};

module.exports = Group;
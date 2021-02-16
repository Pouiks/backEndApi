// THIS PART IS NO LONGER IN USE /!\

// const faker = require('faker');
// faker.locale = "fr";

// const user = [];
// const group = [];
// const animal= [];
// const message = [];
// const authorization = [];

// const createMockUsers = () => {
//     const obj = {
//         first_name: faker.name.firstName(),
//         city: faker.address.city(),
//         address: faker.address.streetAddress(),
//         email: faker.internet.email(),
//         password: faker.internet.password()
//     };
//     user.push(obj);
// };

// const createMockGroups = () => {
//     const obj = {
//         name: faker.name.firstName(), 
//         latitude: faker.address.latitude(),
//         longitude: faker.address.longitude(),
//         city: faker.address.city(),
//         country: faker.address.country(),
//         description: faker.lorem.paragraph(),
//         created_by: faker.random.number(100),
//         chatroom_id: faker.random.number(100)
//     };
//     group.push(obj);
// };

// const createMockAnimals  = () => {
//     const obj = {
//         name: faker.name.firstName(),
//         specie: faker.vehicle.model(), // faker ne fournit pas de données d'espèce d'animal
//         age: faker.random.number(25),
//         sex: faker.name.gender(),
//         description: faker.lorem.paragraph(),
//         breed: faker.vehicle.manufacturer(), // la même chôse qu'au dessus
//         size: "petit",
//         image: faker.image.animals(),
//         chat_id: faker.random.number(100)
//     };
//     animal.push(obj);
// };

// const createMockAuthorizations = () => {
//     const obj = {
//         cgu: faker.random.boolean(),
//         cookies: faker.random.boolean(),
//         localisation: faker.random.boolean()
//     };
//     authorization.push(obj);
// };

// const createMockMessages = () => {
//     const obj = {
//         content: faker.lorem.text(),
//         send_at: faker.time.recent() // il n'y a rien d'equivalent à timestamptz
//     };
//     message.push(obj);
// };

// n = 1; // représente le nombre d'objets créés par table
// for (let i = 0; i < n; i++) {
//     createMockUsers();
//     createMockGroups();
//     createMockAnimals();
//     createMockAuthorizations();
//     createMockMessages()
// };

// let datas = {
//     user,
//     group,
//     animal,
//     message,
//     authorization
// };

// datasJSON = JSON.stringify(datas);

// module.exports = datasJSON;


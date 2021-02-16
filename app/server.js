


require('dotenv').config();

const router = require('./router');

const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session'); 
const redis = require('redis');
const redisStore = require('connect-redis')(session);   
const generateUuid = require('./services/generateUuid');

// Express 
const server = express();
const port = process.env.PORT || 3001;

/** PARTIE HTTPS ET CORS QU'ON LAISSE POUR LA FIN */

// Permet la connection en https + Cors 
const https = require('https');
const http = require('http');
const fs = require('fs');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.meetmypet.fr/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.meetmypet.fr/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.meetmypet.fr/chain.pem', 'utf8');

const credentials = {
    key: privateKey,    cert: certificate,
    ca: ca
};

const httpServer = http.createServer(server);
const httpsServer = https.createServer(credentials, server);

server.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'] // verifier à quoi ça sert !
}))


// rend les infos envoyées en JSON disponibles dans request.body en format JSON
server.use(express.json());
server.use(bodyParser.json());
server.use(cookieParser());

server.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://ec2-52-86-71-5.compute-1.amazonaws.com:3000, http://www.meetmypet.fr');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    next();
    server.options('*', (req, res) => {
        // XHR methods autorisées :
        res.send();
    });
});

// PISTE A POURSUIVRE POUR UTILISER LE FRONT COMPILE
// app.use(express.static('build'));


// server.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret:'icjsdqpjcqopdjà-eZI',
//     credentials: true,
//     cookie: {
//       httpOnly: false, 
//       secure: false, 
//       maxAge: 1000 * 60 * 60 * 24, // 1 jour
//       sameSite: 'none'
//     }
// })); 
const redisClient = redis.createClient();
server.use(session({
    genid: (req) => {
        return generateUuid()
    },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
    name: '_meetmypet', 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
    }, 
    saveUninitialized: true
}));

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

// Rends disponible /uploads pour le front (avatars)
server.use(express.static(process.cwd() + '/uploads', { dotfiles: 'allow' }));
server.use(router);

httpServer.launch = () => {
    httpServer.listen(80, () => console.log(`HTTP SERVER RUNNING ON PORT 80`));
};

httpsServer.launch = () => {
    httpsServer.listen(443, () => console.log(`HTTPS SERVER RUNNING ON PORT 443`));
};


// NB : DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process
process.on('unhandledRejection', (err) => {
    console.log('Interception d\'un rejet de promesse');
    console.error(err);
});

module.exports = {
    httpServer,
    httpsServer
};


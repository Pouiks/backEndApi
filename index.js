const {httpServer, httpsServer} = require('./app/server');
httpServer.launch();
httpsServer.launch();
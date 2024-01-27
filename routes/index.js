const express = require('express');
const routes = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


routes.get('/', (req, res) => {
    // #swagger.tags = ['Hello World']
    res.send('Hello World');
});
routes.use('/users', require('./contacts'))
routes.use('/professional', require('./professionals'))
routes.use('/api-docs', swaggerUI.serve)
routes.use('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = routes;
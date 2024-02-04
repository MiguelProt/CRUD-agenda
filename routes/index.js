const express = require('express');
const routes = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

routes.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged In as ${req.session.user.displayName}` : 'Logged Out | Welcome to AGENDA API');
});
routes.use('/contacts', require('./contacts'))
routes.get('/login', passport.authenticate('github'), (req, res) => {
    //  #swagger.tags = ['Authentication'] = {
    // #swagger.description = 'The authentication use github validation that response to the callback url, in this case /github/callback'
    /*  #swagger.responses[200] = {
       description: 'OK',
    }
    #swagger.responses[404] = {
        description: 'FAILED',
    } */
});
routes.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if(err) { return next(err); }
        res.redirect('/');
    })
})
//calling the swagger routes here swagger don't generate the routes api-docs
routes.use('/api-docs', swaggerUI.serve)
routes.use('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = routes;
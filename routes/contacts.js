const express = require('express');
const contacts = require('../controllers/contacts');
const routes = express.Router();
const { check } = require('express-validator');

routes.get('/', contacts.getAllData);
routes.get('/:id', contacts.getAllData);
routes.post('/',[
    //firstName can not be a number
    check('firstName').isString().isLength({min: 3, max: 25})
],contacts.createUser);
routes.put('/:id', contacts.updateUser);
routes.delete('/:id', contacts.deleteUser);

module.exports = routes;
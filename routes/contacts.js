const express = require('express');
const contacts = require('../controllers/contacts');
const routes = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', contacts.getContact);
routes.get('/:id', contacts.getContact);
routes.post('/',[
    check('name')
        .isString()
        .isLength({min: 3, max: 25}),
    check('birthday')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('email')
        .isEmail()
        .withMessage('Please insert a valid email'),
    check('phone')
        .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/).
        withMessage('Please insert a valid phone number for example +529984834032')
], isAuthenticated, contacts.createContact);
routes.put('/:id', [
    check('name')
        .isString()
        .isLength({min: 3, max: 25}),
    check('birthday')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('email')
        .isEmail()
        .withMessage('Please insert a valid email'),
    check('phone')
        .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/).
        withMessage('Please insert a valid phone number for example +529984834032')
], isAuthenticated, contacts.updateContact);
routes.delete('/:id', isAuthenticated, contacts.deleteContact);

module.exports = routes;
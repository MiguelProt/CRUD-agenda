const { ObjectId } = require('mongodb');
const mongodb = require('../db/connections');
const { validationResult } = require('express-validator');

const collection = 'numbers';

const getContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    try {
        const id = req.params.id || null;
        let result = null;
        
        if (id) {
            result = await mongodb.getDatabase().db().collection(collection).find({_id: new ObjectId(id)});
            result.toArray().then((Contacts) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(Contacts)
            });
        }else {
            // console.log(await mongodb.getDatabase().db().listCollections().toArray());
            result = await mongodb.getDatabase().db().collection(collection).find();
            result.toArray().then((Contacts) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(Contacts)
            });
        }
        
    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createContact = async (req, res) => {
    // #swagger.tags = ['Contacts']

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
        const contact = {
            name: req.body.name,
            relation: req.body.relation,
            birthday: req.body.birthday,
            email: req.body.email,
            phone: req.body.phone
        }

        const response = await mongodb.getDatabase().db().collection(collection).insertOne(contact);
        if (response.acknowledged) {
            res.status(200).send(response);
        } else {
            res.status(500).send(response.error || 'There was an error creating the contact.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const updateContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    try {
        const id = req.params.id;
        const contact = {
            name: req.body.name,
            relation: req.body.relation,
            birthday: req.body.birthday,
            email: req.body.email,
            phone: req.body.phone
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
        }

        const response = await mongodb.getDatabase().db().collection(collection).updateOne({_id: new ObjectId(id)}, {$set: contact});
        if (response.acknowledged) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'There was an error updating the contact.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

const deleteContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const id = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection(collection).deleteOne({ _id: id }, true);
    
    if (response.deletedCount > 0) {
        res.status(200).send('Item deleted');
    } else {
        res.status(500).json(response.error || 'There was an error deleting the contact');
    }
}

module.exports = {
    getContact,
    createContact,
    updateContact,
    deleteContact
}
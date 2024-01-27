const { ObjectId } = require('mongodb');
const mongodb = require('../db/connections');
const { validationResult } = require('express-validator');

const collection = 'contact';

// const getAllData = async (req, res) => {
//     try {
//         const id = req.params.id;
//         let result = null;
//         if(id) {
//             result = await mongodb.getCollection(collection, id);
//         } else {
//             result = await mongodb.getCollection(collection);
//         }
//         res.status(200).send(result);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

// const insertDocument = async (req, res) => {
//     try {
//         const data = req.body;
//         if(!req.body) {
//             res.status(400).send('Bad Request');
//         }
//         const result = await mongodb.insertDocument(collection, data);
//         res.status(200).send(result);
//     } catch (error) {
//         console.error('Error Inserting data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }

// const updateDocument = async (req, res) => {
//     try {
//         const data = req.body;
//         const _id = req.params.id;
//         if(!data || !_id) {
//             res.status(400).send('Bad Request');
//         }

//         const result = await mongodb.updateDocument(collection, _id, data);
//         res.status(200).send({modifyCount: result.modifiedCount});
//     } catch (error) {
//         console.error('Error Updating data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }

// const deleteDocument = async (req, res) => {
//     try {
//         const _id = req.params.id;
//         if(!_id) {
//             res.status(400).send('Bad Request');
//         }
        
//         const result = await mongodb.deleteDocument(collection, _id);
//         res.status(200).send({deletedCount: result.deletedCount });
//     } catch (error) {
//         console.error('Error Updating data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// }

const getAllData = async (req, res) => {
    // #swagger.tags = ['Users']
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

const createUser = async (req, res) => {
    // #swagger.tags = ['Users']

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }

        const response = await mongodb.getDatabase().db().collection(collection).insertOne(user);
        if (response.acknowledged) {
            res.status(200).send(response);
        } else {
            res.status(500).send(response.error || 'There was an error creating the user.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const updateUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const id = req.params.id;
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }
        // const user = Object.assign({}, req.body);

        const response = await mongodb.getDatabase().db().collection(collection).updateOne({_id: new ObjectId(id)}, {$set: user});
        if (response.acknowledged) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'There was an error updating the user.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    const id = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection(collection).deleteOne({ _id: id }, true);
    
    if (response.deletedCount > 0) {
        res.status(200).send('Item deleted');
    } else {
        res.status(500).json(response.error || 'There was an error deleting the user');
    }
}

module.exports = {
    getAllData,
    createUser,
    updateUser,
    deleteUser
}
const mongodb = require('../db/connections');


const getAllData = async (req, res, next) => {
    // #swagger.tags = ['Others']
    try {
        const result = await mongodb.getCollection('user', '65a21c77623817016dc90dac');
        res.status(200).send(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllData
}
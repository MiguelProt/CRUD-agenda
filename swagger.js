const swaggerAutogen = require('swagger-autogen')();
const host = 'crud-agenda-2hjq.onrender.com';
const schemas = ['https', 'http'];

// const host = 'localhost:8080';
// const schemas = ['http', 'https'];

const doc = {
    info: {
        title: 'AGENDA API',
        description: 'API to save numbers/emails for the contacts like an online agenda'
    },
    host: host,
    schemes: schemas
}
 
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']
 
 
swaggerAutogen(outputFile, endpointsFiles, doc)
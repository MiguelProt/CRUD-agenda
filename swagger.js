const swaggerAutogen = require('swagger-autogen')();
const host = 'cse341-server-9xcw.onrender.com';
// const host = 'localhost:8080';

const doc = {
    info: {
        title: 'AGENDA API',
        description: 'API to save numbers/emails for the contacts like an online agenda'
    },
    host: host,
    schemes: ['https', 'http']
}
 
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']
 
 
swaggerAutogen(outputFile, endpointsFiles, doc)
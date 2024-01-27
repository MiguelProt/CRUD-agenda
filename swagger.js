const swaggerAutogen = require('swagger-autogen')();
const host = 'cse341-server-9xcw.onrender.com';
// const host = 'localhost:8080';

const doc = {
    info: {
        title: 'Contact API',
        description: 'This API will contain all the progress of the course.'
    },
    host: host,
    schemes: ['https', 'http']
}
 
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']
 
 
swaggerAutogen(outputFile, endpointsFiles, doc)
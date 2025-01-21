
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongodb = require('./db/db');
// const contactsRoutes = require('./routes/contactsRoutes');
// const path = require('path');
// const swaggerUI = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// const port = process.env.PORT || 8080;

// const swaggerOptions = {
//   swaggerDefinition: {
//     // Define your Swagger information here
//     info: {
//       title: 'Contacts API',
//       version: '1.0.0',
//       description: 'An API for managing contacts.',
//     },
//   },
 
//   apis: ['./routes/contactsRoutes.js'],
// };

// const app = express();

// app.use(bodyParser.json());

// // Initialize the MongoDB connection
// mongodb.initDb((err) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1);
//   } else {
//     // Use the Contacts routes
//     app.use('/contacts', contactsRoutes);

//     // Serve the static files
//     app.use(express.static('public'));

//     // Generate Swagger definition
//     const swaggerSpec = swaggerJsdoc(swaggerOptions);

//     // Initialize Swagger UI
//     app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//     app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
//   }
// });

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/db');
const contactsRoutes = require('./routes/contactsRoutes');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 8080;

const swaggerSpecOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'An API for managing contacts.',
    },
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            favoriteColor: { type: 'string' },
            birthday: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/contactsRoutes.js'],
};

const app = express();

app.use(bodyParser.json());

// Initialize the MongoDB connection
mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  } else {
    // Use the Contacts routes
    app.use('/contacts', contactsRoutes);

    // Generate Swagger definition
    const swaggerSpec = swaggerJsdoc(swaggerSpecOptions);

    // Initialize Swagger UI
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  }
});
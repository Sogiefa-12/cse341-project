// const express = require('express');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const { initDb } = require('./db/db');
// const contactsRoutes = require('./routes/contactsRoutes');
// const PORT = process.env.PORT || 8080;

// dotenv.config();

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const startApp = () => {
//   initDb((err, db) => {
//     if (err) {
//       console.log('Error connecting to MongoDB:', err);
//       return;
//     }

//     console.log('Connected to MongoDB');

//     app.use('/contacts', contactsRoutes);

//     app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
//   });
// };

// startApp();



const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { initDb } = require('./db/db');
const contactsRoutes = require('./routes/contactsRoutes');
const PORT = process.env.PORT || 8080;

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const tlsOptions = {
  minDHSize: 1024,
  secureProtocol: 'TLSv1_2_method'
};

const startApp = async () => {
  const PORT = process.env.PORT || 8080;

  app.use('/contacts', contactsRoutes);
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

  const db = await initDb({}, tlsOptions);

  console.log('Connected to MongoDB');
};

startApp();
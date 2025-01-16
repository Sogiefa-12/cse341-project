const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/db');
const contactsRoutes = require('./routes/contactsRoutes');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(express.static('public')); // Serve static files from the 'public' directory

mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  } else {
    app.use('/contacts', contactsRoutes);

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname + '/public/index.html'));
    });

    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  }
});
const express = require('express')
const appRoute = require('./routes/zoom');

require('dotenv').config();
require('./utilities/dbConnection')

const port = process.env.PORT
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/app', appRoute)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
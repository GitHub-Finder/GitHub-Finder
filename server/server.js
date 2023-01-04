const express = require('express');
require('dotenv').config();
const mongoConnect = require('./config/connection');
const cors = require('cors');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.listen(PORT, () => console.log(`App started at port ${PORT}`));

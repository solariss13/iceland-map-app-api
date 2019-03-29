const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getRegion = require('./controllers/getRegion')
const postRegion = require('./controllers/postRegion')

app.get('/', (req, res) => res.send("it's working"));
app.get('/region/:handle', (req, res) => {getRegion.handleGetRegion(req, res, Client)})
app.post('/region/:handle', (req, res) => {postRegion.handlePostRegion(req, res, Client)})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})

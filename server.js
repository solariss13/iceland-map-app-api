const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => res.send("it's working"));
app.get('/region/:handle', (req, res) => {
  const client = new Client ({
    user: 'postgres',
    password: 'Tu11PL023',
    host: '127.0.0.1',
    database: 'iceland_map_data',
    port: 5432,
  })
  
  client.connect()
    .then(() => {
      console.log("connected successfuly")    
      return client.query(
        "SELECT regions.name, regions.zoom, regions.minzoom, regions.maxzoom, regions.center, regions.bound1, regions.bound2, markers.name, markers.region, markers.position FROM regions INNER JOIN markers ON regions.name = markers.region WHERE regions.name = $1 ", [req.params.handle]
      )
    })
    .then((results) => {
      console.table(results.rows)
      res.json(results.rows)
    })
    .catch(err => console.log('err', err))
    .finally(() => client.end())
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('app is running on port 3001')
})

const handleGetRegion = (req, res, Client) => {
  const client = new Client ({
    connectionString: process.env.DATABASE_URL,
    ssl: true
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
}


module.exports = {
  handleGetRegion: handleGetRegion
}
const handlePostRegion = (req, res, Client) => {
  const client = new Client ({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })
  
  client.connect()
    .then(() => {
      console.log("connected successfuly")    

      const { name, region, position } = req.body;
      return client.query(
        "INSERT INTO markers (name, region, position) VALUES ($1, $2, $3) ", [name, region, position]
      )
    })
    .then((results) => {
      res.json('success')
    })
    .catch(err => console.log('err', err))
    .finally(() => client.end())
}

module.exports = {
  handlePostRegion: handlePostRegion
}
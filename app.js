const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const path = require('path')
const dbpath = path.join(__dirname, 'cricketTeam.db')
let db = null
const intialize = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server starting at  http://localhost:3000/players/')
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}
intialize()
app.get('/players', async (request, response) => {
  const getquery = `
    SELECT
    * 
    FROM 
    cricketTeam
  `
  const book = await db.all(getquery)
  response.send(book)
})

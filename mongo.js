//DB connection
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'gym';
async function DBconnect() {
    console.log("Entered")
try{
  await client.connect();
  console.log('Connected successfully database');
  const db = client.db(dbName);
  const g = db.collection('Members');
}
catch
{
res.status(404).send('Error connecting to DATABASE');
} 
}
DBconnect();
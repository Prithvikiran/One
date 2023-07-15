const express = require('express');
const basicAuth = require('express-basic-auth');

const a = express();
const port = 4000;

// const auth = basicAuth({
//   users: { 'PK': 'PKAPK', 'PWD': 'PWDAPK' },
//   challenge: true,
// });

// a.use(auth)

// a.get('/home', auth,function (req, res) {
//   res.sendFile(`${__dirname}/index.html`);
  
// });
// a.get('/homie', function (req, res) {
//     res.send("Hey bro , i love you ");
    
//   });
  

//MONGO CONNECTION
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'gym';
async function DBconnect() {

try{
  await client.connect();
  console.log('Connected successfully database');
//   const db = client.db(dbName);
//   const g = db.collection('Members');
 }
catch
{
res.status(404).send('Error connecting to DATABASE');
} 
}
DBconnect();

a.listen(port, () => {
  console.log('Server at ' + port);
});

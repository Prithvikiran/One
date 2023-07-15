const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const secretKey = 'your-secret-key';

app.use(express.json());
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

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  res.status(201).json({ message: 'User registered successfully' });
});

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const passwordMatch = bcrypt.compareSync(password, hashedPassword);
  if (passwordMatch) {
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

app.get('/private', authenticateToken, (req, res) => {
  const username = req.user.username;
  res.json({ message: `Protected data for user: ${username}` });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

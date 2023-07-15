const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(express.json());
const port = 5000

//DB connection
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'gym';
async function DBconnect() {
try{
  await client.connect();
  console.log('Connected successfully to the mongo database');
}
catch
{
res.status(404).send('Error connecting to DATABASE');
} 
}
DBconnect();



app.get('/members',async(req,res) =>
{
  try{
    const db = client.db('gym');
    const g = db.collection('Members');
    const findResult = await g.find({}).toArray();
    console.log(findResult);
    res.status(200).send('Hi there');
  }
  catch(err){
    res.status(500).send('ERROR')
  }
  
})

app.get('/members/:id',async(req,res) =>
{
  try{
    const db = client.db('gym');
    const g = db.collection('Members');
    console.log(req.params.id);
    const result = await g.findOne(req.params.id)
    try{
      if (result){
        console.log(result)
      }
    }
    catch(err){
      console.log("ID not Found")
    } 
    res.status(200).send('Hi there');
  }
  catch(err){
    res.status(500).send('ERROR');
  }
  
})
app.post('/members',async(req,res) =>
{
  try{
    const db = client.db('gym');
    const g = db.collection('Members');
    await g.insertOne(req.body);
    console.log('Record inserted');
      res.status(200).send('Data posted successfully');
  }
  catch(err){
    res.status(500).send('ERROR')
  }
  
})
app.put('/members/:id',async(req,res) =>{

  try{
    const {id} = req.params
    const db = client.db('gym');
    const g = db.collection('Members');
    await g.findByIdandUpdate(id,req.body);
    if(!g){
      res.status(404).send(`Cant find a member with id:${id}`);
    }
    console.log('Record inserted');
      res.status(200).send('Data posted successfully');
  }
  catch(err){
    res.status(500).send('ERROR')
  }
})
app.delete('/members/:id',async(req,res) =>{
 
  try{
    const db = client.db('gym');
    const g = db.collection('Members');
    await g.findByIdAnddelete(id,req.body);
    if(!g){
      res.status(404).send(`Cant find a member with id:${id}`);
    }
    console.log('Record deleted successfully');
      res.status(200).send('Data deleted successfully');
  }
  catch(err){
    res.status(500).send('ERROR')
  }
})
app.delete('/members/:id',async(req,res) =>{
 
  try{
    const db = client.db('gym');
    const g = db.collection('Members');
    await g.deleteOne(req.body);
    console.log('Record inserted');
      res.status(200).send('Data posted successfully');
  }
  catch(err){
    res.status(500).send('ERROR')
  }
})


app.listen((port),()=>{
    console.log(`Connected to server at port ${port}`);
})
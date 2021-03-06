const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = require('mongodb');
// use middle ware
app.use(cors());
app.use(express.json());

//user = Mongo_Db_User;
// password - gV9QtMEV0uOw16ph;

// mongodb



const uri = "mongodb+srv://Mongo_Db_User:gV9QtMEV0uOw16ph@cluster0.yoftv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const userCollection = client.db('foodApplication').collection('user')

      app.get('/user' , async(req ,res) =>{
          const query = {};
          const cursor = userCollection.find(query);
          const users = await cursor.toArray();
          res.send(users);
      })
      //post user : ad a new user

      // create a document to insert
      app.post('/user' , async(req, res)=>{
        const newUser = req.body;
        console.log('adding new user', newUser);
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      });
    } 
    finally {
    
    }
  }
  run().catch(console.dir);


app.get ('/' ,(req,res) =>{
    res.send("Running My Node Crud server")
});

app.listen(port,() => {
    console.log('run successfully');
})
 


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const objectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
require('dotenv').config()


const app = express()

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9pksi.mongodb.net/marathon?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    await client.connect();
    const database = client.db('marathon');
    const contents = database.collection('data');


    app.get('/',async (req,res) => {
        const result = await contents.find({}).toArray();
        res.status(200).json(result);
    })
}

run().catch(console.dir);




app.listen(process.env.PORT || 3000 , () => {
    console.log(`port is listening on ${process.env.PORT || 3000}`)
})
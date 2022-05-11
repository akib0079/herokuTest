const express = require("express");
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// middleware.
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASS}@cluster0.viy3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function runDataBase() {
    try {
        await client.connect();
        const packagesCol = client.db("Travel-Mania").collection("TourPackages");

        app.get('/packages', async (req, res) => {
            const query = {};
            const cursor = packagesCol.find(query);
            const allPackages = await cursor.toArray();

            res.send(allPackages);
        });

        app.get('/packages/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const package = await packagesCol.findOne(query);

            res.send(package);
        })
    }
    finally {

    }
}

runDataBase().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Connecting...! Connected now')
})

app.listen(port, () => {
    console.log('Updating port...');
})

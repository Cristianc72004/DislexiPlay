const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://criss2004:benalcazar12345@atlascluster.aplm47o.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("juego");
    const collection = db.collection("usuarios");
    console.log("Connected to MongoDB and selected the usuarios collection.");
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

module.exports = { connectToDatabase };

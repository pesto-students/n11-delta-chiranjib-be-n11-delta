const { MongoClient } = require('mongodb');

// function for getting boks from mongodb database
async function getBooks() {

    // connection creds
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const dbName = "bookshelf";
    const collectionName = "books";

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected successfully to the server.");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

module.exports = {
    getBooks: getBooks
}
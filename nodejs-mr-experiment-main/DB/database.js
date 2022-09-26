const mongoose = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

async function main(){
    const uri = "";
    const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await  listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    }

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);


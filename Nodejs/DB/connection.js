const uri = "";
const MongoClient = require('mongodb').MongoClient;
const timer = ms => new Promise(res => setTimeout(res, ms))

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;

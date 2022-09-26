const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000
const io = require('./Socket_IO/socket-io');

const app = express()
var bodyParser = require('body-parser')
const server = http.createServer(app)
const connectDB = require('./DB/connection')
const timer = ms => new Promise(res => setTimeout(res, ms))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")))
app.use('/js', express.static(__dirname + '/public/js'));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))




app.post('/',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log("this is the general post" + request.body['name']);
    if (request.body['name']){
    connectDB.connect(async (err,client)=>{
        const db = client.db("mr_test")
        const collection = db.collection("performance");
        console.log('Connected to the server', db.databaseName, collection.collectionName); 
        const s = {
                    name: request.body['name'],
                    created: new Date(),
                }
        collection.insertOne(s, function(err, r) {
            alert("Hello! I am an alert box!!");
            console.log('inside insertOne')
        });
        await timer(500)
    });
}
});
app.post('/color_benchmark',(request,response) => {
    let color_result = JSON.parse(Object.keys(request.body)[0])
    console.log(color_result)
    
    connectDB.connect(async (err,client2)=>{
        const db = client2.db("mr_test")
        const collection = db.collection("performance");
        console.log('Connected to the server', db.databaseName, collection.collectionName); 
        let lastInsertion = collection.find({}).sort({_id:-1}).limit(1);
        //Get the last inserted item
        lastInsertion.on("data", data => collection.updateOne({'name':data['name']},{$set:{'Color_Reaction_Time':color_result}}))
        await timer(500)
    });
});

app.post('/memory',(request,response) => {
    let memory_result = JSON.parse(Object.keys(request.body)[0])
    console.log("this is the final score of memory" + memory_result)
    connectDB.connect(async (err,client3)=>{
        const db = client3.db("mr_test")
        const collection = db.collection("performance");
        console.log('Connected to the server', db.databaseName, collection.collectionName); 
        let lastInsertion = collection.find({}).sort({_id:-1}).limit(1);
        //Get the last inserted item
        lastInsertion.on("data", data => collection.updateOne({'name':data['name']},{$set:{'Memory_score':memory_result}}))
        await timer(1000)
        client3.close();
    });
});

//establish io connection 

io.on('connection', function (socket) {
    // socket.emit("trigger",{memory:'1'})
    app.post('/colorgame_io',(request,response) => {
        let attack_trigger = JSON.parse(Object.keys(request.body)[0])
        console.log(attack_trigger)
        console.log("this color_attack is triggered "+ attack_trigger['color_attack'])
        if (attack_trigger['color_attack'] == "attack2"){
            socket.emit("colorattack",{color2:attack_trigger['color_attack']})
        }

        if (attack_trigger['color_attack'] == "attack5"){
            socket.emit("colorattackred",{color4:attack_trigger['color_attack']})
        }
        if (attack_trigger['color_attack'] == "attack2-2"){
            socket.emit("colorattack2",{color2:attack_trigger['color_attack']})
        }

        if (attack_trigger['color_attack'] == "attack5-2"){
            socket.emit("colorattackred2",{color4:attack_trigger['color_attack']})
        }
        if (attack_trigger['color_attack'] == "attack5-3"){
            socket.emit("colorattackred3",{color4:attack_trigger['color_attack']})
        }

    });
    app.post('/memory_attack',(request,response) => {
        let attack_trigger = JSON.parse(Object.keys(request.body)[0])
        console.log("this memory_attack is triggered "+ attack_trigger['memory_attack_signal'])
        //socket.emit("trigger",{memory:attack_trigger['memory_attack_signal']})
        if (attack_trigger['memory_attack_signal']=='100'){
            console.log("this memory_attack is triggered "+ " notification")
            socket.emit("trigger",{memory:attack_trigger['memory_attack_signal']})
        }
        if (attack_trigger['memory_attack_signal']=='1000'){
            console.log("this memory_attack is triggered "+ " fire")
            socket.emit("fire",{memory:attack_trigger['memory_attack_signal']})
        }
    });
});

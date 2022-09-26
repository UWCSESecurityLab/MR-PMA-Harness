let squareBtn = document.querySelector(".square");
let HomeBtn = document.querySelector("#HomeBtn");
let NextBtn = document.querySelector("#NextBtn");
let mouseCursor = document.querySelector(".cursor")
let nodes = document.querySelectorAll(".node");
let sequence = [];
let gameLevel = 0;
let restart = false;
let currrentSequence = 0;
let player_sequence= [];
let player_max = [];
let user_best_performance = 0;


squareBtn.addEventListener("click",()=> ChangeSquare(squareBtn));
HomeBtn.addEventListener("click",()=> returnHome());
NextBtn.addEventListener("click",()=> nextRound());
window.addEventListener("mousemove",cursor)


const timer = ms => new Promise(res => setTimeout(res, ms))
NextBtn.phasing = "first"

function ChangeSquare(){
    startGame()
    document.getElementById("container").remove()
}

function cursor(e){
    mouseCursor.style.top = e.pageY + "px";
    mouseCursor.style.left = e.pageX + "px";
}
function returnHome(){
    location.href="/index.html"
}

nodes.forEach(node=> node.addEventListener('click',async function(){
    if (restart){
        currrentSequence = 0
    }
    restart = false
    if (node.id != sequence[currrentSequence]){
        loseGame()
        return
    }
    currrentSequence ++
    console.log(currrentSequence,sequence.length)
    if (currrentSequence == sequence.length){
        await timer(400)
        startGame()
    }
}))

function injectAttack(){

}

function flipcard(id){
    var para = document.getElementById(id)
    para.classList.toggle('flip')
}

function changeBackground(color) {
    document.body.style.background = color;
 }

 async function startGame(){
    
    // inject attack signal
    if (NextBtn.phasing == "third" && currrentSequence == 2){
       // await timer(1500)
        fetch("//localhost:3000/memory_attack", {
            method: "POST", 
            //fire alarm
            body: JSON.stringify({"memory_attack_signal":100}),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }

        }).then(res => {
            console.log("inject notification complete! response:", res);
        });
    }
    if (NextBtn.phasing == "third" && currrentSequence == 5){
        // await timer(1500)
         fetch("//localhost:3000/memory_attack", {
             method: "POST", 
             //bunny
             body: JSON.stringify({"memory_attack_signal":1000}),
             headers: { "Content-Type": "application/x-www-form-urlencoded" }
 
         }).then(res => {
             console.log("inject notification complete! response:", res);
         });
     }
    restart = true
    gameLevel+=1
    document.getElementById("colorDisplay").innerHTML = "Level" +gameLevel
    await timer(500)
    generateNextRoundStep()
    DisplaySequence()
    
    
}
function loseGame(){
    user_best_performance = Math.max(user_best_performance,gameLevel)
    if (NextBtn.phasing == "third"){
        document.getElementById("colorDisplay").innerHTML = "You Final Score is "+ (gameLevel-1) +  "<br />" + "Click on" +  " <span class='month'>" + "Home" + "</span> ";
        document.getElementById("colorDisplay").addEventListener("click",()=> returnHome(),{once : true});

    }
    if (NextBtn.phasing == "second"){
        document.getElementById("colorDisplay").innerHTML = "You Final Score is "+ (gameLevel-1) +  "<br />" + "Click on" + " <span class='month'>" + "Next Game" + "</span> ";
        document.getElementById("colorDisplay").addEventListener("click",()=> nextRound(),{once : true});

    }
    if (NextBtn.phasing == "first"){
        document.getElementById("colorDisplay").innerHTML = "You Final Score is "+ (gameLevel-1) +  "<br />" + "<br />" + "Put on Mixed Reality Headset"+"<br />" +"<br />" +  "And click on" + " <span class='month'>" + "Next Game" + "</span> ";
        document.getElementById("colorDisplay").addEventListener("click",()=> nextRound(),{once : true});

    }
    fetch("//localhost:3000/memory", {
        method: "POST", 
        body: JSON.stringify(
            {memory_score:gameLevel-1}
            ),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(res => {
        console.log("Request complete! response:", res);
    });
    nodes.forEach(node=> node.style.opacity=0)
}

function generateNextRoundStep(){
    sequence = []
    let randomElement;
    for (let i=0;i<gameLevel;i++){
        randomElement= Math.floor(Math.random() * nodes.length);
        sequence.push(randomElement+1)
    }
}

async function DisplaySequence(){
    let sequenceLength = sequence.length;
    for (let i=0;i<sequenceLength;i++){
        flipcard(sequence[i])
        await timer(350)
        flipcard(sequence[i])
        await timer(350)
    }
}

function nextRound(){
    switch (NextBtn.phasing) {
        case "first":
            NextBtn.phasing = "second";
            nodes.forEach(node=> node.style.opacity=0.5)
            sequence = [];
            gameLevel = 0;
            restart = false;
            currrentSequence = 0;
            player_sequence= []
            startGame()
            break
        case "second":
            NextBtn.phasing = "third";
            nodes.forEach(node=> node.style.opacity=0.5)
            sequence = [];
            gameLevel = 0;
            restart = false;
            currrentSequence = 0;
            player_sequence= []
            startGame()
            break
        case "third":
            NextBtn.phasing = "fourth";
            nodes.forEach(node=> node.style.opacity=0.5)
            sequence = [];
            gameLevel = 0;
            restart = false;
            currrentSequence = 0;
            player_sequence= []
            startGame()
        case "fourth":
            location.href="/index.html"
        default:
            break;
    }
}



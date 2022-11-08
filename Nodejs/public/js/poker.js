let squareBtn = document.querySelector(".square");
let HomeBtn = document.querySelector("#HomeBtn");
let NextBtn = document.querySelector("#NextBtn");
let mouseCursor = document.querySelector(".cursor")
let gameRoundMax = 5; 
let tooSoon = false;
let result = [];
let uploadresult = [];
let benchmark_session = false 
let click = false
let instructions = ['If you see this message, raise your hand immediately'];
const timer = ms => new Promise(res => setTimeout(res, ms))

//initiate event listener & phasing
squareBtn.addEventListener("click",()=> startGame());
HomeBtn.addEventListener("click",()=> returnHome());
window.addEventListener("mousemove",cursor)


function returnHome(){
    location.href="/index.html"
}
function cursor(e){
    mouseCursor.style.top = e.pageY + "px";
    mouseCursor.style.left = e.pageX + "px";
}

async function startGame(){
    document.getElementById("next_text").innerHTML = ""
    document.getElementById("start_text_mr").innerHTML = ""
   
    document.getElementById("start_title").innerHTML = "..."
    document.getElementById("start_text").innerHTML = "Look Around to find the video"
    launchSignal()
    loadInstruction()
}

function Thankyou(){
    document.getElementById("start_title").innerHTML = "You have now finished the experiment";
    document.getElementById("start_text").innerHTML = "Thank you for participating"
}

async function loadInstruction(){
    await timer (15000)
    document.getElementById("start_text").innerHTML = instructions[0]  
    await timer (3000)
    document.getElementById("start_text").innerHTML = " <span style='text-decoration: underline;'>"+"If you see this message, raise your hand immediately" + "</span>";
    await timer (3000)
    document.getElementById("start_text").innerHTML = " <span style='text-decoration: overline #FF3028;'>"+"If you see this message, raise your hand immediately" + "</span>";
    await timer (3000)
    document.getElementById("start_text").innerHTML = " <span style='text-decoration: underline overline #FF3028;'>"+"If you see this message, raise your hand immediately" + "</span>";

}

async function launchSignal(){
    fetch("//localhost:3000/poker", {
            method: "POST", 
            body: JSON.stringify({"memory":'notification'}),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(res => {
            console.log("inject notification complete! response:", res);
        });
}
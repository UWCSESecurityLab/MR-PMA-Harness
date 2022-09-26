
let squareBtn = document.querySelector(".square");
let HomeBtn = document.querySelector("#HomeBtn");
let NextBtn = document.querySelector("#NextBtn");
let mouseCursor = document.querySelector(".cursor")
let gameRoundMax = 10; 
let tooSoon = false;
let result = [];
let uploadresult = [];
let toosoon = {};
let benchmark_session = false 
let click = false
let answer;
let error_signal = false;
let dict =  [];
let counter = 0;



//initiate event listener & phasing
squareBtn.addEventListener("click",()=> ChangeSquare(squareBtn));
HomeBtn.addEventListener("click",()=> returnHome());
NextBtn.addEventListener("click",()=> nextRound());

squareBtn.addEventListener("click",()=> console.log(squareBtn.phasing));
window.addEventListener("mousemove",cursor)
squareBtn.phasing  = "starting"
NextBtn.phasing = "third"

function returnHome(){
    location.href="/index.html"
}

function nextRound(){
    switch (NextBtn.phasing) {
        case "first":
            document.getElementById("next_text").innerHTML = "Click anywhere to start.";
            NextBtn.phasing = "second";
            gameRoundMax = 10; 
            squareBtn.phasing  = "starting"
            //ChangeSquare(squareBtn);
            break
        case "second":
            NextBtn.phasing = "third";
            document.getElementById("next_text").innerHTML = "Click anywhere to start.";
            gameRoundMax = 10; 
            squareBtn.phasing  = "starting"
            //ChangeSquare(squareBtn)
            break
        case "third":
            NextBtn.phasing = "fourth";
            document.getElementById("next_text").innerHTML = "Click anywhere to start.";
            gameRoundMax = 10; 
            squareBtn.phasing  = "starting"
            //ChangeSquare(squareBtn)
        case "fourth":
            location.href="/index.html"
        default:
            break;
    }
}
//make cursor looks larger so that user can see it in MR 
function cursor(e){
    mouseCursor.style.top = e.pageY + "px";
    mouseCursor.style.left = e.pageX + "px";
}

//generate a random waiting time 
function start(){
    this.startedWaitingTime = new Date;
    this.timeWaiting = ~~(3500+2500*Math.random())
}


function TurningGreen(){

    answer = setTimeout(()=>{        
        console.log("im testing")


        /***
         * Here we trigger the attack signal 
         * [perfect alignment with green]
         * [perfect alignment with red]
         * [imperfect alignment with green]
         * [imperfect alignment with red]
         * [perfect alignment with green at earlier time --> waiting time longer]
         */
        if (NextBtn.phasing == "third" && gameRoundMax == 8){
            console.log('sending signal to io')
            fetch("//localhost:3000/colorgame_io", {
                method: "POST", 
                body: JSON.stringify({"color_attack":"attack2"}),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }

            }).then(res => {
                console.log("Request complete! response:", res);
            });               

            setTimeout(()=>{
                squareBtn.style.backgroundColor = "green"
                document.getElementById("start_title").innerHTML = "..."
                document.getElementById("start_text").innerHTML = "Click!"
            },2000);
        }
        if (NextBtn.phasing == "third" && gameRoundMax == 7){
            console.log('sending signal to io')
            fetch("//localhost:3000/colorgame_io", {
                method: "POST", 
                body: JSON.stringify({"color_attack":"attack5"}),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }

            }).then(res => {
                console.log("Request complete! response:", res);
            });
            squareBtn.style.backgroundColor = "green"
            document.getElementById("start_title").innerHTML = "..."
            document.getElementById("start_text").innerHTML = "Click!"
        }
        if (NextBtn.phasing == "third" && gameRoundMax == 5){
            console.log('sending signal to io')
            fetch("//localhost:3000/colorgame_io", {
                method: "POST", 
                body: JSON.stringify({"color_attack":"attack5-2"}),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }

            }).then(res => {
                console.log("Request complete! response:", res);
            });
            squareBtn.style.backgroundColor = "green"
            document.getElementById("start_title").innerHTML = "..."
            document.getElementById("start_text").innerHTML = "Click!"
        }

        if (NextBtn.phasing == "third" && gameRoundMax == 4){
            console.log('sending signal to io')
            fetch("//localhost:3000/colorgame_io", {
                method: "POST", 
                body: JSON.stringify({"color_attack":"attack2-2"}),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }

            }).then(res => {
                console.log("Request complete! response:", res);
            });
            setTimeout(()=>{
                squareBtn.style.backgroundColor = "green"
                document.getElementById("start_title").innerHTML = "..."
                document.getElementById("start_text").innerHTML = "Click!"
            },2000);
        }

        if (NextBtn.phasing == "third" && gameRoundMax == 2){
            console.log('sending signal to io')
            fetch("//localhost:3000/colorgame_io", {
                method: "POST", 
                body: JSON.stringify({"color_attack":"attack5-3"}),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }

            }).then(res => {
                console.log("Request complete! response:", res);
            });
            squareBtn.style.backgroundColor = "green"
            document.getElementById("start_title").innerHTML = "..."
            document.getElementById("start_text").innerHTML = "Click!"
        }

        //change the html elements accordingly
        else{
        squareBtn.style.backgroundColor = "green"
        document.getElementById("start_title").innerHTML = "..."
        document.getElementById("start_text").innerHTML = "Click!"
        }
        this.StartAnswerTime = new Date();
        squareBtn.phasing = "Answer_Time";
    },this.timeWaiting);
    return answer
  
}

//simple average function
function arrayAverage(arr){
    var sum = 0;
    for(var i in arr) {
        sum += arr[i];
    }
    var numbersCnt = arr.length;
    return (sum / numbersCnt);
}

// Using swithc to handle different phasing
function ChangeSquare(squareBtn){
    switch (squareBtn.phasing) {
        case "starting":
            squareBtn.style.backgroundColor = "#E93b4b";
            document.getElementById("next_text").innerHTML = ""
            document.getElementById("start_title").innerHTML = "..."
            document.getElementById("start_text").innerHTML = "Wait For Green"
            squareBtn.phasing = "pending";
            start()
            TurningGreen()
            break

        case "pending":
            squareBtn.phasing = "starting";
            document.getElementById("start_title").innerHTML = "Too Soon"
            document.getElementById("start_text").innerHTML = "Click to Try Again"
            /*** 
             * This handles situation when user clicks too quick, and end previous setTimeout
             * Previous use promise to handle timeout
             * After use signal to abort promise, couldn't find a way to resume the promise call (signal.aborted always true)
             * Tried signal,bool,cancelInterval 
             * So I just change this to a varibale and directly call the clearTimeout
            **/
            clearTimeout(answer)
            break
        case "Answer_Time":
            let endDate = new Date();
            let Mseconds = (endDate.getTime()-this.StartAnswerTime.getTime());
            result.push(Mseconds);
            counter +=
            squareBtn.phasing = "resulting";

        case "resulting":
            gameRoundMax -= 1
            if (gameRoundMax>0){
                document.getElementById("start_title").innerHTML = "Reaction Time";
                document.getElementById("start_text").innerHTML = result[result.length - 1] + "ms! \n \n Click again :) ";
                squareBtn.phasing = "starting"
            }
            else{
                dict.push(result)
                document.getElementById("start_title").innerHTML = "Average Reaction Time";
                if (NextBtn.phasing == "third"){
                    document.getElementById("start_text").innerHTML = arrayAverage(result) + "ms" + "<br />" + "Click on" +  " <span class='month'>" + "Home" + "</span> ";
                    document.getElementById("start_text").addEventListener("click",()=> returnHome(),{once : true});

                    //send everything to DB
                    fetch("//localhost:3000/color_benchmark", {
                        method: "POST", 
                        body: JSON.stringify(dict),
                        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    
                    }).then(res => {
                        console.log("Request complete! response:", res);
                    });


                }
                if (NextBtn.phasing == "second"){
                    document.getElementById("start_text").innerHTML = arrayAverage(result) + "ms" + "<br />" + "Click on" + " <span class='month'>" + "Next Game" + "</span> ";
                    document.getElementById("start_text").addEventListener("click",()=> nextRound(),{once : true});
                    result = []
                }

                if (NextBtn.phasing == "first"){
                    document.getElementById("start_text").innerHTML = arrayAverage(result) + "ms" + "<br />" + "<br />" + "Put on Mixed Reality Headset"+"<br />" +"<br />" +  "And click on" + " <span class='month'>" + "Next Game" + "</span> ";
                    document.getElementById("start_text").addEventListener("click",()=> nextRound(),{once : true});
                    result = []

                }

            }
            
            break
        default:
            break;
    }
}

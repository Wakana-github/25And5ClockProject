let breakIncrement = document.getElementById("break-increment");
let breakDecrement = document.getElementById("break-decrement");
let sessionIncrement = document.getElementById("session-increment");
let sessionDecrement = document.getElementById("session-decrement");
let startStopButton = document.getElementById("start_stop");
let resetButton = document.getElementById("reset");
let breakLength = document.getElementById("break-length");
let sessionLength = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left");
let timer;
let timerStatus = "begin";
let timerLabel =  document.getElementById("timer-label");
let alarm =  document.getElementById("beep");


timerLabel.innerHTML = "Session";
startStopButton.addEventListener("click", () => startTimer(timeLeft.innerHTML));


// control Break and Session length with buttons.
breakIncrement.addEventListener("click", () =>{
    if(breakLength.innerHTML < 60){
        breakLength.innerHTML =   parseInt(breakLength.innerHTML) + 1;
    }; 
})
breakDecrement.addEventListener("click", () =>{
    if(breakLength.innerHTML > 1){
        breakLength.innerHTML =   parseInt(breakLength.innerHTML) - 1;
    }
})

sessionIncrement.addEventListener("click", () =>{
    if(sessionLength.innerHTML < 60){
        sessionLength.innerHTML =   parseInt(sessionLength.innerHTML) + 1;    
        if(sessionLength.innerHTML <= 9){
            timeLeft.innerHTML = "0" + sessionLength.innerHTML + ":00";
        }else{
            timeLeft.innerHTML = sessionLength.innerHTML + ":00";
        }
     
    };
})

sessionDecrement.addEventListener("click", () =>{
    if(sessionLength.innerHTML > 1){
        sessionLength.innerHTML =   parseInt(sessionLength.innerHTML) - 1;
        if(sessionLength.innerHTML <= 9){
            timeLeft.innerHTML = "0" + sessionLength.innerHTML + ":00";
        }else{
            timeLeft.innerHTML = sessionLength.innerHTML + ":00";
        }
    }
})

// Start or Stop the timer when the start/stop button was clicked.
function startTimer(timerTime) {
    if(timerStatus === "begin" || timerStatus ==="stopped"){
        // start the timer
        console.log('start the timer: passedtime: ' + timerTime);
        timerStatus = "counting";
        let currentTime = timerTime;
        timeLeft.innerHTML = timerTime;
        console.log('timer time: '+ timeLeft.innerHTML );
        timer = setInterval(() => {
            currentTime = decrementTime(currentTime);
            timeLeft.innerHTML = currentTime;
        }, 1000);
        // timer = setInterval(() => {timeLeft.innerHTML = decrementTime(timeLeft.innerHTML);}, 1000);
        
        
    } else if(timerStatus == "counting"){
        // stop the timer
        console.log("stop the timer");
        timerStatus = "stopped";
        clearInterval(timer);
    }
  
    }

 // reset the timer to its initial status
resetButton.addEventListener("click", () => {
    console.log('reset button clicked');
    clearInterval(timer);
    breakLength.innerHTML = '5';
    sessionLength.innerHTML = '25';
    timeLeft.innerHTML = "25:00";
    timerStatus = "begin";
    timerLabel.innerHTML = "Session";
    alarm.pause();
    alarm.currentTime = 0;
})

// count down timer display.
function decrementTime(timeString){
    timerStatus = "counting";
    
    if (typeof timeString === 'string') {
        console.log("timeString is string: " + timeString);
    let timeDisplay = timeString.split(":");
    let minuteDisplay =  parseInt(timeDisplay[0]);
    let secondDisplay = parseInt(timeDisplay[1]);

    secondDisplay -= 1;

    if(secondDisplay === -1){
        secondDisplay = 59;
        if(minuteDisplay > 0){
            minuteDisplay -= 1;
        }}
    if(secondDisplay === 0 && minuteDisplay === 0){
        clearInterval(timer);
        timerStatus = "stopped";
        timeLeft.innerHTML = "00:00";
        alarm.play();
        done();
    }
    if(minuteDisplay <= 9){
        minuteDisplay = "0" + minuteDisplay;
    }
    if(secondDisplay <= 9){
        secondDisplay = "0" + secondDisplay;
    }
    
    return timeLeft.innerHTML = minuteDisplay + ":" + secondDisplay;
} else{
    { console.log('timeString is not a string:', timeString);
        return "00:00";
    }
}
}

// after the timer reaches 00:00, update the label and timer length.
function done() {

    if (timerLabel.innerHTML === "Session") {
        console.log("Session complete, starting Break. timeLeft.innerHTML:" + timeLeft.innerHTML);
        let breakTime = breakLength.innerHTML <= 9 ? "0" + breakLength.innerHTML : breakLength.innerHTML;
        timeLeft.innerHTML = breakTime + ":00";
        timerLabel.innerHTML = "Break";
        console.log("break time: " + timeLeft.innerHTML.toString());
        startTimer(timeLeft.innerHTML.toString());
    } else {
        console.log("Break complete, starting Session.");
        let sessionTime = sessionLength.innerHTML <= 9 ? "0" + sessionLength.innerHTML.toString() : sessionLength.innerHTML.toString();
        timeLeft.innerHTML = sessionTime + ":00";
        timerLabel.innerHTML = "Session";
        console.log("Session time: " + timeLeft.innerHTML.toString());
        startTimer(timeLeft.innerHTML.toString());
    }
    
}

// Get name and capitalize correctly
while (true) {
    var playerName = prompt("What is your name?");
    if (playerName != "") {
        playerName = playerName[0].toUpperCase() + playerName.slice(1).toLowerCase();
        break;
    }
    alert("Please enter a name.")
}

// Set up data variables
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date();
var month = months[today.getMonth()];
var day = today.getDate();
var year = today.getFullYear();

// Add ordinal suffix (1st, 2nd, 3rd, etc.)
let j = day % 10;
let k = day % 100;
if (j == 1 && k != 11) {
    day += "st";
} else if (j == 2 && k != 12) {
    day += "nd";
} else if (j == 3 && k != 13) {
    day += "rd";
} else {
    day += "th";
}

// Game clock
let startTime;          
let totalTime = 0;
let fastestTime = Infinity; 

function updateLiveTime() {
    let timeString = new Date().toLocaleTimeString(); 
    document.getElementById("date").textContent = month + " " + day + ", " + year + " - " + timeString;
}

// Update the clock
updateLiveTime();
setInterval(updateLiveTime, 1000);

// Game state
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;

// Guessing Range
let currentRange = 3;
const radios = document.getElementsByName("level");

// Play button logic
document.getElementById("playBtn").addEventListener("click", function(){
    // Get range from selected radio
    for (let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            currentRange = parseInt(radios[i].value);
        }
    }

    // Round setup
    answer = Math.floor(Math.random() * currentRange) + 1;
    guessCount = 0;
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + currentRange + ":";
    document.getElementById("guess").value = "";
    
    // Set button states
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    for (let i = 0; i < radios.length; i++){
        radios[i].disabled = true;
    }

    // Start game clock
    startTime = new Date().getTime();
});

// Guess button logic
document.getElementById("guessBtn").addEventListener("click", function(){
    let userGuess = parseInt(document.getElementById("guess").value);
    document.getElementById("guess").value = "";

    if (isNaN(userGuess)) {
        document.getElementById("msg").textContent = "Please enter a valid number!";
        return;
    }

    guessCount++;

    // Win logic
    if (userGuess === answer) {
        if (guessCount === 1) {
            document.getElementById("msg").textContent = "Correct! It took you 1 guess.";
        } else {
            document.getElementById("msg").textContent = "Correct! It took you " + guessCount + " guesses.";
        }
    
        totalWins++;
        totalGuesses += guessCount;
        endRound();
        return;
    }

    // Give current guess a temperature based on proximity
    let diff = Math.abs(userGuess - answer);
    let temperature = "";

    if (diff <= 2) {
        temperature = "hot";
    } else if (diff <= 5) {
        temperature = "warm";
    } else {
        temperature = "cold";
    }

    // 3. Give hint: high/low with temperature
    if (userGuess > answer) {
        document.getElementById("msg").textContent = "Too high! You are " + temperature + ".";
    } else {
        document.getElementById("msg").textContent = "Too low! You are " + temperature + ".";
    }
});

// Give Up Button Logic
document.getElementById("giveUpBtn").addEventListener("click", function(){
    document.getElementById("msg").textContent = "Game Over. The answer was " + answer + ".";
    document.getElementById("guess").value = "";

    // Update stats
    totalGuesses += currentRange;
    totalWins++;
    endRound();
});

function endRound() {
    // Calculate elapsed time
    let endTime = new Date().getTime();
    let elapsedSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    totalTime += elapsedSeconds;

    if (elapsedSeconds < fastestTime) {
        fastestTime = elapsedSeconds;
    }

    let averageTime = totalTime / totalWins;

    // Reset button states
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    for (let i = 0; i < radios.length; i++){
        radios[i].disabled = false;
    }

    // Update win and guess stats
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    
    let avgGuess = totalWins > 0 ? (totalGuesses / totalWins).toFixed(2) : 0;
    document.getElementById("avgScore").textContent = "Average Score: " + avgGuess;

    // Time stats
    document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";
    document.getElementById("avgTime").textContent = "Average Time: " + averageTime.toFixed(2) + " seconds";
}

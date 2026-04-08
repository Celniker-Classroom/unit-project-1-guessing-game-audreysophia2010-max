// Get name and capitalize correctly
while (true) {
    var playerName = prompt("What is your name?");
    if (playerName != "") {
        playerName = playerName[0].toUpperCase() + playerName.slice(1).toLowerCase();
        break;
    }
    alert("Please enter a name.")
}

alert("Welcome, " + playerName + "!");

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

// Print current date at top of page
document.getElementById("date").textContent = (month + " " + day + ", " + year);

// Game state
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let currentRange = 3;
const radios = document.getElementsByName("level");

// Play button logic
document.getElementById("playBtn").addEventListener("click", function(){
    // Determine range from selected radio
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
});

// Guess button logic
document.getElementById("guessBtn").addEventListener("click", function(){
    let userGuess = parseInt(document.getElementById("guess").value);
    
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

    // Ask user to guess again
    } else if (userGuess > answer) {
        document.getElementById("msg").textContent = "Too high! Try again.";
    } else {
        document.getElementById("msg").textContent = "Too low! Try again.";
    }
});

// Give Up Button Logic
document.getElementById("giveUpBtn").addEventListener("click", function(){
    document.getElementById("msg").textContent = "Game Over. The answer was " + answer + ".";
    
    // Penalty: add the max range to total guesses
    totalGuesses += currentRange;
    endRound();
});

// Reset buttons after a win or giving up
function endRound() {
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    for (let i = 0; i < radios.length; i++){
        radios[i].disabled = false;
    }
}

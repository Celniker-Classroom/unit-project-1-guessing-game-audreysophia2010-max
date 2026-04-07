// Get name
var playerName = prompt("What is your name?");
playerName = playerName[0].toUpperCase() + playerName.slice(1).toLowerCase();
alert("Welcome, " + playerName + "!");

// Print current date
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date();

var month = months[today.getMonth()];
var day = today.getDate();
var year = today.getFullYear();
document.getElementById("date").textContent = (month + " " + day + ", " + year);

// Game state
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = 0;

// Play
document.getElementById("playBtn").addEventListener("click", function(){
    // Set range based on selected level
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            range = parseInt(radios[i].value)
        }
    }

    // Round setup
    answer = Math.floor(Math.random() * range) + 1;

    // Disable and enable buttons
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range + ":";
    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    for (let i = 0; i < radios.length; i++){
        radios[i].disabled = true;
    }

})

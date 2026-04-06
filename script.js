// add javascript here
var input = prompt("What is your name?");
input = input[0].toUpperCase() + input.slice(1).toLowerCase();
alert("Welcome, " + input + "!");

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var today = new Date();

var dayName = days[today.getDay()];
var month = today.getMonth() + 1; 
var day = today.getDate();
var year = today.getFullYear();
document.getElementById("date").textContent = (dayName + " " + day + + year);
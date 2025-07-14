document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored assistant's name from localStorage
    const chosenAssistantName = localStorage.getItem('chosenAssistant');

    // Get a reference to the <b> element where you want to display the name
    const chosenAssistantElement = document.getElementById('chosenAssistant');

    // Check if the assistant name was found and the element exists
    if (chosenAssistantName && chosenAssistantElement) {
        // Set the text content of the <b> element to the chosen name
        chosenAssistantElement.textContent = chosenAssistantName;
    } else {
        // Optional: Handle cases where the data isn't found (e.g., direct navigation)
        console.warn("No assistant found in local storage or target element missing.");
        if (chosenAssistantElement) {
            chosenAssistantElement.textContent = "someone (error)"; 
        }
    }

});


//stop watch//
const display = document.getElementById("watch-display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }

}

function stop(){
    if(isRunning){
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    
    }
    
}

function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    
}


function update(){
const currentTime = Date.now();
elapsedTime = currentTime -  startTime;

let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
let seconds = Math.floor(elapsedTime / 1000 % 60);
let milliseconds = Math.floor(elapsedTime % 1000  / 10);

hours = String(hours).padStart(2, "0");
minutes = String(minutes).padStart(2, "0");
seconds = String(seconds).padStart(2, "0");
milliseconds = String(milliseconds).padStart(2, "0");

display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`
    
}

//Rock Paper Scissors Game//


const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const peteDisplay = document.getElementById("peteDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const peteScoreDisplay =document.getElementById("peteScoreDisplay");
let playerScore = 0;
let peteScore = 0;
let roundCount = 0; // Initialize round counter
const MAX_ROUNDS = 5; // Define the maximum number of rounds

function playGame(playerChoice){
    // If the maximum number of rounds has been played, prevent further game logic
    if (roundCount >= MAX_ROUNDS) {
        resultDisplay.textContent = "Game over! Refresh to play again.";
        return; // Exit the function
    }

    const peteChoice = choices[Math.floor(Math.random() *3)];
    let result = "";

    if(playerChoice === peteChoice){
        result = "It's a tie!";
    }
    else{
        switch(playerChoice){
            case "rock":
               result= (peteChoice ==="scissors")  ? "YOU WIN!" : "You lose!";
               break;

            case "paper":
               result= (peteChoice ==="rock")  ? "YOU WIN!" : "You lose!";
            break;

            case "scissors":
               result= (peteChoice ==="paper")  ? "YOU WIN!" : "You lose!";
               break;
        }
    }

    playerDisplay.textContent = `Vacay: ${playerChoice}`;
    peteDisplay.textContent = `Pete: ${peteChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");

    switch(result){
        case "YOU WIN!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            break;
        case "You lose!":
            resultDisplay.classList.add("redText");
            peteScore++;
            peteScoreDisplay.textContent = peteScore;
            break;
    }

    roundCount++; // Increment the round counter after each round

    if (roundCount === MAX_ROUNDS) { // Check if this is the final round
        let finalMessage = "Final Result - ";
        if (playerScore > peteScore) {
            finalMessage += "You win the game! ";
        } else if (peteScore > playerScore) {
            finalMessage += "Pete wins the game! ";
        } else {
            finalMessage += "It's a draw! Pete volunteers to drive first, but you can't complain about his playlist! ";
        }
        finalMessage +=  `Click the play again button if you want.`;
        resultDisplay.textContent = finalMessage;
    }
}
function refreshGame() {
    location.reload(); 
}

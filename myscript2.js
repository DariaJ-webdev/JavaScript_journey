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
            chosenAssistantElement.textContent = "someone (error)"; // Fallback text
        }
    }
});

const display = document.getElementById("display");

function appendToDisplay (input){
 display.value += input;
}

function clearDisplay(){
    display.value = "";
    
}

function calculate (){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}


//Map Pin at the bottom of the page//

document.addEventListener('DOMContentLoaded', () => { // Ensure HTML is loaded before script runs
    const destinationButton = document.getElementById('onward');

    if (destinationButton) { // Check if the button exists before adding listener
        destinationButton.addEventListener('click', () => {
            // Replace 'your-destination-page.html' with the actual URL you want to navigate to
            window.location.href = 'car.html';
        });
    }
});
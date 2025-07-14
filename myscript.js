//Welcome page: Vacay gets an assistant//

const dropdown = document.getElementById('assistants');
const confirmationMessageElement = document.getElementById('confirmationMessage');
const continueButton = document.getElementById('continueButton');

dropdown.addEventListener('change', (event) => {
    const selectedAssistant = event.target.value;

    if (selectedAssistant === "") { 
        confirmationMessageElement.textContent = "Please make a valid selection.";
        confirmationMessageElement.style.color = "red";
        continueButton.style.display = "none"; // Hide the button
    } else {
        confirmationMessageElement.textContent = `Great! You have chosen ${selectedAssistant}! Click 'Get started' to proceed.`;
        confirmationMessageElement.style.color = "green";
        continueButton.style.display = "block"; 
    }

    
});

// Add an event listener to the continue button
continueButton.addEventListener('click', () => {
   
    window.location.href = 'Javascript_journey/budget.html'; 
    localStorage.setItem('chosenAssistant', dropdown.value);
});

//End of Welcome Page//



// myscript3.js



document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored assistant's name from localStorage
    const chosenAssistantName = localStorage.getItem('chosenAssistant');
    const chosenAssistantElement = document.getElementById('chosenAssistant');

    if (chosenAssistantName && chosenAssistantElement) {
        chosenAssistantElement.textContent = chosenAssistantName;
    } else {
        console.warn("No assistant found in local storage or target element missing.");
        if (chosenAssistantElement) {
            chosenAssistantElement.textContent = "someone (error)";
        }
    }

    const slides = document.querySelectorAll(".slides img");
    let slideIndex = 0;
    let intervalId = null;
    const textContentDiv = document.querySelector('.car-text-content'); 
    const continueToZealButton = document.getElementById('continueToZeal');

    function showSlide(index) {
        if (index >= slides.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex = index;
        }

        slides.forEach(slide => {
            slide.classList.remove("displaySlide");
        });
        slides[slideIndex].classList.add("displaySlide");
    }

    
    window.prevSlide = function() {
        clearInterval(intervalId); // Stop auto-slide on manual interaction
        slideIndex--;
        showSlide(slideIndex);
    }

    window.nextSlide = function() {
        
        clearInterval(intervalId); // manual click should stop auto-play
        slideIndex++;
        showSlide(slideIndex); 
    }

    // Initialize slider function
    function initializeSlider() {
        if (slides.length > 0) {
            slides[slideIndex].classList.add("displaySlide");
            // Use window.nextSlide for setInterval
            intervalId = setInterval(window.nextSlide, 3000); // Changed to 3000ms (3 seconds)
        }
    }

    // Call initializeSlider directly after DOMContentLoad
    initializeSlider();

    // Add double-click event listeners to each slide for car selection confirmation
    slides.forEach(slide => {
        slide.addEventListener('dblclick', (event) => {
            const selectedCarAlt = event.target.alt;

            const existingMessage = document.getElementById('carConfirmation');
            if (existingMessage) {
                existingMessage.remove();
            }

            const confirmationMessage = document.createElement('p');
            confirmationMessage.id = 'carConfirmation';
            confirmationMessage.style.color = '#1818aa';
            confirmationMessage.style.fontSize = '32px';
            confirmationMessage.textContent = `Excellent choice! You picked the ${selectedCarAlt} car for Vacay and Pete!`;
            textContentDiv.appendChild(confirmationMessage);
        
             if (continueToZealButton) {
                continueToZealButton.style.display = 'block'; 
            }
        });
    });

    
    if (continueToZealButton) {
        continueToZealButton.addEventListener('click', () => {
            window.location.href = 'zeal.html';
        });
    }
});
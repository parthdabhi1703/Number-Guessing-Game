alert("How to Play the Number Guessing Game:\n\n" +
  "1. Click on 'Enter a Random Max Number': Input any positive number to set the maximum range for the game.\n" +
  "2. Click 'Start': This will generate a random number between 1 and the maximum number you entered.\n" +
  "3. Make Your Guess: Enter your guess in the input field.\n" +
  "4. Receive Hints: After each guess, you'll receive feedback indicating whether your guess is too low or too high.\n" +
  "5. Win the Game: If you guess the correct number, you'll see a congratulatory message and confetti will be launched!\n" +
  "6. Quit the Game: If you want to end the game, click the 'Quit' button, which will also allow you to start a new game later.\n" +
  "7. Dark Mode: You can toggle dark mode on or off using the switch provided for a different visual experience.\n\n" +
  "Good luck, and have fun guessing the generated number!");

// Game Logic
const startBtn = document.getElementById("startBtn");
const quitBtn = document.getElementById("quitBtn");
const guessInput = document.getElementById("guessInput");
const maxNumberInput = document.getElementById("maxNumber");
const hintMessage = document.getElementById("hintMessage");
const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
let random, max;

// Prevent non-numeric input
function validateNumericInput(inputElement) {
  inputElement.addEventListener("input", function () {
    inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
  });
}

// Apply validation to both inputs
validateNumericInput(maxNumberInput);
validateNumericInput(guessInput);

// Start Game event
startBtn.addEventListener("click", () => {
  max = parseInt(maxNumberInput.value);

  // Check if the max number input is a valid positive number
  if (isNaN(max) || max <= 0) {
    hintMessage.textContent = "Please enter a valid number greater than 0!";
    guessInput.disabled = true;
    return;
  }

  random = Math.floor(Math.random() * max) + 1;
  hintMessage.innerHTML = "Game started!<br> Guess a number!";
  guessInput.disabled = false;

  // Disable the Start button after the game has started
  startBtn.disabled = true; // Prevent further clicks
});

// Input event for guessing the number
guessInput.addEventListener("input", () => {
  let guess = parseInt(guessInput.value);

  if (guess === random) {
    hintMessage.innerHTML = `You are right! Congrats!!<br>The random number was ${random}`;
    guessInput.disabled = true;

    // Launch confetti when the user wins
    launchConfetti();

    // Re-enable the Start button after winning
    startBtn.disabled = false; // Allow starting a new game
  } else if (guess < random) {
    hintMessage.textContent = "Hint: Your guess is too small. Please try again.";
  } else {
    hintMessage.textContent = "Hint: Your guess is too large. Please try again.";
  }
});

// Quit Game event
quitBtn.addEventListener("click", () => {
  hintMessage.textContent = "User  quit.";
  guessInput.disabled = true;

  // Re-enable the Start button when the user quits
  startBtn.disabled = false; // Allow starting a new game
});

// Dark mode functionality
function enableDarkMode() {
  document.body.classList.add("dark-mode");
  document.querySelector(".container").classList.add("dark-mode");
  document.querySelectorAll('input[type="number"], input[type="text"]').forEach((el) => {
    el.style.backgroundColor = "var(--container-bg-color)";
    el.style.color = "var(--love-color)";
  });
}

function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  document.querySelector(".container").classList.remove("dark-mode");
  document.querySelectorAll('input[type="number"], input[type="text"]').forEach((el) => {
    el.style.backgroundColor = "var(--background-color)";
    el.style.color = "black";
  });
}

// Check local storage for dark mode setting on page load
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("toggleDarkMode");
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  // Set the initial state of dark mode based on local storage
  if (isDarkMode) {
    darkModeToggle.checked = true; // Ensure the toggle switch is checked
    enableDarkMode();
  }

  // Add event listener for the toggle switch
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      enableDarkMode();
      localStorage.setItem("darkMode", "true");
    } else {
      disableDarkMode();
      localStorage.setItem("darkMode", "false");
    }
  });
});

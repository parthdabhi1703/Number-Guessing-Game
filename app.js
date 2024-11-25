alert(
  "🎯 Welcome to the Number Guessing Game!\n\n" +
  "Here are the rules:\n" +
  "1️⃣ Enter a maximum number, and a secret number will be randomly generated between 1 and your chosen number.\n" +
  "2️⃣ Your task is to guess the secret number.\n" +
  "3️⃣ After each guess, you'll get a hint:\n" +
  "   🔼 'Too high!' if your guess is greater than the secret number.\n" +
  "   🔽 'Too low!' if your guess is less than the secret number.\n" +
  "4️⃣ Keep guessing until you find the correct number!\n\n" +
  "💡 Tip: Try to guess strategically instead of randomly.\n\n" +
  "Ready? Let’s play! 🎉"
);

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

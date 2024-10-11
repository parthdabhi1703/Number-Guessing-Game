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
    hintMessage.textContent =
      "Please enter a valid number greater than 0!";
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
    hintMessage.textContent =
      "Hint: Your guess is too small. Please try again.";
  } else {
    hintMessage.textContent =
      "Hint: Your guess is too large. Please try again.";
  }
});

// Quit Game event
quitBtn.addEventListener("click", () => {
  hintMessage.textContent = "User quit.";
  guessInput.disabled = true;

  // Re-enable the Start button when the user quits
  startBtn.disabled = false; // Allow starting a new game
});

// Dark mode toggle functionality
toggleDarkModeBtn.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
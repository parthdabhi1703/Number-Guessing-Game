 // Confetti logic
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas"); // Use existing canvas

  // Configure the confetti burst
  const confettiSettings = {
    particleCount: 1000,
    spread: 70,
    origin: { y: 0.6 },
  };

  // Use canvas-confetti library to create the confetti burst
  const myConfetti = confetti.create(canvas, {
    resize: true, // Resize to fit canvas
    useWorker: true, // Use web workers for performance
  });

  // Launch the confetti
  myConfetti({
    particleCount: confettiSettings.particleCount,
    spread: confettiSettings.spread,
    origin: confettiSettings.origin,
  });

  // Clear the confetti after 4.5 seconds
  setTimeout(() => {
    myConfetti.reset(); // Clears the confetti and resets the canvas
  }, 4500);
}

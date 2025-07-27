console.log("Welcome to Tic Tac Toe");

// Initialize variables
let numClick = 0;
const audio1 = document.getElementById('click-audio');
const audio2 = document.getElementById('end')
const audio3 =document.getElementById('backMusic')
audio3.currentTime = 0; // Reset audio to start
            audio3.play(); 
            if(audio3.currentTime ==285 ){
              audio3.currentTime = 0;
              audio3.play();
            }
// Utility function to display the overlay with a message
function gameOver(message) {
  const overlay = document.getElementById('gameOverOverlay');
  overlay.style.display = 'flex';
  overlay.querySelector('h2').textContent = message; // Update message
  audio2.currentTime = 0; // Reset audio to start
            audio2.play(); 

}

// Restart the game
function restartGame() {
  audio3.currentTime = 0
  const overlay = document.getElementById('gameOverOverlay');
  overlay.style.display = 'none'; // Hide overlay

  // Clear all boxes and reset styles
  document.querySelectorAll('.box').forEach(el => {
    el.textContent = '';
    el.style.color = '';
  });

  // Hide all winning lines
  for (let i = 1; i <= 8; i++) {
    document.querySelector(`.line${i}`).style.opacity = 0;
  }

  // Reset variables
  numClick = 0;
}

// Check for a winner
function checkWinner(elements, indices, lineClass) {
  const [a, b, c] = indices;

  if (
    elements[a].textContent &&
    elements[a].textContent === elements[b].textContent &&
    elements[b].textContent === elements[c].textContent
  ) {
    // Highlight winning boxes
    indices.forEach(i => (elements[i].style.color = 'red'));

    // Show winning line
    document.querySelector(`.${lineClass}`).style.opacity = 1;

    // Show game over message
    const winner = elements[a].textContent === 'O' ? 'Player A' : 'Player B';
    gameOver(`Yeah! ${winner} wins`);
    return true;
  }
  return false;
}

// Main game logic
document.querySelectorAll('.box').forEach(el => {
  el.addEventListener('click', () => {
    // Check if box is empty
    audio1.currentTime = 0; // Reset audio to start
            audio1.play(); 

    if (!el.textContent) {
      // Alternate between O and X
      el.textContent = numClick % 2 === 0 ? 'O' : 'X';
      numClick++;

      const elements = document.querySelectorAll('.box');

      // Check all winning conditions
      const winningLines = [
        [[0, 1, 2], 'line1'],
        [[3, 4, 5], 'line2'],
        [[6, 7, 8], 'line3'],
        [[0, 3, 6], 'line4'],
        [[1, 4, 7], 'line5'],
        [[2, 5, 8], 'line6'],
        [[0, 4, 8], 'line7'],
        [[2, 4, 6], 'line8'],
      ];

      for (const [indices, lineClass] of winningLines) {
        if (checkWinner(elements, indices, lineClass)) {
          return; // Exit if there's a winner
        }
      }

      // Check for draw
      if (numClick === 9) {
        gameOver("Oops! It's a draw");
      }
    }
  });
});

// Bind restart button
document.getElementById('restart').addEventListener('click', restartGame);

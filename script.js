document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const submitWord = document.getElementById('submitWord');
    const wordsList = document.getElementById('words');
    const errorDisplay = document.getElementById('error');
    
    // This makes a variable of the container in the script
    const container = document.querySelector('.container');

    // this is to make submit button the same class as restart button for CSS
    submitWord.classList.add('mainButton');
    
    // The Restart button is made in the script to avoid using IDs
    const restartButton = document.createElement('button');
    restartButton.id = 'restartButton';
    restartButton.classList.add('mainButton');
    restartButton.textContent = 'Restart Game';
    restartButton.style.display = 'none'; // Hidden to begin with
    container.appendChild(restartButton); // Adds it to the container

    let words = [];
    let gameOver = false;

    submitWord.addEventListener('click', () => {
        if (gameOver) return;

        const newWord = wordInput.value.trim().toLowerCase();

        if (!newWord) {
            errorDisplay.textContent = 'Please enter a word.';
            return;
        }

        if (words.length > 0) {
            const lastWord = words[words.length - 1];
            const lastLetter = lastWord.slice(-1);

            if (newWord[0] !== lastLetter) {
                errorDisplay.textContent = `Word must start with '${lastLetter}'.`;
                endGame();
                return;
            }
        }

        if (words.includes(newWord)) {
            errorDisplay.textContent = 'Word already used. Try a different one.';
            endGame();
            return;
        }

        words.push(newWord);
        updateWordList();
        wordInput.value = '';
        errorDisplay.textContent = '';
    });

    function updateWordList() {
        wordsList.innerHTML = '';
        words.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            wordsList.appendChild(li);
        });
    }

    function endGame() {
        gameOver = true;
        errorDisplay.textContent += ' Game Over!';
        wordInput.disabled = true;
        submitWord.disabled = true;

        // Show the Restart button
        restartButton.style.display = 'block';
    }

    // Restart game logic
    restartButton.addEventListener('click', () => {
        words = [];
        gameOver = false;
        errorDisplay.textContent = '';
        wordInput.disabled = false;
        submitWord.disabled = false;
        wordInput.value = '';
        updateWordList();

        // Hide the Restart button again
        restartButton.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // References to HTML elements
    const letterContainer = document.querySelector('.letterInputContainer'); // Container for letter input blocks
    const submitWord = document.getElementById('submitWord');
    const wordsList = document.getElementById('words');
    const errorDisplay = document.getElementById('error');
    const leaderboardList = document.getElementById('leaderboardList');

    let words = []; // Array to store words used
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}'); // Retrieve leaderboard
    const currentUser = localStorage.getItem('currentUser'); // Retrieve username

    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }

    const container = document.querySelector('.container');
    submitWord.classList.add('mainButton');

    // Create Restart button in script
    const restartButton = document.createElement('button');
    restartButton.id = 'restartButton';
    restartButton.classList.add('mainButton');
    restartButton.textContent = 'Restart Game';
    restartButton.style.display = 'none'; // Hidden to begin with
    container.appendChild(restartButton); // Adds it to the container

    let gameOver = false;
    let wrongAttempts = 0; // Counter for wrong attempts
    const maxWrongAttempts = 3; // Maximum wrong attempts allowed

    let dictionary = {}; // Dictionary to store words from JSON

    fetch('wordsDictionary.json')
        .then(response => response.json())
        .then(data => {
            dictionary = data;
        });

    // Create letter input blocks
    const maxWordLength = 10;
    createLetterInputs(maxWordLength);

    // Function to dynamically create letter input fields
    function createLetterInputs(maxLength) {
        letterContainer.innerHTML = ''; // Clear existing inputs
        for (let i = 0; i < maxLength; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1; // Allow only one letter per input
            input.classList.add('letterBlock');
            input.addEventListener('input', moveToNextInput);
            input.addEventListener('keydown', handleKeyPress);
            letterContainer.appendChild(input);
        }
    }

    // Move to the next input field when a letter is typed
    function moveToNextInput(event) {
        const input = event.target;
        const nextInput = input.nextElementSibling;
        if (input.value && nextInput && nextInput.tagName === 'INPUT') {
            nextInput.focus();
        }
    }

    // Handle key presses including Enter and Backspace
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            submitWord.click(); // Trigger a click event on the submit button
        } else if (event.key === 'Backspace') {
            event.preventDefault();
            handleBackspace(event);
        }
    }

    // Handle Backspace key press
    function handleBackspace(event) {
        const input = event.target;
        const prevInput = input.previousElementSibling;

        // Clear the current input field
        input.value = '';

        // Move focus to the previous input field if it exists
        if (prevInput && prevInput.tagName === 'INPUT') {
            prevInput.focus();
        }
    }

    submitWord.addEventListener('click', () => {
        if (gameOver) return;

        const newWord = Array.from(letterContainer.querySelectorAll('input'))
            .map(input => input.value.trim().toLowerCase())
            .join('');

        if (!newWord) {
            errorDisplay.textContent = 'Please enter a word.';
            return;
        }

        // Check if the word is in the dictionary
        if (!(newWord in dictionary)) {
            wrongAttempts++; // Increment wrong attempts
            errorDisplay.textContent = `Word not found in dictionary. You have ${maxWrongAttempts - wrongAttempts} attempts left.`;
            clearInputs(); // Clear inputs after a failed attempt

            if (wrongAttempts >= maxWrongAttempts) {
                endGame();
            }
            return;
        }

        // Check if the word follows the rules
        if (words.length > 0) {
            const lastWord = words[words.length - 1];
            const lastLetter = lastWord.slice(-1);

            if (newWord[0] !== lastLetter) {
                wrongAttempts++; // Increment wrong attempts
                errorDisplay.textContent = `Word must start with '${lastLetter}'. You have ${maxWrongAttempts - wrongAttempts} attempts left.`;
                clearInputs(); // Clear inputs after a failed attempt

                if (wrongAttempts >= maxWrongAttempts) {
                    endGame();
                }
                return;
            }
        }

        // Check for duplicate words
        if (words.includes(newWord)) {
            wrongAttempts++; // Increment wrong attempts
            errorDisplay.textContent = `Word already used. Try a different one. You have ${maxWrongAttempts - wrongAttempts} attempts left.`;
            clearInputs(); // Clear inputs after a failed attempt

            if (wrongAttempts >= maxWrongAttempts) {
                endGame();
            }
            return;
        }

        // Add new word to list
        words.push(newWord);
        updateWordList();
        updateLeaderboard(newWord);
        clearInputs(); // Clear inputs after successful attempt
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

    function updateLeaderboard(word) {
        const points = word.length;

        let userPoints = parseInt(localStorage.getItem(currentUser) || '0', 10);
        userPoints += points;
        localStorage.setItem(currentUser, userPoints);

        leaderboard[currentUser] = userPoints;
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

        const sortedLeaderboard = Object.entries(leaderboard)
            .sort((a, b) => b[1] - a[1])
            .map(entry => `${entry[0]}: ${entry[1]} points`);

        leaderboardList.innerHTML = '';
        sortedLeaderboard.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            leaderboardList.appendChild(li);
        });
    }

    function endGame() {
        gameOver = true;
        errorDisplay.textContent += ' Game Over!';
        letterContainer.querySelectorAll('input').forEach(input => input.disabled = true);
        submitWord.disabled = true;
        restartButton.style.display = 'block';
    }

    function clearInputs() {
        letterContainer.querySelectorAll('input').forEach((input, index) => {
            input.value = '';
            if (index === 0) {
                input.focus(); // Focus on the first input box
            }
        });
    }

    restartButton.addEventListener('click', () => {
        words = [];
        gameOver = false;
        wrongAttempts = 0; // Reset wrong attempts
        errorDisplay.textContent = '';
        letterContainer.querySelectorAll('input').forEach(input => {
            input.disabled = false;
            input.value = '';
        });
        submitWord.disabled = false;
        updateWordList();
        restartButton.style.display = 'none';
        letterContainer.querySelectorAll('input')[0].focus(); // Focus on the first input box
    });
});
